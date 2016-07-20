const http = require("http");
const loki = require("lokijs");
const url = require("url");
const fs = require("fs");
const node_static = require("node-static");

//load db and collection
var cards;
var db = new loki("cards.json", {
	autosave: true,
	autosaveInterval: 5000,
	autoload:true,
	autoloadCallback: function(){
		cards = db.getCollection('cards');
		if(!cards){ 
			//if collection doesnt exsist, make one
			cards = db.addCollection("cards", {
				unique: ["name", "src", "href", "thumbsrc", "thumbhref"], //PK's
				autoupdate: true
			});
			addSampleData(); //fill with sample data
		}
	}
});

//adds a sample colleciton to db
var addSampleData = function(){
	//sample data
	addCard("artwork-digital-art-fantasy.jpg", 
		"http://mserver:8080/assets/Images/artwork-digital-art-fantasy.jpg",
		"//mserver/www/jacob/public/assets/Images/artwork-digital-art-fantasy.jpg",
		"http://mserver:8080/assets/Thumbnails/artwork-digital-art-fantasy.jpg",
		"//mserver/www/jacob/public/assets/Thumbnails/artwork-digital-art-fantasy.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("ALIEN_horror_sci_fi.jpg", 
		"http://mserver:8080/assets/Images/ALIEN_horror_sci_fi.jpg",
		"//mserver/www/jacob/public/assets/Images/ALIEN_horror_sci_fi.jpg",
		"http://mserver:8080/assets/Thumbnails/ALIEN_horror_sci_fi.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/ALIEN_horror_sci_fi.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("choice1.jpg", 
		"http://mserver:8080/assets/Images/choice1.jpg",
		"//mserver/www/jacob/public/assets/Images/choice1.jpg",
		"http://mserver:8080/assets/Thumbnails/choice1.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/choice1.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("choice2.jpg", 
		"http://mserver:8080/assets/Images/choice2.jpg",
		"//mserver/www/jacob/public/assets/Images/choice2.jpg",
		"http://mserver:8080/assets/Thumbnails/choice2.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/choice2.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("choice4.jpg", 
		"http://mserver:8080/assets/Images/choice4.jpg",
		"//mserver/www/jacob/public/assets/Images/choice4.jpg",
		"http://mserver:8080/assets/Thumbnails/choice4.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/choice4.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("dinosaurs-5368.jpg", 
		"http://mserver:8080/assets/Images/dinosaurs-5368.jpg",
		"//mserver/www/jacob/public/assets/Images/dinosaurs-5368.jpg",
		"http://mserver:8080/assets/Thumbnails/dinosaurs-5368.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/dinosaurs-5368.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("dragons-8.jpg", 
		"http://mserver:8080/assets/Images/dragons-8.jpg",
		"//mserver/www/jacob/public/assets/Images/dragons-8.jpg",
		"http://mserver:8080/assets/Thumbnails/dragons-8.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/dragons-8.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("squareheros.jpg", 
		"http://mserver:8080/assets/Images/squareheros.jpg",
		"//mserver/www/jacob/public/assets/Images/squareheros.jpg",
		"http://mserver:8080/assets/Thumbnails/squareheros.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/squareheros.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("superheroes.jpg", 
		"http://mserver:8080/assets/Images/superheroes.jpg",
		"//mserver/www/jacob/public/assets/Images/superheroes.jpg",
		"http://mserver:8080/assets/Thumbnails/superheroes.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/superheroes.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("wallup-191245.jpg", 
		"http://mserver:8080/assets/Images/wallup-191245.jpg",
		"//mserver/www/jacob/public/assets/Images/wallup-191245.jpg",
		"http://mserver:8080/assets/Thumbnails/wallup-191245.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/wallup-191245.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("797XSjS.jpg", 
		"http://mserver:8080/assets/Images/797XSjS.jpg",
		"//mserver/www/jacob/public/assets/Images/797XSjS.jpg",
		"http://mserver:8080/assets/Thumbnails/797XSjS.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/797XSjS.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("252886-cats-sweet-cat.jpg", 
		"http://mserver:8080/assets/Images/252886-cats-sweet-cat.jpg",
		"//mserver/www/jacob/public/assets/Images/252886-cats-sweet-cat.jpg",
		"http://mserver:8080/assets/Thumbnails/252886-cats-sweet-cat.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/252886-cats-sweet-cat.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("cat.jpg", 
		"http://mserver:8080/assets/Images/cat.jpg",
		"//mserver/www/jacob/public/assets/Images/cat.jpg",
		"http://mserver:8080/assets/Thumbnails/cat.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/cat.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("cebfzllbz1otjzj6rbbp.jpg", 
		"http://mserver:8080/assets/Images/cebfzllbz1otjzj6rbbp.jpg",
		"//mserver/www/jacob/public/assets/Images/cebfzllbz1otjzj6rbbp.jpg",
		"http://mserver:8080/assets/Thumbnails/cebfzllbz1otjzj6rbbp.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/cebfzllbz1otjzj6rbbp.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("cute-animals-9.jpg", 
		"http://mserver:8080/assets/Images/cute-animals-9.jpg",
		"//mserver/www/jacob/public/assets/Images/cute-animals-9.jpg",
		"http://mserver:8080/assets/Thumbnails/cute-animals-9.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/cute-animals-9.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("Glowing-Wings-Tattoos-On-Back-For-Girls-1.jpg", 
		"http://mserver:8080/assets/Images/Glowing-Wings-Tattoos-On-Back-For-Girls-1.jpg",
		"//mserver/www/jacob/public/assets/Images/Glowing-Wings-Tattoos-On-Back-For-Girls-1.jpg",
		"http://mserver:8080/assets/Thumbnails/Glowing-Wings-Tattoos-On-Back-For-Girls-1.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/Glowing-Wings-Tattoos-On-Back-For-Girls-1.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("maxresdefault (1).jpg", 
		"http://mserver:8080/assets/Images/maxresdefault (1).jpg",
		"//mserver/www/jacob/public/assets/Images/maxresdefault (1).jpg",
		"http://mserver:8080/assets/Thumbnails/maxresdefault (1).jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/maxresdefault (1).jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("maxresdefault.jpg", 
		"http://mserver:8080/assets/Images/maxresdefault.jpg",
		"//mserver/www/jacob/public/assets/Images/maxresdefault.jpg",
		"http://mserver:8080/assets/Thumbnails/maxresdefault.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/maxresdefault.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("unicorn_cat.jpg", 
		"http://mserver:8080/assets/Images/unicorn_cat.jpg",
		"//mserver/www/jacob/public/assets/Images/unicorn_cat.jpg",
		"http://mserver:8080/assets/Thumbnails/unicorn_cat.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/unicorn_cat.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
	addCard("wallup-62139.jpg", 
		"http://mserver:8080/assets/Images/wallup-62139.jpg",
		"//mserver/www/jacob/public/assets/Images/wallup-62139.jpg",
		"http://mserver:8080/assets/Thumbnails/wallup-62139.jpg", 
		"//mserver/www/jacob/public/assets/Thumbnails/wallup-62139.jpg",
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false);
}

//static file server, allows node to host other resources (html, css, js, images, ...)
var file = new node_static.Server("./public", {cache: 600});

//http server
const server = http.createServer((request, response)=>{
	
	response.setHeader('Access-Control-Allow-Origin', 'http://mserver');
	
	//url query datas
	var QD = url.parse(request.url, true).pathname;
	var UN = url.parse(request.url, true).query;
	
	//regex for pulling files
	var fileRegEx = /(?:\/[^/#?]+)+\.(?:jpg|css|js|ico|png|html|woff)$/i;
	
	//different web requests - GET
	if(QD === "/update"){
		response.writeHeader(200, {"Content-Type": "text/plain"});
		response.write(updateCard(UN['name'], UN['flag1'], UN['flag2'], UN['flag3'], UN['flag4'], UN['flag5'], UN['flag6'], UN['flag7'], UN['flag8']));
		response.end();
	}else if(QD === "/getCardByName"){
		response.writeHeader(200, {"Content-Type": "text/plain"});
		response.write(getCardBy('name' ,UN['name']));
		response.end();
	}else if(QD === "/getCardBySrc"){
		response.writeHeader(200, {"Content-Type": "text/plain"});
		response.write(getCardBy('src' ,UN['src']));
		response.end();
	}else if(QD === "/getCardByThumbnailSrc"){
		response.writeHeader(200, {"Content-Type": "text/plain"});
		response.write(getCardBy('thumbsrc' ,UN['thumbsrc']));
		response.end();
	}else if(QD === "/delete"){
		response.writeHeader(200, {"Content-Type": "text/plain"});
		response.write(removeCard(UN['name']));
		response.end();
	}else if(QD === "/addCard"){
		response.writeHeader(200, {"Content-Type": "text/plain"});
		response.write(addCard(UN['name'], UN['src'], UN['href'], UN['thumbsrc'], UN['thumbhref'], UN['flag1'], UN['flag2'], UN['flag3'], UN['flag4'], UN['flag5'], UN['flag6'], UN['flag7'], UN['flag8']));
		response.end();
	}else if(QD === "/drawTable"){
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write(drawTable(UN['flag1'], UN['flag2'], UN['flag3'], UN['flag4'], UN['flag5'], UN['flag6'], UN['flag7'], UN['flag8']));
		response.end();
	} else if(fileRegEx.test(QD)){
		file.serve(request, response);
	} else {
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write("404");
		response.end();
	}
	
});

//error listener
server.on('clientError', (err, socket) =>{
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
})

//start server
server.listen(8080, ()=>{
	console.log("Server is listenering on port 8080");
});

//get card and return JSON string
var getCardBy = function (key, value){
	debugWrite("Get Card With ["+key+"] valued as ["+ value+"]");
	var card = cards.by(key, value);
	if(!card) return "No Such Card Exsists With A " + key + " of " + value;
	return JSON.stringify(card);
}

//update card info in DB
var updateCard = function(name, flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8){
	debugWrite("Update Card: Name: "+name+", flag1: "+flag1+", flag2: "+flag2+", flag3: "+flag3+", flag4: "+flag4+", flag5: "+flag5+", flag6: "+flag6+", flag7: "+flag7+", flag8: "+flag8);
	var card = cards.by('name', name);
	
	//validate card is real
	if(!card) return debugWrite("No card named " + name + " Exsists");
	
	//string to bool
	card.flag1 = (flag1 === 'true');
	card.flag2 = (flag2 === 'true');
	card.flag3 = (flag3 === 'true');
	card.flag4 = (flag4 === 'true');
	card.flag5 = (flag5 === 'true');
	card.flag6 = (flag6 === 'true');
	card.flag7 = (flag7 === 'true');
	card.flag8 = (flag8 === 'true');
	
	//reply
	cards.on("error", function(errDoc) {
	  if(errDoc === card){
		  return debugWrite("Error Updating Card: " + name).toString();
	  }
	});
	return "Success in updating card " + name;
}

//add card to DB
var addCard = function(name, src, href, thumb_src, thumb_href, flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8){
	debugWrite("Adding Card: " + name);
	debugWrite("Card.name: " + name);
	debugWrite("Card.src: " + src);
	debugWrite("Card.href: " + href);
	debugWrite("Card.thumbsrc: " + thumb_src);
	debugWrite("Card.thumbhref: " + thumb_href);
	debugWrite("Card.flags: 1."+flag1+", 2."+flag2+", 3."+flag3+", 4."+flag4+", 5."+flag5+", 6."+flag6+", 7."+flag7+", 8."+flag8);

	//validate no card exsists with the pk's new card is trying to use
	var card = cards.by('name', name);
	if(card){
		return debugWrite("Card Already Exsists With The NAME "+name); 
	}
	card = cards.by('src', src);
	if(card){
		return debugWrite("Card Already Exsists With The SRC "+src); 
	}
	card = cards.by('href', href);
	if(card){
		return debugWrite("Card Already Exsists With The HREF "+href); 
	}
	card = cards.by('thumbsrc', thumb_src);
	if(card){
		return debugWrite("Card Already Exsists With The THUMBNAIL SRC "+thumb_src); 
	}
	card = cards.by('thumbhref', thumb_href);
	if(card){
		return debugWrite("Card Already Exsists With The THUMBNAIL HREF "+thumb_href); 
	}
	
	//string to bool
	flag1 = (flag1 === 'true');
	flag2 = (flag2 === 'true');
	flag3 = (flag3 === 'true');
	flag4 = (flag4 === 'true');
	flag5 = (flag5 === 'true');
	flag6 = (flag6 === 'true');
	flag7 = (flag7 === 'true');
	flag8 = (flag8 === 'true');
	
	//insert card - save object to check against error
	var card = cards.insert({
		name: name,
		src: src,
		href: href,
		thumbsrc: thumb_src,
		thumbhref: thumb_href,
		flag1: flag1,
		flag2: flag2,
		flag3: flag3,
		flag4: flag4,
		flag5: flag5,
		flag6: flag6,
		flag7: flag7,
		flag8: flag8
	});
	
	//reply
	cards.on("error", function(errDoc) {
	  if(errDoc === card){
		  return debugWrite("Error Adding Card: " + name).toString();
	  }
	});
	return "Success in adding card " + name;
}

//remove card from DB
var removeCard = function(name){
	debugWrite("Removing Card: " + name);
	var replyStr = "";
	
	//get card
	var card = cards.by('name', name);
	
	//check if it is real
	if(!card){
		replyStr += debugWrite("No Card Named " + name + " Exsists");
	} else {
		//remove
		cards.remove(card);
		
		//delete files
		replyStr += deletefile(card.thumbhref, "Thumbnail");
		replyStr += deletefile(card.href, "Image");
	}
	//reply
	return replyStr.toString();
}

//draw table for html to display
var drawTable = function(flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8){
	debugWrite("Drawing Table, Flag 1: " + flag1 + ", Flag 2: " + flag2 + ", Flag 3: " + flag3 + ", Flag 4: " + flag4 + ", Flag 5: " + flag5 + ", Flag 6: " + flag6+ ", Flag 7: " + flag7+ ", Flag 8: " + flag8);
	
	var thumbnails = cards.data;
	
	//apply filters as needed
	if(flag1 === 'true'){
		thumbnails = thumbnails.filter(function(item){
			return (item.flag1);
		});
	}
	if(flag2 === 'true'){
		thumbnails = thumbnails.filter(function(item){
			return (item.flag2);
		});
	}
	if(flag3 === 'true'){
		thumbnails = thumbnails.filter(function(item){
			return (item.flag3);
		});
	}
	if(flag4 === 'true'){
		thumbnails = thumbnails.filter(function(item){
			return (item.flag4);
		});
	}
	if(flag5 === 'true'){
		thumbnails = thumbnails.filter(function(item){
			return (item.flag5);
		});
	}
	if(flag6 === 'true'){
		thumbnails = thumbnails.filter(function(item){
			return (item.flag6);
		});
	}
	if(flag7 === 'true'){
		thumbnails = thumbnails.filter(function(item){
			return (item.flag7);
		});
	}
	if(flag8 === 'true'){
		thumbnails = thumbnails.filter(function(item){
			return (item.flag8);
		});
	}
	//draw table
	var rowCount = 0;
	const rowLength = 4;
	var table = '<table id="cardsTable">';
	thumbnails.forEach((thumbnail) => {
		rowCount++;
		if(rowCount == 1){
			table += '<tr>';
		}
		table += '<td>';
		table += '<img src="'+thumbnail.thumbsrc+'" class="thumbnail" /><br />';
		table += '</td>';
		
		if(rowCount == rowLength){
			table += '</tr>';
			rowCount = 0;
		}
	});
	table += '</table>';
	
	//reply
	return table;
}

//delete actual file of os
var deletefile = function(filepath, tag){
	debugWrite("Attempting To Delete: " + tag +" |"+filepath+"|");
	
	//delete
	fs.unlink(filepath, (err)=>{
		if(err != null){
			//error
			return debugWrite(err)
		}else{
			//success
			return debugWrite("Success Deleting File | "  +tag);
		}
	});
};

//debugging function
var debugWrite = (str) =>{
	console.log(str);
	return str;
}