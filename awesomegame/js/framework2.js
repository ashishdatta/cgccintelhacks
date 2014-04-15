// how to leave a comment. double slashes apparently

// ===========================================
// ===========================================
// Constants

var STOPPED = 1;
var RUNNING = 2;
var state = RUNNING;
var MOUSESTATE = "mouseup";

var canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 500;
document.body.appendChild(canvas);
var context = canvas.getContext("2d");

var keysDown = {};
var then = Date.now();

var allSprites = new Array();

// ===========================================
// ===========================================
// mouseclick events
// currently they all just cycle through the allSprites list 
// but we should really build a single central event manager queue

canvas.addEventListener("mousedown", clicked);
canvas.addEventListener("mousemove", moved);
canvas.addEventListener("mouseup", released);

function clicked(event) {
	MOUSESTATE = event.type;
	currentScene.notify(event);
}
function moved(event) {
	currentScene.notify(event);
}
function released(event) {
	MOUSESTATE = event.type;
	currentScene.notify(event);
}


// ===========================================
// ===========================================
// getting sound to work?
function EvalSound(soundobj) 
{
	var thissound=document.getElementById(soundobj);
	thissound.play();
}

// ===========================================
// ===========================================
// Collision detection functions

function collidePoint(sprite, x, y) {
	// tests for collision between a sprite and an x/y coordinate
	if (x > sprite.x && 
		x < sprite.x + sprite.width &&
		y > sprite.y &&
		y < sprite.y + sprite.height) {
			return true;
		}
	return false;
}

function spriteCollide(sprite1, sprite2) {
	if (sprite1.x < sprite2.x + sprite2.width  && sprite1.x + sprite1.width  > sprite2.x &&
			sprite1.y < sprite2.y + sprite2.height && sprite1.y + sprite1.height > sprite2.y) {
		// The objects are touching
		return true;
	}
	return false;
}

function groupCollide(sprite1, spriteGroup) {
	// tests for collisions between a sprite and a group of sprites
	// returns array of collided sprites
	var collidelist = new Array();

	for (var key in spriteGroup)
		{
		
		var collided = spriteCollide(sprite1, spriteGroup[key]);
		if(collided) {
			collidelist.push(sprite2);
		}
	}
	return collidelist;
}
// ===========================================
// ===========================================
// Scene class

function Scene(bg) {
	this.name = "Scene";
	// TODO: Let them pass the background
	this.background = new Background(bg);
	
	// contains the background and five layers of sprites
	// will have its own clear as it owns the background
	// will run the notify, update, and draw functions of each
	// will contain the ruleset for the level
		// will need a scoreboard
	
	this.layer0 = new Array();
	this.layer1 = new Array();
	this.layer2 = new Array();
	this.layer3 = new Array();
	this.layer4 = new Array();
	this.allSprites = new Array();
	this.allSprites.push(this.background);
	
	
	// ------------------------------------------------
	// ------------------------------------------------
	this.update = function() {
		for (sprite in this.allSprites) {
			this.allSprites[sprite].update();
		}
	}

	// ------------------------------------------------
	// ------------------------------------------------	
	this.notify = function(event) {
		if (event.type == "Click Event") {
			currentScene = scene1;
		}
		
		for (key in this.layer1) {
			var wsprite1 = this.layer1[key];
			var collisions = groupCollide(wsprite1, this.layer2);
			for (ckey in collisions) {
				var id1 = wsprite1.id;
				var id2 = collisions[ckey].id;
				console.log(id1)
				console.log(id2)
			}
			if(id1 == 0 && id2 == 4) {EvalSound('audioANT')};
//			if(id1 == 0 && id2 == 5) {EvalSound('audioapple')};
//			if(id1 == 0 && id2 == 6) {EvalSound('audioarrow')};
			if(id1 == 1 && id2 == 7) {EvalSound('audioBAT')};
//			if(id1 == 1 && id2 == 8) {EvalSound('audioball')};
//			if(id1 == 1 && id2 == 9) {EvalSound('audioboat')};
//			if(id1 == 2 && id2 == 10) {EvalSound('audiocar')};
			if(id1 == 2 && id2 == 11) {EvalSound('audioCAT')};
//			if(id1 == 2 && id2 == 12) {EvalSound('audiocall')};
//			if(id1 == 3 && id2 == 13) {EvalSound('audiodoll')};
//			if(id1 == 3 && id2 == 14) {EvalSound('audiodoor')};
			if(id1 == 3 && id2 == 15) {EvalSound('audioDRUM')};
		}
		
		
		
		for (sprite in this.allSprites) {
			this.allSprites[sprite].notify(event);
		}
	}
	
	// ------------------------------------------------
	// ------------------------------------------------	
	this.draw = function() {
		this.background.draw();
		for (sprite in this.layer0) {
			this.layer0[sprite].draw();
		}
		for (sprite in this.layer1) {
			this.layer1[sprite].draw();
		}
		for (sprite in this.layer2) {
			this.layer2[sprite].draw();
		}
		for (sprite in this.layer3) {
			this.layer3[sprite].draw();
		}
		for (sprite in this.layer4) {
			this.layer4[sprite].draw();
		}
		//for (sprite in this.layer5) {
		//	this.layer5[sprite].draw();
		//}
	}
		
	// ------------------------------------------------
	// ------------------------------------------------		
	this.addSprite = function(sprite, layer) {
		this.allSprites.push(sprite);
		switch (layer) {
			case 0:
				this.layer0.push(sprite);
				break;
			case 1:
				this.layer1.push(sprite);
				break;
			case 2:
				this.layer2.push(sprite);
				break;
			case 3:
				this.layer3.push(sprite);
				break;
			case 4:
				this.layer4.push(sprite);
				break;
		}
	}		
			
}

