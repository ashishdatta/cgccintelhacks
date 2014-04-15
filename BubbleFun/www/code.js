//Javascript File
var canvas = document.createElement("canvas");
var visCan = document.createElement("canvas");

var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 725;
visCan.width = window.innerWidth;
visCan.height = window.innerHeight;
var ctxVis = visCan.getContext("2d");
document.body.appendChild(visCan);

var w = canvas.width;
var h = canvas.height;
var visW = visCan.width;
var visH = visCan.height;

var xRat = visW/w;
var yRat = visH/h;

canvas.setAttribute("Style","Hidden");

//Game variables
var animalPicked; //random int selecting animal
var score = 0;
var animalDisplay = new Array(); //animal display array
var bubbleCorrect = new Array(); //stores correct bubble number, 0-3 left to right
var bubbleDisplay = new Array(); //bubble display array
var bubblePickedArray = new Array(); //stores display vars for bubble
var bubbleUsed = new Array(); //stores the array indexes of the used bubbles to avoid duplications
var bubblePickedInt; //randomly chooses array index for bubble
var bubble1 = {}; //these 7 vars are all coord holders
var bubble2 = {};
var bubble3 = {};
var bubble4 = {};
var animal = {};
var titleCoords = {};
var scoreCoords = {};
var gotItRight = false;
var bubOneCorrect = false;
var bubTwoCorrect = false;
var bubThreeCorrect = false;
var bubFourCorrect = false;
var bubOneIncorrect = false;
var bubTwoIncorrect = false;
var bubThreeIncorrect = false;
var bubFourIncorrect = false;
var welcomeScreen = true;
var firstRun = true;
var skipALoop = false; //skipALoop allows one additional loop before the program sleeps so the checkmark can actually get displayed
bubble1.x = w*.15;
bubble1.y = h-200;
bubble2.x = w*.25;
bubble2.y = h-480;
bubble3.x = w*.5;
bubble3.y = h-480;
bubble4.x = w*.65;
bubble4.y = h-200;
animal.x = w/2 - 121;
animal.y = h - 300;
titleCoords.x = w/2-413;
titleCoords.y = 30;
scoreCoords.x = w/2-100;
scoreCoords.y = 200;

//Used Images
var titlePic = new Image();
titlePic.src = "titleBubbleTime.png";
var bubbleBat = new Image();
bubbleBat.src = "bubbles/bubbleBat.jpg";
var bubbleBear = new Image();
bubbleBear.src = "bubbles/bubbleBear.jpg";
var bubbleBird = new Image();
bubbleBird.src = "bubbles/bubbleBird.jpg";
var bubbleCat = new Image();
bubbleCat.src = "bubbles/bubbleCat.jpg";
var bubbleCow = new Image();
bubbleCow.src = "bubbles/bubbleCow.jpg";
var bubbleCrab = new Image();
bubbleCrab.src = "bubbles/bubbleCrab.jpg";
var bubbleDeer = new Image();
bubbleDeer.src = "bubbles/bubbleDeer.jpg";
var bubbleDog = new Image();
bubbleDog.src = "bubbles/bubbleDog.jpg";
var bubbleDuck = new Image();
bubbleDuck.src = "bubbles/bubbleDuck.jpg";
var bubbleElephant = new Image();
bubbleElephant.src = "bubbles/bubbleElephant.jpg";
var bubbleFish = new Image();
bubbleFish.src = "bubbles/bubbleFish.jpg";
var bubbleFox = new Image();
bubbleFox.src = "bubbles/bubbleFox.jpg";
var bubbleFrog = new Image();
bubbleFrog.src = "bubbles/bubbleFrog.jpg";
var bubbleGiraffe = new Image();
bubbleGiraffe.src = "bubbles/bubbleGiraffe.jpg";
var bubbleKoala = new Image();
bubbleKoala.src = "bubbles/bubbleKoala.jpg";
var bubbleMonkey = new Image();
bubbleMonkey.src = "bubbles/bubbleMonkey.jpg";
var bubblePig = new Image();
bubblePig.src = "bubbles/bubblePig.jpg";
var bubbleRabbit = new Image();
bubbleRabbit.src = "bubbles/bubbleRabbit.jpg";
var bubbleScorpion = new Image();
bubbleScorpion.src = "bubbles/bubbleScorpion.jpg";
var bubbleSeal = new Image();
bubbleSeal.src = "bubbles/bubbleSeal.jpg";
var bubbleShark = new Image();
bubbleShark.src = "bubbles/bubbleShark.jpg";
var bubbleSnake = new Image();
bubbleSnake.src = "bubbles/bubbleSnake.jpg";
var bubbleSeal = new Image();
bubbleSeal.src = "bubbles/bubbleSeal.jpg";
var welcomeScreenPic = new Image();
welcomeScreenPic.src = "homepage.png";
var titleBubbleTime = new Image();
titleBubbleTime.src = "titleBubbleTime.png";
var picDog = new Image();
picDog.src = "animalpictures/picDog.png";
var picCat = new Image();
picCat.src = "animalpictures/picCat.png";
var picCow = new Image();
picCow.src = "animalpictures/picCow.png";
var picDuck = new Image();
picDuck.src = "animalpictures/picDuck.png";
var picElephant = new Image();
picElephant.src = "animalpictures/picElephant.png";
var picFrog = new Image();
picFrog.src = "animalpictures/picFrog.png";
var picMonkey = new Image();
picMonkey.src = "animalpictures/picMonkey.png";
var picPig = new Image();
picPig.src = "animalpictures/picPig.png";
var picRabbit = new Image();
picRabbit.src = "animalpictures/picRabbit.png";
var picSnake = new Image();
picSnake.src = "animalpictures/picSnake.png";
var incorrectPic = new Image();
incorrectPic.src = "incorrect_response.png";
var correctPic = new Image();
correctPic.src = "correct_response.png";

