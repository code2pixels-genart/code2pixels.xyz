
// TODO
// - [ ] Create To Do List
// -
//
// Clocks
//
// by @code2pixels aka @sandromiccoli
//
//
// Sep, 2024
// Belo Horizonte, Minas Gerais, Brazil
//
// Crossing Paths © 2024 by code2pixels is licensed under CC BY-NC-SA 4.0
//
//
// Thanks to (see LICENSE.md for detailed licenses):
//

console.log("%cClocks", "font-weight: bold; font-family:monospace; font-size: 52px");
// console.log("%cAn ode to the crossing paths in life.", "font-family:monospace; font-size: 20px");
console.log("%cBy @code2pixels", "font-family:monospace; font-size: 14px");
console.log("%cSep, 2024", "font-family:monospace; font-size: 14px");
console.log("%cBelo Horizonte, Minas Gerais, Brazil", "font-family:monospace; font-size: 12px");
new p5();
//////////////
// COLORS
//////////////

var cp=0; // color palette index
var bgcolor; 
const c2p = ['#0A2342','#CC333F','#EB6841','#EDC951','#00A0B0'];
var customC2p = shuffleArray(c2p);
let isFullScreen = false;
let currentClockScript;


function setup() {
	// Create a canvas that fills the window
	createCanvas(windowWidth, windowHeight);
	// pixelDensity(2)
  // Placeholder for clock setup
  if (typeof setupClock === 'function') {
    setupClock();
  }
	loadClock("0001")

}

function draw() {
  // Placeholder for clock drawing
  if (typeof drawClock === 'function') {
    drawClock();
  }
}

function windowResized() {
	// Resize the canvas when the window is resized
	resizeCanvas(windowWidth, windowHeight);
}

// Function to dynamically load JS files for different clocks
function loadClock(version) {
  if (currentClockScript) {
    // Remove the old script element if it exists
    currentClockScript.remove();
  }

  // Create a new script element for the chosen clock
  currentClockScript = document.createElement('script');
  currentClockScript.src = `clocks/clock${version}.js`;
  currentClockScript.onload = () => console.log(`Loaded clock${version}.js`);
  document.body.appendChild(currentClockScript);
}

function keyPressed() {
	// Toggle fullscreen mode with 'F' key
	if (key === 'f' || key === 'F') {
	let fs = fullscreen();
			fullscreen(!fs);
	}

	if (key === '1') loadClock("0001");
	if (key === '2') loadClock("0002");
	if (key === '3') loadClock("0003");
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = floor(random(i + 1)); // Get a random index
        // Swap array[i] with array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}