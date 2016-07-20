const ip = "http://mserver:8080";

$(document).ready(function() {
	var cardBeingViewed;
	
	//used after redrawing table
	var thumbnailControl = function(){
		$('.thumbnail').click(function(){
			//request card object from server
			$.get(ip+"/getCardByThumbnailSrc?thumbsrc="+event.target.src, "", function(data, textstatus, jqXHR){
				//parse JSON string into object
				cardBeingViewed = JSON.parse(data);
				debugWrite(cardBeingViewed);
				
				//set various attributes accordingly
				$("#image").attr("src", cardBeingViewed.src);
				$("#fullscreen_image").attr("src", cardBeingViewed.src);
				$("a").attr("href", cardBeingViewed.src);
				
				//set property box's per objects flags
				$("#descriptionBox_checkbox1").prop('checked', cardBeingViewed.flag1);
				$("#descriptionBox_checkbox2").prop('checked', cardBeingViewed.flag2);
				$("#descriptionBox_checkbox3").prop('checked', cardBeingViewed.flag3);
				$("#descriptionBox_checkbox4").prop('checked', cardBeingViewed.flag4);
				$("#descriptionBox_checkbox5").prop('checked', cardBeingViewed.flag5);
				$("#descriptionBox_checkbox6").prop('checked', cardBeingViewed.flag6);
				$("#descriptionBox_checkbox7").prop('checked', cardBeingViewed.flag7);
				$("#descriptionBox_checkbox8").prop('checked', cardBeingViewed.flag8);
				
				//display larger image
				showPicture();
			});
		});
	}
	
	//first draw
	renderPage(thumbnailControl, $("#Flag1_checkbox").prop("checked"), $("#Flag2_checkbox").prop("checked"), $("#Flag3_checkbox").prop("checked"), $("#Flag4_checkbox").prop("checked"), $("#Flag5_checkbox").prop("checked"), $("#Flag6_checkbox").prop("checked"), $("#Flag7_checkbox").prop("checked"), $("#Flag8_checkbox").prop("checked"));
	
	//bix picture box control
	var pictureShown = false;
	var fullscreen = false;
	$("#image").click(function(){
		if(fullscreen){
			ImageRemoveFullScreen();
		} else if(pictureShown){
			hidePicture();
		}
	});
	
	//image property control
	$(".descriptionBox_checkbox").click(function(){
		if(pictureShown){
			updateCard(cardBeingViewed.name, $("#descriptionBox_checkbox1").prop('checked'), $("#descriptionBox_checkbox2").prop('checked'), $("#descriptionBox_checkbox3").prop('checked'), $("#descriptionBox_checkbox4").prop('checked'), $("#descriptionBox_checkbox5").prop('checked'), $("#descriptionBox_checkbox6").prop('checked'), $("#descriptionBox_checkbox7").prop('checked'), $("#descriptionBox_checkbox8").prop('checked'));
		}
	});
	
	//fullscreen control
	$("#Fullscreen").click(function(){
		ImageFullscreen();
	});
	$("#fullscreenWrapper").click(function(){
		ImageRemoveFullScreen();
	});
	
	//sort menu control
	var sortExtended = true;
	$("#sortButton").click(function(){
		toggleSortMenu();
	});
	
	
	//sort change
	$(".flagButtons").click(function(e){
		e.stopPropagation();
		if(e.target.type === 'checkbox'){
			renderPage(thumbnailControl, $("#Flag1_checkbox").prop("checked"), $("#Flag2_checkbox").prop("checked"), $("#Flag3_checkbox").prop("checked"), $("#Flag4_checkbox").prop("checked"), $("#Flag5_checkbox").prop("checked"), $("#Flag6_checkbox").prop("checked"), $("#Flag7_checkbox").prop("checked"), $("#Flag8_checkbox").prop("checked"));
		}
	});
	
	//delete card
	$("#Trashcan").click(function(){
		removeCard(cardBeingViewed.name, hidePicture, thumbnailControl, $("#Flag1_checkbox").prop("checked"), $("#Flag2_checkbox").prop("checked"), $("#Flag3_checkbox").prop("checked"), $("#Flag4_checkbox").prop("checked"), $("#Flag5_checkbox").prop("checked"), $("#Flag6_checkbox").prop("checked"), $("#Flag7_checkbox").prop("checked"), $("#Flag8_checkbox").prop("checked"));
	});
	
	//print
	$("#Print_icon").click(function(){
		window.print();
	});
	
	//rotate control
	$( window ).on( "orientationchange", function( event ) {
		$(window).trigger('resize');
	});
	
	//custom resize event
	$(window).resize(function(event){
	});
	
	//sort menu toggle height
	var toggleSortMenu = function(){
		if(sortExtended){
			$("#sort").animate({maxHeight: $("#sortButton").height()}, 500, function(){
				$("#sort").addClass("sortHidden");
				$("#sort").removeClass("sortNotHidden");
				$("#sort").removeAttr('style');
			});
		} else {
			$("#sort").animate({maxHeight: '1000px'}, 500, function(){
				$("#sort").removeClass("sortHidden");
				$("#sort").addClass("sortNotHidden");
				$("#sort").removeAttr('style');
			});
		}
		sortExtended = !sortExtended;
	}
	
	//show large image of selected thumbnail
	var showPicture = function(){
		if(!pictureShown){
			$("#ViewBox").css("display", "block");
			$("#descriptionBox").css("display", "block");
			$("#ViewBox").removeClass("vewbox_hidden");
			$("#ViewBox").addClass("vewbox_notsohidden");
			$("#ViewBox").animate({height: 576}, 333);
			$("#descriptionBox").animate({height: 100}, 333);
			$("#descriptionBox_sub").animate({height: 30}, 333);
			pictureShown = true;
		}
	}
	
	//hide large image of selected thumbnail
	var hidePicture = function(){
		if(pictureShown){
			$("#ViewBox").animate({height:0}, 333, function(){
				$("#ViewBox").addClass("vewbox_hidden");
				$("#ViewBox").removeClass("vewbox_notsohidden");
				$("#ViewBox").css("display", "none");
			});
			$("#descriptionBox").animate({height: 0}, 333, function(){
				$("#descriptionBox").css("display", "none");
			});
			$("#descriptionBox_sub").animate({height: 0}, 333, function(){
				$("#descriptionBox_sub").css("display", "none");
			});
			pictureShown = false;
		}
	}
	
	//show image fullscreen
	var ImageFullscreen = function(){
		if(!fullscreen){
			fullscreen = true;
			$("#fullscreenWrapper").css("display", "block");
			$("#fullscreenWrapper").animate({opacity: 1}, 333);
		}
		$('body').css({'overflow':'hidden'});
		    $(document).bind('scroll',function () { 
			   window.scrollTo(0,0); 
		    });
	}
	
	//remive image fullscreen
	var ImageRemoveFullScreen = function(){
		if(fullscreen){
			$("#fullscreenWrapper").animate({opacity: 0}, 333, function(){
			   $("#fullscreenWrapper").css("display", "none");
			});
			$(document).unbind('scroll'); 
			$('body').css({'overflow':'visible'});
			fullscreen = false;
		}
	}
});