// ===========================================
// ===========================================
// event list.  We create events to tell whats going on.... baby

var clickEvent = {};
clickEvent.type = "Click Event"; 

var tickEvent = {};
tickEvent.type = "tickEvent";	

var keyDownEvent = {};
keyDownEvent.type = "keyDownEvent";
keyDownEvent.key = 0;


// ===========================================
// ===========================================
// Sprite objects

// background is just an image we blit to the screen endlessly
function Background(img) {
	this.x = 0;
	this.y = 0;
	this.ready = false;
	this.image = new Image();
	this.image.src = img;
	
	this.image.onload = function() {
		log("background loaded");
	};
	this.ready = true;
	
	// function every tick to update itself.  could be deprecated with notify(tickEvent)
	this.update = function() {
	}
	
	// called whenever an eventManager wants to tell this about an event
	this.notify = function(event) {
	}
		
	this.draw = function() {
		if (this.ready) {
			context.drawImage(this.image, this.x, this.y);
		}
	}
};

// A quick and dirty button.  Works like a sprite but you have to give it 3 images:
// baseimage, highlightedimage, and toggle (when they press mousedown over it).  You also have to hand it
// an event for it to send out when it is pressed.  Wooo!

function Button(img, img2, img3, x, y, width, height, event) {
	this.x = x;
	this.y = y;
	this.dx = 0;
	this.dy = 0;
	this.width = width;
	this.height = height;
	this.ready = false;
	this.baseimage = new Image();
	this.toggleimage = new Image();
	this.highlightimage = new Image();
	this.baseimage.src=img;
	this.toggleimage.src = img2;
	this.highlightimage.src = img3;	
	
	this.image = this.baseimage;
	
	// -------------------------------
	this.image.onload = function() {
		log("sprite loaded");
	};
	this.event = event;
	
	this.ready = true;
	
	// -------------------------------
	this.update = function() {
		this.x+=this.dx;
		this.y+=this.dy;
	}
	// -------------------------------
	this.notify = function(event) {
		if (event.type == "mousemove") {
			//log(MOUSESTATE);
			if (MOUSESTATE == "mousedown") {
				if (collidePoint(this, event.offsetX, event.offsetY)) {
					//log("toggle");
					this.image = this.toggleimage;
				}
				else {
					//log("baseImage");
					this.image = this.baseimage;
				}
			}
			else {
				if (collidePoint(this, event.offsetX, event.offsetY)) {
					this.image = this.highlightimage;
					//log("highlight");
				}
				else {
					this.image = this.baseimage;
					//log("baseagain");
				}
			}
		}

		if (event.type == "mouseup") {
			if (collidePoint(this, event.offsetX, event.offsetY)) { // they clicked us!
				currentScene.notify(this.event);
			}
		}
	}
	// -------------------------------
	this.draw = function() {
		if (this.ready) {
			context.drawImage(this.image, this.x, this.y);		
		}
	}
}

// Standard issue sprite.  pass it the filename of the image, position, and size
function Sprite(img, x, y, width, height, id) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.dx = 0;
	this.dy = 0;
	this.width = width;
	this.height = height;
	this.ready = false;
	this.image = new Image();
	this.image.src=img;
	this.image.onload = function() {
		log("sprite loaded");
	};
	this.ready = true;
	// -------------------------------
	this.update = function() {
		this.x+=this.dx;
		this.y+=this.dy;
	}
	// -------------------------------
	this.notify = function(event) {
	
	}
	// -------------------------------
	this.draw = function() {

		if (this.ready) {
			context.drawImage(this.image, this.x, this.y);		
		}
	}
	
}

// GrabbableSprite: this is to demonstrate a sprite which can detect 
// if it is grabbed by the mouse

