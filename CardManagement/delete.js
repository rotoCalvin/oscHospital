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
		
		if(confirm("Are you sure you wish to delete " + name) === true){
			$.get(ip+"/delete?name="+name, "", function(data, textstatus, jqXHR){
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