//update card info with flags
var updateCard = function(name, flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8){
	debugWrite("Update Card -- "+ip+"/update?name="+name+"&flag1="+flag1+"&flag2="+flag2+"&flag3="+flag3+"&flag4="+flag4+"&flag5="+flag5+"&flag6="+flag6+"&flag7="+flag7+"&flag8="+flag8);
	
	//send request to server
	$.get(ip+"/update?name="+name+"&flag1="+flag1+"&flag2="+flag2+"&flag3="+flag3+"&flag4="+flag4+"&flag5="+flag5+"&flag6="+flag6+"&flag7="+flag7+"&flag8="+flag8, "", function(data, textstatus, jqXHR){
		debugWrite(data);
	})
}

//remove a card
var removeCard = function(name, hidePicture, onComplete, flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8){
	//send request to server
	$.get(ip+"/delete?name="+name, "", function(data, textstatus, jqXHR){
		debugWrite(data);
		
		//shrink large image if it is up
		hidePicture();
		
		//redraw to remove deleted thumbnail
		renderPage(onComplete, flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8);
	});
}

//draw table of thumbnails
var renderPage = function(onComplete, flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8){
	drawTable(onComplete, flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8);
}

//draw the actual table of thumbnails
var drawTable = function(onComplete, flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8){
	debugWrite("Table Query -- "+ip+"/drawTable?flag1="+flag1+"&flag2="+flag2+"&flag3="+flag3+"&flag4="+flag4+"&flag5="+flag5+"&flag6="+flag6+"&flag7="+flag7+"&flag8="+flag8);
	
	//request table from server
	$.get(ip+"/drawTable?flag1="+flag1+"&flag2="+flag2+"&flag3="+flag3+"&flag4="+flag4+"&flag5="+flag5+"&flag6="+flag6+"&flag7="+flag7+"&flag8="+flag8, "", function(data, textstatus, jqXHR){
		//display table send from server
		$("#thumbnailBox").html(data);
		onComplete();
	});
}

//debugging function
var debugWrite = function(str){
	console.log(str);
	return str;
};