function GrabbableSprite(img, x, y, width, height, id) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.dx = 0;
	this.dy = 0;
	this.offx = 0;
	this.offy = 0;
	this.width = width;
	this.height = height;
	this.ready = false;
	this.image = new Image();
	this.image.src=img;
	this.image.onload = function() {
		log("grabbable sprite loaded");
	};
	this.ready = true;
	
	this.isGrabbed = false;
	
	// -------------------------------
	this.update = function() {
	}
	// -------------------------------
	this.notify = function(event) {
		//console.log(event);
		if (event.type == "mousedown") {
			if (collidePoint(this, event.offsetX, event.offsetY)) {
				this.offx = event.offsetX - this.x;
				this.offy = event.offsetY - this.y;
				this.isGrabbed = true;
			}
		}
		if (event.type == "mouseup" && this.isGrabbed) {
			//if (this.id < 4) {groupCollide(this, 
			//}
			this.isGrabbed = false;
					if (this.id == 0){
					EvalSound('audioA')
					currentScene = scene2};
					if (this.id == 1){
					EvalSound('audioB')
					currentScene = scene3};
					if (this.id == 2){
					EvalSound('audioC')
					currentScene = scene4};
					if (this.id == 3){
					EvalSound('audioD')
					currentScene = scene5};
					if (this.id == 4){
					EvalSound('audio-NT')};
					if (this.id == 5){
					EvalSound('audio-AT')};
					if (this.id == 6){
					EvalSound('audioANT')};
					if (this.id == 7){
					EvalSound('audioCAT')};
					if (this.id == 8){
					EvalSound('audioBAT')};
					if (this.id == 9){
					EvalSound('audio-RUM')};
					if (this.id == 10){
					EvalSound('audioDRUM')};
		}
		if (event.type == "mousemove") {
			if (this.isGrabbed) {
				newx = event.offsetX;
				newy = event.offsetY;
				this.x = newx - this.offx
				this.y = newy - this.offy
			}
		}
		
		
	}
	// -------------------------------
	this.draw = function() {
		if (this.ready) {
			context.drawImage(this.image, this.x, this.y);		
		}
	}
	
}




// ===========================================
// ===========================================

addEventListener("keydown", function(e) {
	// these need to get turned into events and passed to notify()
	keysDown[e.keyCode]=true;
	}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
	log("down");
	}, false);	
	
	


// ===========================================
// ===========================================
// update() function
var update = function (modifier) {
	//log("in update");
	// -------------------------------
	if (38 in keysDown) { // up key
		keyDownEvent.key = 38;
		currentScene.notify(keyDownEvent);
	}
	
	if (40 in keysDown) { //down key
		keyDownEvent.key = 40;
		currentScene.notify(keyDownEvent);
	}
	if (37 in keysDown) {
		keyDownEvent.key = 37;
		currentScene.notify(keyDownEvent);
	}
	if (39 in keysDown) {
		keyDownEvent.key = 39;
		currentScene.notify(keyDownEvent);
	}
	
	// -------------------------------
	currentScene.update();
	
	
	for (key in allSprites) {
		allSprites[key].notify(tickEvent);
		}
};

// ===========================================
// ===========================================
// draw() function
var draw = function() {
	currentScene.draw();
	
};


// ===========================================
// ===========================================

function log(msg) {
	console.log(msg);
}

var main = function() {
	//log("In main");
	var now = Date.now();
	var delta = now - then;
	
	// Order of the game
	// 1) Update objects
	// 2) Draw objects
	
	update(delta / 1000);
	draw();
	then = now;

};

// ===========================================
// ===========================================
// Create entities for the game
	


var menu = new Scene("img/background.png");

// Build the menu
// We want a Random Words game button
var randButton = new Button("img/button1-base.png", 
						"img/button1-toggled.png", 
						"img/button1-highlighted.png", 
						200, 200, 137, 59, clickEvent);
						
// We want a Where's Waldo button
// We want an "About" button
var aboutButton = new Button("img/button1-base.png", 
						"img/button1-toggled.png", 
						"img/button1-highlighted.png", 
						200, 200, 137, 59, clickEvent);
// We want a "Quit Game" button
var quit = new Button("img/button1-base.png", 
						"img/button1-toggled.png", 
						"img/button1-highlighted.png", 
						200, 200, 137, 59, clickEvent);
// Create the Menu scene.
// we can store several scenes as variables or in an array
// then toggle between them by changing the currentScene
var button1 = new Button("img/button1-base.png", 
						"img/button1-toggled.png", 
						"img/button1-highlighted.png", 
						200, 200, 137, 59, clickEvent);
