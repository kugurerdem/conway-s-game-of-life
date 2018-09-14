var generation = 0;
var size = 8;
var cellNumberX = Math.floor(W/size);
var cellNumberY = Math.floor(H/size);
var cells = [];
preFill(cells, []);
//GOSPER_GLIDER_R
// Check which cells are still alive.
function isFilled(x, y) {
	var X = (x<0) ? (cellNumberX + x) : (x % cellNumberX);
	var Y = (y<0) ? (cellNumberY + y) : (y % cellNumberY);
	return cells[X] && cells[X][Y];
}

function countNeighbours(x, y) {
	var amount = 0;

	if (isFilled(x-1, y-1)) amount++;
	if (isFilled(x,   y-1)) amount++;
	if (isFilled(x+1, y-1)) amount++;
	if (isFilled(x-1, y  )) amount++;
	if (isFilled(x+1, y  )) amount++;
	if (isFilled(x-1, y+1)) amount++;
	if (isFilled(x,   y+1)) amount++;
	if (isFilled(x+1, y+1)) amount++;

	return amount;
}

function update() {
	// Add or Delete Cell
	if( !(LeftDown & RightDown) ){
		if(RightDown){
			cells[Math.floor( mouseX/(W/cellNumberX) )][Math.floor( mouseY/(H/cellNumberY) )] = 0;
		} else if(LeftDown){
			cells[Math.floor(mouseX/(W/cellNumberX))][Math.floor(mouseY/(H/cellNumberY) )] = 1;
		} 
	}

	if(!GamePaused){
		var result = [];
		// Return amount of alive neighbours for a cell	
		cells.forEach( function(row, x) {
			result[x] = [];
			row.forEach(function(cell, y) {
				var alive = 0;
				var count = countNeighbours(x, y);
			
				if (cell > 0) {
					alive = count === 2 || count === 3 ? 1 : 0;
				} else {
					alive = count === 3 ? 1 : 0;
				}
			
				result[x][y] = alive;
			});
		}); 

		cells = result;
		document.getElementById("generation").innerHTML = generation++;
	}
	document.getElementById("population").innerHTML = countLiveCells(cells);
}

// Some canvas context things
ctx.strokeStyle = 'rgb(180,180,180)';
ctx.fillStyle = 'black';

// Draw cells on canvas
function draw() {
	ctx.clearRect(0, 0, W, H);
	
	cells.forEach(function(row, x) {
		row.forEach(function(cell, y) {
			ctx.beginPath();
			ctx.rect(x*W/cellNumberX, y*H/cellNumberY, W/cellNumberX, H/cellNumberY);
			if (cell) {
				ctx.fill();
				ctx.stroke();
			} else {
				ctx.stroke();
			}
		});
	});
}

var deltaTime = new Date().getMilliseconds();
// Main loop is here
function loop(){
	
	update();
	draw();
	deltaTime = Math.abs(new Date().getMilliseconds() - deltaTime);
	console.log(deltaTime);
	setTimeout(function() { loop(); }, 120);
	//window.requestAnimationFrame(update); // Too fast!
}

loop(); // Start the game