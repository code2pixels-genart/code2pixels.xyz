
// Function to assign a random color from the list to each color property
function randomizeColors() {
  config.backgroundColor = getRandomColor();
  config.activeColor = getRandomColor();
  config.inactiveColor = getRandomColor();
  config.inactiveColor = (config.activeColor===config.inactiveColor)?getRandomColor():config.inactiveColor;
  config.borderColor = getRandomColor();

  // Trigger a redraw if needed to apply color changes
  redraw();
}

// Helper function to pick a random color from `c2pHexColors`
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * c2pHexColors.length);
  return c2pHexColors[randomIndex];
}

// Function to assign a random color from the list to each color property
function resetColors() {
    config.backgroundColor= "#000000";
    config.activeColor= "#FFFFFF";
    config.inactiveColor= "#000000";
    config.borderColor= "#000000";
  
  // Trigger a redraw if needed to apply color changes
  redraw();
}


// Function to get the "text" parameter from the current URL
function getTextFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('text') || ''; // Get the "text" parameter or an empty string if not found
}


// Function to convert decimal degrees to DMS format with proper direction (N/S/E/W)
function toDMS(degrees, isLatitude) {
    const d = Math.floor(Math.abs(degrees));
    const minFloat = (Math.abs(degrees) - d) * 60;
    const m = Math.floor(minFloat);
    const s = Math.round((minFloat - m) * 60);

    // Determine direction based on whether it's latitude or longitude
    const direction = degrees >= 0
        ? (isLatitude ? "N" : "E")
        : (isLatitude ? "S" : "W");

    return `${d}°${m}'${s}" ${direction}`;
}
