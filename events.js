// Canvas variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var W = canvas.width;
var H = canvas.height;

// EVENT VARIABLES

var LeftDown = false;
var RightDown = false;
var mouseX = W/2,
	mouseY = H/2;

// EVENTS

canvas.onmousemove = function(){
	mouseY = event.y - canvas.getBoundingClientRect().top;
	mouseX = event.x - canvas.getBoundingClientRect().left;
	//console.log("X:" + mouseX +"Y:" +mouseY);
}

canvas.onmousedown = function(evt){

	evt = evt || window.event;
	if(evt.button == 0) LeftDown = true;
	if(evt.button == 2) RightDown = true;

	console.log("Mouse Down");
}

canvas.onmouseup = function(){
	LeftDown = false;
	RightDown = false;
}

canvas.oncontextmenu = function (){	
    return false;     // cancel default menu
}

// BUTTON FUNCTIONS

var GamePaused = false;
function Pause(){
	GamePaused = !GamePaused;
}

function Next_Step(){
	GamePaused = false;
	update();
	GamePaused = true;
}

function Gosper_R(){
	preFill(cells, GOSPER_GLIDER_R);
}

function Gosper(){
	preFill(cells, GOSPER_GLIDER);
}

function Glider(){
	preFill(cells, GLIDER);
}

function Pulsar(){
	preFill(cells, PULSAR);
}

function Pentadecathlon(){
	preFill(cells, PENTADECATHLON);
}