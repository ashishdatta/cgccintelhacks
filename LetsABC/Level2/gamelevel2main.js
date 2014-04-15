//main code

//variables
var randomLetter = Math.floor(Math.random()*27);
var randomScreen = Math.floor(Math.random()*7);

//random letter generator


//create canvas:
/*
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 980;
document.body.appendChild(canvas);
*/


//create random background letter
switch(randomLetter)
{

case 1: 	//Background Letter A
	var bgReadyA = false;
	var bgImageA = new Image();
	bgImageA.onload = function(){
		bgReadyA=true;
	}
	bgImageA.src="http://www.clker.com/cliparts/4/a/a/c/1242257617140579084NYCS-bull-trans-A.svg.med.png";
	
	break;
	
case 2: 	//Background Letter B
	var bgReadyB = false;
	var bgImageB = new Image();
	bgImageB.onload = function(){
		bgReadyB=true;
	}
	bgImageB.src="http://www.clker.com/cliparts/4/a/a/c/1242257617140579084NYCS-bull-trans-A.svg.med.png";
	
	break;	

case 3: 	//Background Letter C
	var bgReadyC = false;
	var bgImageC = new Image();
	bgImageC.onload = function(){
		bgReadyC=true;
	}
	bgImageC.src="http://www.clker.com/cliparts/4/a/a/c/1242257617140579084NYCS-bull-trans-A.svg.med.png";
	
	break;	
	
case 4: 	//Background Letter D
	var bgReadyD = false;
	var bgImageD = new Image();
	bgImageD.onload = function(){
		bgReadyD=true;
	}
	bgImageD.src="http://www.clker.com/cliparts/4/a/a/c/1242257617140579084NYCS-bull-trans-A.svg.med.png";
	
	break;		
	}
/*
case 5: 	//Background Letter E
	var bgReadyE = false;
	var bgImageE = new Image();
	bgImageE.onload = function(){
		bgReadyE=true;
	}
	bgImageE.src=------;
	
	break;		
		
case 6: 	//Background Letter F
	var bgReadyF = false;
	var bgImageF = new Image();
	bgImageF.onload = function(){
		bgReadyF=true;
	}
	bgImageF.src=------;
	
	break;		
	
case 7: 	//Background Letter G
	var bgReadyG = false;
	var bgImageG = new Image();
	bgImageG.onload = function(){
		bgReadyG=true;
	}
	bgImageG.src=------;
	
	break;	
	
case 8: 	//Background Letter H
	var bgReadyH = false;
	var bgImageH = new Image();
	bgImageH.onload = function(){
		bgReadyH=true;
	}
	bgImageH.src=------;
	
	break;		

case 9: 	//Background Letter I
	var bgReadyI = false;
	var bgImageI = new Image();
	bgImageI.onload = function(){
		bgReadyI=true;
	}
	bgImageI.src=------;
	
	break;		
	
case 10: 	//Background Letter J
	var bgReadyJ = false;
	var bgImageJ = new Image();
	bgImageJ.onload = function(){
		bgReadyJ=true;
	}
	bgImageJ.src=------;
	
	break;	
	
case 11: 	//Background Letter K
	var bgReadyK = false;
	var bgImageK = new Image();
	bgImageK.onload = function(){
		bgReadyK=true;
	}
	bgImageK.src=------;
	
	break;	
	
case 12: 	//Background Letter L
	var bgReadyL = false;
	var bgImageL = new Image();
	bgImageL.onload = function(){
		bgReadyL=true;
	}
	bgImageL.src=------;
	
	break;	

case 13: 	//Background Letter M
	var bgReadyM = false;
	var bgImageM = new Image();
	bgImageM.onload = function(){
		bgReadyM=true;
	}
	bgImageM.src=------;
	
	break;

case 14: 	//Background Letter N
	var bgReadyN = false;
	var bgImageN = new Image();
	bgImageN.onload = function(){
		bgReadyN=true;
	}
	bgImageN.src=------;
	
	break;

case 15: 	//Background Letter O
	var bgReadyO = false;
	var bgImageO = new Image();
	bgImageO.onload = function(){
		bgReadyO=true;
	}
	bgImageO.src=------;
	
	break;

case 16: 	//Background Letter P
	var bgReadyP = false;
	var bgImageP = new Image();
	bgImageP.onload = function(){
		bgReadyP=true;
	}
	bgImageP.src=------;
	
	break;

case 17: 	//Background Letter Q
	var bgReadyQ = false;
	var bgImageQ = new Image();
	bgImageQ.onload = function(){
		bgReadyQ=true;
	}
	bgImageQ.src=------;
	
	break;
	
case 18: 	//Background Letter R
	var bgReadyR = false;
	var bgImageR = new Image();
	bgImageR.onload = function(){
		bgReadyR=true;
	}
	bgImageR.src=------;
	
	break;

case 19: 	//Background Letter S
	var bgReadyS = false;
	var bgImageS = new Image();
	bgImageS.onload = function(){
		bgReadyS=true;
	}
	bgImageS.src=------;
	
	break;
	
case 20: 	//Background Letter T
	var bgReadyT = false;
	var bgImageT = new Image();
	bgImageT.onload = function(){
		bgReadyT=true;
	}
	bgImageT.src=------;
	
	break;

case 21: 	//Background Letter U
	var bgReadyU = false;
	var bgImageU = new Image();
	bgImageU.onload = function(){
		bgReadyU=true;
	}
	bgImageU.src=------;
	
	break;


case 22: 	//Background Letter V
	var bgReadyV = false;
	var bgImageV = new Image();
	bgImageV.onload = function(){
		bgReadyV=true;
	}
	bgImageV.src=------;
	
	break;
	

case 23: 	//Background Letter W
	var bgReadyW = false;
	var bgImageW = new Image();
	bgImageW.onload = function(){
		bgReadyW=true;
	}
	bgImageW.src=------;
	
	break;

case 24: 	//Background Letter X
	var bgReadyX = false;
	var bgImageX = new Image();
	bgImageX.onload = function(){
		bgReadyX=true;
	}
	bgImageX.src=------;
	
	break;

case 25: 	//Background Letter Y
	var bgReadyY = false;
	var bgImageY = new Image();
	bgImageY.onload = function(){
		bgReadyY=true;
	}
	bgImageY.src=------;
	
	break;
	
case 26: 	//Background Letter Z
	var bgReadyZ = false;
	var bgImageZ = new Image();
	bgImageZ.onload = function(){
		bgReadyZ=true;
	}
	bgImageZ.src=------;
	
	break;
	
}


//Create input box

*/

























