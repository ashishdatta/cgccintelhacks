// how to leave a comment. double slashes apparently




// ===========================================
// ===========================================
// Constants

var STOPPED = 1;
var RUNNING = 2;
var state = RUNNING;

var canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 300;
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
	for (key in allSprites) {
		allSprites[key].notify(event);
	}
}
function moved(event) {
	for (key in allSprites) {
		allSprites[key].notify(event);
	}
}
function released(event) {
	for (key in allSprites) {
		allSprites[key].notify(event);
	}
}

// ===========================================
// ===========================================
// Collision detection functions

function collidePoint(sprite, x, y) {
	// tests for collision between a sprite and an x/y coordinate
	if (x > sprite.x && 
		x < sprite.x + sprite.width &&
		y > sprite.y &&
		y < sprite.y + sprite.width) {
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
		context.drawImage(this.image, this.x, this.y);
	}
};

// Standard issue sprite.  pass it the filename of the image, position, and size
function Sprite(img, x, y, width, height) {
	this.x = x;
	this.y = y;
	this.dx = 0;
	this.dy = 0;
	this.width = width;
	this.height = height;
	this.ready = false;
	this.image = new Image();
	this.image.src=img;
	this.image.onload = function() {
		log("loaded");
	};
	this.ready = true;
	
	this.update = function() {
		this.x+=this.dx;
		this.y+=this.dy;
	}
	
	this.notify = function(event) {
	
	}
	
	this.draw = function() {
		context.drawImage(this.image, this.x, this.y);		
	}
	
}

// GrabbableSprite: this is to demonstrate a sprite which can detect 
// if it is grabbed by the mouse

function GrabbableSprite(img, x, y, width, height) {
	this.x = x;
	this.y = y;
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
		log("loaded");
	};
	this.ready = true;
	
	this.isGrabbed = false;
	
	// update can be called by multiple different events.  
	this.update = function() {
	}
	
	this.notify = function(event) {
		//console.log(event);
		if (event.type == "mousedown") {
			console.log("in mousedown!");
			if (collidePoint(this, event.offsetX, event.offsetY)) {
				console.log("touched");
				this.offx = event.offsetX - this.x;
				this.offy = event.offsetY - this.y;
				console.log(this.offy);
				this.isGrabbed = true;
			}
		}
		if (event.type == "mouseup" && this.isGrabbed) {
			this.isGrabbed = false;
		}
		if (event.type == "mousemove") {
			if (this.isGrabbed) {
				console.log("grabbed");
				newx = event.offsetX;
				newy = event.offsetY;
				console.log(newx);
				this.x = newx - this.offx
				this.y = newy - this.offy
			}
		}
		
		
	}
	
	this.draw = function() {
		context.drawImage(this.image, this.x, this.y);		
	}
	
}




// ===========================================
// ===========================================

addEventListener("keydown", function(e) {
	// these need to get turned into events and passed to notify()
	keysDown[e.keyCode]=true;
	log(player.x)
	}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
	log("down");
	}, false);	
	
	

var tickEvent = {};
tickEvent.type = "tickEvent";	


// ===========================================
// ===========================================
// update() function
var update = function (modifier) {
	//log("in update");
	// -------------------------------
	if (38 in keysDown) { // up key
		player.y -= 1;
	}
	
	if (40 in keysDown) { //down key
		player.y += 1;
	}
	if (37 in keysDown) {
		player.x -= 1;
	}
	if (39 in keysDown) {
		player.x += 1;

	}
	
	// -------------------------------
	var collided = false;
	collided = spriteCollide(player, wall);
	if(collided) {
		console.log("hit the wall");
	}
	for (key in allSprites) {
		allSprites[key].notify(tickEvent);
		}
};

// ===========================================
// ===========================================
// draw() function
var draw = function() {
	if(background.ready) {
		background.draw();
	}
	if(player.ready) {
		player.draw();
		wall.draw();
	}
	
	
	
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
	
var player = new GrabbableSprite("img/woodat.png", 50, 50, 25, 25);
var wall = new GrabbableSprite("img/woodat.png", 200, 200, 25, 25);
var background = new Background("img/background.png");
allSprites.push(player);
allSprites.push(wall);
//allSprites.push(background);

// create game itself
setInterval(main, 1);
	
	
	
		
		
		