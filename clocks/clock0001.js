// ToDo
// [ ] Add UI to add/remove values
// [ ] Add row/column shift with arrow keys

var debug=false;
var xShift = 0;
var yShift = 0;

function drawClock() {
  background(0,0,0);  // Set background to black

  let currentDate = nf(year(), 2) + nf(month(), 2) + nf(day(), 2); // Format time as HHMMSS
  let currentTime = nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2); // Format time as HHMMSS
  let currentTimeCells = str(currentDate)+str(currentTime)
  // print()

	// Define the total number of columns
	let totalColumns = currentTimeCells.length*2;

	// Calculate cell sizes based on the canvas dimensions
	let cellSizeX = width / totalColumns; // Cell width fills the whole width
	let cellSizeY = height / floor(height / (width / totalColumns)); // Cell height fills the height

	// Calculate number of columns and rows
	let cols = floor(width / cellSizeX);  // Calculate number of columns
	let rows = floor(height / cellSizeY); // Calculate number of rows

	// Optional: Log or use cols and rows as needed
	// console.log(cols, rows);
  // Loop through rows and columns to fill the grid with time
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let posX = x * cellSizeX + cellSizeX / 2;  // Calculate X position for text
      let posY = y * cellSizeY + cellSizeY / 2;  // Calculate Y position for text      
      drawBinaryGrid(posX-cellSizeX/2,posY-cellSizeY/2,cellSizeX,cellSizeY, str(currentTimeCells[abs((x+xShift+y+yShift))%currentTimeCells.length]));
      if(debug){
      	push()
      	 	fill(0,255,0,120)
      		text("("+y+","+x+")",posX-cellSizeX/2+5,posY+cellSizeY/2-5)
      	pop()
      }
    }
  }


}

// Corrected binary mapping table (6x6 grid with alphanumeric values)
const binaryGrid = {
    'A': ['001', '001'],
    'B': ['001', '010'],
    'C': ['001', '011'],
    'D': ['001', '100'],
    'E': ['001', '101'],
    'F': ['001', '110'],
    'G': ['010', '001'],
    'H': ['010', '010'],
    'I': ['010', '011'],
    'J': ['010', '100'],
    'K': ['010', '101'],
    'L': ['010', '110'],
    'M': ['011', '001'],
    'N': ['011', '010'],
    'O': ['011', '011'],
    'P': ['011', '100'],
    'Q': ['011', '101'],
    'R': ['011', '110'],
    'S': ['100', '001'],
    'T': ['100', '010'],
    'U': ['100', '011'],
    'V': ['100', '100'],
    'W': ['100', '101'],
    'X': ['100', '110'],
    'Y': ['101', '001'],
    'Z': ['101', '010'],
    '0': ['101', '011'],
    '1': ['101', '100'],
    '2': ['101', '101'],
    '3': ['101', '110'],
    '4': ['110', '001'],
    '5': ['110', '010'],
    '6': ['110', '011'],
    '7': ['110', '100'],
    '8': ['110', '101'],
    '9': ['110', '110'],
};

// Function to draw binary grid for a given character at specified position and size
function drawBinaryGrid(x, y, gridWidth, gridHeight, character) {
	push()
	rectMode(CORNER)
	noStroke();
	// stroke(0,20)
    // Get the binary representation from the grid table
    if (character in binaryGrid) {
        let bin1 = binaryGrid[character][0];
        let bin2 = binaryGrid[character][1];

        // Calculate size of each square
        let squareSizeX = (gridWidth / 3);  // Assuming each binary pattern has 3 columns
        let squareSizeY = (gridHeight / 2); // Assuming there are 2 rows

        // Draw the grid of squares based on the binary pattern
        for (let col = 0; col < 3; col++) {
            for (let row = 0; row < 2; row++) {
                let xPos = x + col * squareSizeX;
                let yPos = y + row * squareSizeY;
                let binaryValue = (row === 0) ? bin1[col] : bin2[col];
                if (binaryValue === '1') {
                    fill(customC2p[0]); // Black square
                } else {
                    fill(customC2p[3]); // White square
                }
                rect(xPos, yPos, squareSizeX+1, squareSizeY+1);
            }
        }


        if (debug){
        	push()
        	stroke(0,255,0)
        	fill(0,0,255,100)
        	rect(x, y, gridWidth, gridHeight)

        	fill(255,0,0,150)
        	noStroke()
        	// rectMode(CENTER)
        	textSize(gridHeight*0.75)
        	text(character,x, y, gridWidth, gridHeight)

        	pop()
        }

    } else {
        console.error(`Character ${character} not found in binary grid.`);
    }
    pop()
}



function keyPressed() {
	// Toggle fullscreen mode with 'F' key
	if (key === 'f' || key === 'F') {
	let fs = fullscreen();
			fullscreen(!fs);
	}

	// Toggle fullscreen mode with 'F' key
	if (key === 'd' || key === 'D') {
		debug = !debug;
		console.log("Debug is "+debug)
	}

	
	// Toggle fullscreen mode with 'F' key
	if (key === 'c' || key === 'C') {
		customC2p = shuffleArray(c2p);
	}

    // Adjust xShift and yShift with arrow keys
    if (keyCode === LEFT_ARROW) {
        xShift += 1; // Move left
        print("xShift: "+xShift)
    } else if (keyCode === RIGHT_ARROW) {
        xShift -= 1; // Move right
        print("xShift: "+xShift)
    } else if (keyCode === UP_ARROW) {
        yShift += 1; // Move up
        print("yShift: "+yShift)
    } else if (keyCode === DOWN_ARROW) {
        yShift -= 1; // Move down
        print("yShift: "+yShift)
    }



}