var audio = new Audio();
audio.canPlayType('audio/mpeg');
audio.src = "pop2.wav";


animalDisplay[0] = picDog;
animalDisplay[1] = picCat;
animalDisplay[2] = picCow;
animalDisplay[3] = picDuck;
animalDisplay[4] = picElephant;
animalDisplay[5] = picFrog;
animalDisplay[6] = picMonkey;
animalDisplay[7] = picPig;
animalDisplay[8] = picRabbit;
animalDisplay[9] = picSnake;


bubblePickedArray[0] = bubbleDog;
bubblePickedArray[1] = bubbleCat;
bubblePickedArray[2] = bubbleCow;
bubblePickedArray[3] = bubbleDuck;
bubblePickedArray[4] = bubbleElephant;
bubblePickedArray[5] = bubbleFrog;
bubblePickedArray[6] = bubbleMonkey;
bubblePickedArray[7] = bubblePig;
bubblePickedArray[8] = bubbleRabbit;
bubblePickedArray[9] = bubbleSnake;

bubblePickedArray[10] = bubbleBat;
bubblePickedArray[11] = bubbleBear;
bubblePickedArray[12] = bubbleBird;
bubblePickedArray[13] = bubbleCrab;
bubblePickedArray[14] = bubbleDeer;
bubblePickedArray[15] = bubbleFish;
bubblePickedArray[16] = bubbleFox;
bubblePickedArray[17] = bubbleGiraffe;
bubblePickedArray[18] = bubbleKoala;
bubblePickedArray[19] = bubbleScorpion;
bubblePickedArray[20] = bubbleSeal;
bubblePickedArray[21] = bubbleShark;


addEventListener("mousedown", clicked);

function clicked(e){
    var x = e.offsetX;
    var y = e.offsetY;
    
    if(!welcomeScreen)
    {
        if (x <= ((bubble1.x+185)*(xRat)) && x >= ((bubble1.x)*(xRat)) && y <= ((bubble1.y+172)*(yRat)) && y >= ((bubble1.y)*(yRat)))
        {
            if(bubbleCorrect[0]){
                gotItRight = true;
                bubOneCorrect = true;
                skipALoop = true;
                audio.play();
            }
            else
                bubOneIncorrect = true;
        }
        if (x <= ((bubble2.x+185)*(xRat)) && x >= ((bubble2.x)*(xRat)) && y <= ((bubble2.y+172)*(yRat)) && y >= ((bubble2.y)*(yRat)))
        {
            if(bubbleCorrect[1]){
                gotItRight = true;
                bubTwoCorrect = true;
                skipALoop = true;
                audio.play();
            }
            else
                bubTwoIncorrect = true;
        }
        if (x <= ((bubble3.x+185)*(xRat)) && x >= ((bubble3.x)*(xRat)) && y <= ((bubble3.y+172)*(yRat)) && y >= ((bubble3.y)*(yRat)))
        {
            if(bubbleCorrect[2]){
                gotItRight = true;
                bubThreeCorrect = true;
                skipALoop = true;
                audio.play();
            }
            else
                bubThreeIncorrect = true;
        }
        if (x <= ((bubble4.x+185)*(xRat)) && x >= ((bubble4.x)*(xRat)) && y <= ((bubble4.y+172)*(yRat)) && y >= ((bubble4.y)*(yRat)))
        {
            if(bubbleCorrect[3]){
                gotItRight = true;
                bubFourCorrect = true;
                skipALoop = true;
                audio.play();
            }
            else
                bubFourIncorrect = true;
        } 
    }
    if (welcomeScreen && x >= ((390)*(xRat)) && x <= ((660)*(xRat)) && y >= ((360)*(yRat)) && y <= ((450)*(yRat)))
            welcomeScreen = false;
}


