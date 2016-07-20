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
		
		$.get(ip+"/getCardByName?name="+name, "", function(data, textstatus, jqXHR){
			StatusUpdate(JSON.stringify(JSON.parse(data),null,'\t'));
		});
		StatusUpdate("Send");
	});
	
});

var debugWrite = function(str){
	console.log(str);
	return str;
}