menu.addSprite(button1, 0);
var button2 = new GrabbableSprite("img/woodat.png", 0, -63, 0, 0);
menu.addSprite(button2, 0);



// Create a new scene to toggle to when we press the button
var scene1 = new Scene("img/background.png");
var c = 0;
var x, y;
  	var sprite0 = new GrabbableSprite("img/A.png", canvas.width * .20, canvas.height * .20, 100, 63, 0);
	var sprite1 = new GrabbableSprite("img/B.png", canvas.width * .70, canvas.height * .20, 100, 63, 1);
	var sprite2 = new GrabbableSprite("img/C.png", canvas.width * .20, canvas.height * .70, 100, 63, 2);
	var sprite3 = new GrabbableSprite("img/D.png", canvas.width * .70, canvas.height * .70, 100, 63, 3);
    
	scene1.addSprite(sprite0, 0);
	scene1.addSprite(sprite1, 0);
	scene1.addSprite(sprite2, 0);
	scene1.addSprite(sprite3, 0);
	
// ===========================================
// ===========================================
// creating the next scene

var scene2 = new Scene("img/background.png");
var c = 0;
var x, y;
  	var sprite4 = new GrabbableSprite("img/A.png", canvas.width * .20, canvas.height * .20, 100, 63, 0);
	var sprite5 = new GrabbableSprite("img/NT image.png", canvas.width * .70, canvas.height * .20, 100, 63, 4);
	var sprite6 = new GrabbableSprite("img/PPLE image.png", canvas.width * .20, canvas.height * .70, 100, 63, 5);
	var sprite7 = new GrabbableSprite("img/Rrow image.png", canvas.width * .70, canvas.height * .70, 100, 63, 6);
    
	scene2.addSprite(sprite4, 1);
	scene2.addSprite(sprite5, 2);
	scene2.addSprite(sprite6, 2);
	scene2.addSprite(sprite7, 2);
	scene2.addSprite(button1, 0);

// ===========================================
// ===========================================
// creating the next scene

var scene3 = new Scene("img/background.png");
var c = 0;
var x, y;
  	var sprite8 = new GrabbableSprite("img/At Image.png", canvas.width * .20, canvas.height * .20, 63, 42, 7);
	var sprite9 = new GrabbableSprite("img/B.png", canvas.width * .70, canvas.height * .20, 63, 42, 1);
	var sprite10 = new GrabbableSprite("img/AllImage.png", canvas.width * .20, canvas.height * .70, 63, 42, 8);
	var sprite11 = new GrabbableSprite("img/OatImage.png", canvas.width * .70, canvas.height * .70, 63, 42, 9);
    
	scene3.addSprite(sprite8, 2);
	scene3.addSprite(sprite9, 1);
	scene3.addSprite(sprite10, 2);
	scene3.addSprite(sprite11, 2);
	scene3.addSprite(button1, 0);

// ===========================================
// ===========================================
// creating the next scene

var scene4 = new Scene("img/background.png");
var c = 0;
var x, y;
  	var sprite12 = new GrabbableSprite("img/ArImage.png", canvas.width * .20, canvas.height * .20, 63, 42, 10);
	var sprite13 = new GrabbableSprite("img/At Image.png", canvas.width * .70, canvas.height * .20, 63, 42, 11);
	var sprite14 = new GrabbableSprite("img/C.png", canvas.width * .20, canvas.height * .70, 63, 42, 2);
	var sprite15 = new GrabbableSprite("img/AllImage.png", canvas.width * .70, canvas.height * .70, 63, 42, 12);
    
	scene4.addSprite(sprite12, 2);
	scene4.addSprite(sprite13, 2);
	scene4.addSprite(sprite14, 1);
	scene4.addSprite(sprite15, 2);
	scene4.addSprite(button1, 0);

// ===========================================
// ===========================================
// creating the next scene

var scene5 = new Scene("img/background.png");
var c = 0;
var x, y;
  	var sprite16 = new GrabbableSprite("img/Oll.png", canvas.width * .20, canvas.height * .20, 63, 42, 13);
	var sprite17 = new GrabbableSprite("img/Oor.png", canvas.width * .70, canvas.height * .20, 63, 42, 14);
	var sprite18 = new GrabbableSprite("img/RumImage.png", canvas.width * .20, canvas.height * .70, 63, 42, 15);
	var sprite19 = new GrabbableSprite("img/D.png", canvas.width * .70, canvas.height * .70, 63, 42, 3);
    
	scene5.addSprite(sprite16, 2);
	scene5.addSprite(sprite17, 2);
	scene5.addSprite(sprite18, 2);
	scene5.addSprite(sprite19, 1);
	scene5.addSprite(button1, 0);

// setting the current scene
var currentScene = menu;

// create game itself
setInterval(main, 1);
	