function draw(){
    ctx.clearRect(0,0,w,h);
    ctxVis.clearRect(0,0,visW,visH);
    
    if(gotItRight || firstRun)
    {
        if(!skipALoop)
        {
            //Reset all our vars for a new screen
            bubOneIncorrect = false;
            bubTwoIncorrect = false;
            bubThreeIncorrect = false;
            bubFourIncorrect = false;
            bubOneCorrect = false;
            bubTwoCorrect = false;
            bubThreeCorrect = false;
            bubFourCorrect = false;

            for(var i = 0; i < 4; i++)
            {
                bubbleCorrect[i] = false;
                bubbleUsed[i] = 23;
            }
            
            //Randomly pick a new animal and four new bubbles, all four different ones and one correct one
            animalPicked = Math.floor((Math.random()*10));
            bubbleCorrect[Math.floor((Math.random()*4))] = true;

            for(var i = 0; i < 4; i++)
            {
                if(bubbleCorrect[i] !== true)
                {
                    bubblePickedInt = Math.floor((Math.random()*22));

                    while((bubblePickedInt == animalPicked) || (bubblePickedInt == bubbleUsed[0]) || (bubblePickedInt == bubbleUsed[1]) || (bubblePickedInt == bubbleUsed[2]) || (bubblePickedInt == bubbleUsed[3]))
                        bubblePickedInt = Math.floor((Math.random()*22));

                    bubbleDisplay[i] = bubblePickedArray[bubblePickedInt];
                    bubbleUsed[i] = bubblePickedInt;
                }
                else
                    bubbleDisplay[i] = bubblePickedArray[animalPicked];
            }

            if(!firstRun) //Skips some stuff that isn't necessary on the first loop
            {
                score += 10;
                pauseProg(1500);
                gotItRight = false;
            }
            else
                firstRun = false;
        }
        else
            skipALoop = false;
    }
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,w,h);    
    
    ctx.drawImage(titlePic,titleCoords.x,titleCoords.y);
    
    ctx.fillStyle = 'black';
    ctx.font = '24px Helvetica';
    ctx.fillText("Your score is: " + score, scoreCoords.x, scoreCoords.y);
    
    ctx.drawImage(animalDisplay[animalPicked],animal.x,animal.y,242,300);
    ctx.drawImage(bubbleDisplay[0],bubble1.x,bubble1.y);
    ctx.drawImage(bubbleDisplay[1],bubble2.x,bubble2.y);
    ctx.drawImage(bubbleDisplay[2],bubble3.x,bubble3.y);
    ctx.drawImage(bubbleDisplay[3],bubble4.x,bubble4.y);
    
    if(bubOneCorrect)
        ctx.drawImage(correctPic,bubble1.x,bubble1.y,185,172);
    if(bubTwoCorrect)
        ctx.drawImage(correctPic,bubble2.x,bubble2.y,185,172);
    if(bubThreeCorrect)
        ctx.drawImage(correctPic,bubble3.x,bubble3.y,185,172);
    if(bubFourCorrect)
        ctx.drawImage(correctPic,bubble4.x,bubble4.y,185,172);
    if(bubOneIncorrect)
        ctx.drawImage(incorrectPic,bubble1.x,bubble1.y,185,172);
    if(bubTwoIncorrect)
        ctx.drawImage(incorrectPic,bubble2.x,bubble2.y,185,172);
    if(bubThreeIncorrect)
        ctx.drawImage(incorrectPic,bubble3.x,bubble3.y,185,172);
    if(bubFourIncorrect)
        ctx.drawImage(incorrectPic,bubble4.x,bubble4.y,185,172);
    
    if(welcomeScreen)
        ctx.drawImage(welcomeScreenPic,0,0);

    ctxVis.drawImage(canvas,0,0,visW, visH);
}

function pauseProg(millis){ //Allows us to 'pause' without restructuring code to use setTimeout
    var date = new Date();
    var curDate = null;

    do { curDate = new Date(); }
    while(curDate-date < millis);
}

setInterval(draw,1000/30);