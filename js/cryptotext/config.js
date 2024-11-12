// Configuration object to store settings
let config = {
    backgroundColor: "#000000",
    activeColor: "#FFFFFF",
    inactiveColor: "#000000",
    borderColor: "#000000",
    textOpacity: 10,
    canvasWidth: 1920/2,
    canvasHeight: 1920/2,
    cellSize: 20,
    horizontalSpacing: 0,
    verticalSpacing: 0,
    text: '',
    gridPadding: 20
};



// Example Preset Structure
const examplePreset = {
    backgroundColor: "#000000",
    activeColor: "#FFFFFF",
    inactiveColor: "#000000",
    borderColor: "#000000",
    textOpacity: 10,
    canvasWidth: 540,
    canvasHeight: 540,
    cellSize: 20,
    horizontalSpacing: 0,
    verticalSpacing: 0,
    text: "Sample Text",
    gridPadding: 20
};


// Presets Storage
const presets = {};

// Function to save the current configuration as a new preset
function savePreset(name) {
    presets[name] = { ...config }; // Copy current config into a new preset
    renderPresetButtons(); // Refresh preset buttons
}

// Function to load a preset by name
function loadPreset(name) {
    if (presets[name]) {
        Object.assign(config, presets[name]); // Load preset into config
        applyConfigToUI(); // Sync UI with new config values
        resizeCanvas(config.canvasWidth, config.canvasHeight);
    } else {
        console.error(`Preset "${name}" not found.`);
    }
}




function loadConfigFromURL() {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of params.entries()) {
        if (config.hasOwnProperty(key)) {
            config[key] = isNaN(value) ? value : Number(value);
        }
    }
    updateQRCode(params.toString());
}

