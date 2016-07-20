const ip = "http://mserver:8080";

$(document).ready(function(){
	var StatusUpdate = function(str){
		$("#response").html("<h1>"+str+"</h1>")
		debugWrite(str);
	}
	StatusUpdate("Waiting to Send");
	
	$("#submit").click(function(){
		var name = $("#name").val();
		if(debugWrite(name.indexOf(".jpg")) === -1){
			if(name === ""){
				StatusUpdate("Please Enter Image Name");
				return;
			}
			name += ".jpg";
			$("#name").val(name)
		}
		var flag1 = $("#flag1").prop("checked");
		var flag2 = $("#flag2").prop("checked");
		var flag3 = $("#flag3").prop("checked");
		var flag4 = $("#flag4").prop("checked");
		var flag5 = $("#flag5").prop("checked");
		var flag6 = $("#flag6").prop("checked");
		var flag7 = $("#flag7").prop("checked");
		var flag8 = $("#flag8").prop("checked");
		
		
		if(confirm("Are you sure you wish to add " + name) === true){
			$.get(ip+"/update?name="+name+"&flag1="+flag1+"&flag2="+flag2+"&flag3="+flag3+"&flag4="+flag4+"&flag5="+flag5+"&flag6="+flag6+"&flag7="+flag7+"&flag8="+flag8 , "", function(data, textstatus, jqXHR){
				StatusUpdate(data);
			});
			StatusUpdate("Send");
		}
	});
});


var debugWrite = function(str){
	console.log(str);
	return str;
}