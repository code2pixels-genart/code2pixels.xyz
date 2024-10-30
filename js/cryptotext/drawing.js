
// List of available colors
const c2pHexColors = ['#0A2342', '#CC333F', '#EB6841', '#EDC951', '#00A0B0'];

// Reference grid for character positions
const referenceGrid = {' ': [0, 0],'*': [7, 7],
    'A': [1, 1], 'B': [1, 2], 'C': [1, 3], 'D': [1, 4], 'E': [1, 5], 'F': [1, 6],
    'G': [2, 1], 'H': [2, 2], 'I': [2, 3], 'J': [2, 4], 'K': [2, 5], 'L': [2, 6],
    'M': [3, 1], 'N': [3, 2], 'O': [3, 3], 'P': [3, 4], 'Q': [3, 5], 'R': [3, 6],
    'S': [4, 1], 'T': [4, 2], 'U': [4, 3], 'V': [4, 4], 'W': [4, 5], 'X': [4, 6],
    'Y': [5, 1], 'Z': [5, 2], '0': [5, 3], '1': [5, 4], '2': [5, 5], '3': [5, 6],
    '4': [6, 1], '5': [6, 2], '6': [6, 3], '7': [6, 4], '8': [6, 5], '9': [6, 6]
};


function setup() {
    const canvas = createCanvas(config.canvasWidth, config.canvasHeight);
    canvas.parent('canvas-container');
    pixelDensity(2);
    
    // Create UI elements
    createUI(select('#ui-container'));


    // Add a click event listener to the canvas to focus the textarea
    canvas.mousePressed(() => {
        const textInput = select('textarea'); // Select the textarea element
        if (textInput) textInput.elt.focus(); // Focus the textarea if it exists
    });

    // Add a keydown event listener for Alt+S
    document.addEventListener('keydown', function (event) {
      if (event.altKey && event.key === 's') {
          saveCanvasImage();
      }
    });


    // Add a keydown event listener for Alt+H
    document.addEventListener('keydown', function (event) {
      if (event.altKey && event.key === 'h') {
          toggle_UI();
      }
    });


    // resizeCanvasToContainer(); // Initial resize to fit the container
}

function draw() {
    background(config.backgroundColor);
    drawBinaryText();
}


function drawBinaryText() {
    const lines = config.text
        .split('\n'); // Split text into lines by line breaks

    const gridWidth = config.cellSize * 3;
    const gridHeight = config.cellSize * 2;

    const maxCharsPerRow = config.userMaxCharsPerRow > 0
        ? config.userMaxCharsPerRow
        : floor((config.canvasWidth - config.gridPadding * 2) / (gridWidth + config.horizontalSpacing));

    let totalRows = 0;
    for (let line of lines) {
        totalRows += Math.max(1, ceil(line.length / maxCharsPerRow));
    }

    // Calculate total height of all rows for vertical centering
    const totalTextHeight = totalRows * (gridHeight + config.verticalSpacing) - config.verticalSpacing;
    const startY = (config.canvasHeight - totalTextHeight) / 2;

    // Center horizontally based on the widest line or maxCharsPerRow
    const maxLineLength = Math.max(...lines.map(line => Math.min(line.length, maxCharsPerRow)));
    const totalTextWidth = maxLineLength * (gridWidth + config.horizontalSpacing) - config.horizontalSpacing;
    const startX = (config.canvasWidth - totalTextWidth) / 2;

    let currentY = startY;
    let currentX = startX;

    for (let line of lines) {
        currentX = startX;
        let charCount = 0;

        for (let originalChar of line) {
            // Normalize for referenceGrid lookup but retain originalChar for display
            const normalizedChar = originalChar.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const char = /[a-zA-Z0-9 ]/.test(normalizedChar) ? normalizedChar : '*';

            if (referenceGrid[char]) {
                if (charCount > 0 && charCount % maxCharsPerRow === 0) {
                    currentX = startX;
                    currentY += gridHeight + config.verticalSpacing;
                }

                drawCharacterGrid(char, originalChar, currentX, currentY); // Pass char for grid, originalChar for display
                currentX += gridWidth + config.horizontalSpacing;
                charCount++;
            }
        }
        currentY += gridHeight + config.verticalSpacing;
    }

    const blinkAlpha = 128 + 127 * sin(millis() / 200);
    push();
    let ac = color(config.activeColor);
    ac.setAlpha(blinkAlpha);
    fill(ac);
    noStroke();
    rect(currentX, currentY - (gridHeight + config.verticalSpacing), 2, config.cellSize * 2);
    pop();
}

function drawCharacterGrid(char, displayChar, x, y) {
    const [row, col] = referenceGrid[char];
    const rowBinary = row.toString(2).padStart(3, '0');
    const colBinary = col.toString(2).padStart(3, '0');

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
            const binary = i === 0 ? rowBinary : colBinary;
            push();
            strokeCap(SQUARE);
            fill(binary[j] === '1' ? config.activeColor : config.inactiveColor);
            stroke(config.borderColor);
            rect(x + j * config.cellSize, y + i * config.cellSize, 
                 config.cellSize, config.cellSize);
            pop();
        }
    }

    // Draw displayChar (original character) over binary 3x2 grid
    push();
    textFont('Courier');
    textAlign(CENTER, CENTER);
    let text_color = color(config.activeColor);
    text_color.setAlpha(config.textOpacity);
    fill(text_color);
    let text_border_color = color(config.borderColor);
    text_border_color.setAlpha(config.textOpacity);
    stroke(text_border_color);
    textSize(config.cellSize * 1.75);
    text(displayChar, x + config.cellSize * 1.5, y + config.cellSize);
    pop();
}


// Function to save the canvas as an image
function saveCanvasImage() {
  saveCanvas('c2p-cryptotext-'+config.text, 'png'); // Saves the canvas as "canvas-image.png"
}

// Function to update canvas size based on selected ratio
function updateCanvasRatio(ratio) {
    let width, height;
    switch (ratio) {
        case '1:1':
            width = 1080 / 2;
            height = 1080 / 2;
            break;
        case '16:9':
            width = 1920 / 2;
            height = 1080 / 2;
            break;
        case '9:16':
            width = 1080 / 2;
            height = 1920 / 2;
            break;
        case '4:3':
            width = 1200 / 2;
            height = 900 / 2;
            break;
        case '3:2':
            width = 1500 / 2;
            height = 1000 / 2;
            break;
        case 'A4':
            width = 2100 / 2;
            height = 2970 / 2;
            break;
        case 'A3':
            width = 2970 / 2;
            height = 4200 / 2;
            break;
        case '5:7':
            width = 500;
            height = 700;
            break;
        case '11:14':
            width = 1100;
            height = 1400;
            break;
    }
    config.canvasWidth = width;
    config.canvasHeight = height;
    resizeCanvas(config.canvasWidth, config.canvasHeight);
}
