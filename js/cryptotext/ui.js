const ethAddress = "0x959Eb2b8B52bE60AC8D0f34f8e77e6d842f97379";
const toggleUI = document.querySelector('.toggle-ui');
const uiContainer = document.querySelector('.ui-container');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

uiContainer.classList.toggle('hidden');
toggleUI.classList.toggle('hidden');

toggleUI.addEventListener('click', () => {
    uiContainer.classList.toggle('hidden');
    toggleUI.classList.toggle('hidden');
    const icon = toggleUI.querySelector('i');
    icon.classList.toggle('fa-chevron-left');
    icon.classList.toggle('fa-chevron-right');
});

themeToggle.addEventListener('click', () => {
    document.body.getAttribute('data-theme') === 'green'
        ? document.body.removeAttribute('data-theme')
        : document.body.setAttribute('data-theme', 'green');
    
    themeIcon.classList.toggle('fa-sun');
    themeIcon.classList.toggle('fa-moon');
});


function createUI(container) {
    // Toggle "HERE" Mode Button
    const hereToggleButton = createButton('HERE');
    hereToggleButton.parent(container);
    hereToggleButton.style("height","10%");
    hereToggleButton.style("font-size","x-large");
    hereToggleButton.class("btn here");
    hereToggleButton.mousePressed(toggleHereMode);

    createElement('br').parent(container);
    createElement('br').parent(container);

    // Toggle "NOW" Mode Button
    const nowToggleButton = createButton('NOW');
    nowToggleButton.parent(container);
    nowToggleButton.style("height","10%");
    nowToggleButton.style("font-size","x-large");
    nowToggleButton.class("btn now");
    nowToggleButton.mousePressed(toggleNowMode);

    createElement('br').parent(container);
    createElement('br').parent(container);


    // Background color picker
    createSpan('Background Color').parent(container);
    createElement('br').parent(container);
    const backgroundColorPicker = createColorPicker(config.backgroundColor);
    backgroundColorPicker.parent(container);
    backgroundColorPicker.style("width",'100%')
    backgroundColorPicker.input(() => config.backgroundColor = backgroundColorPicker.value());
    createElement('br').parent(container);
    createElement('br').parent(container);

    // Active color picker
    createSpan('Active Color').parent(container);
    createElement('br').parent(container);
    const activeColorPicker = createColorPicker(config.activeColor);
    activeColorPicker.parent(container);
    activeColorPicker.style("width",'100%')
    activeColorPicker.input(() => config.activeColor = activeColorPicker.value());
    createElement('br').parent(container);
    createElement('br').parent(container);

    // Inactive color picker
    createSpan('Inactive Color').parent(container);
    createElement('br').parent(container);
    const inactiveColorPicker = createColorPicker(config.inactiveColor);
    inactiveColorPicker.parent(container);
    inactiveColorPicker.style("width",'100%')
    inactiveColorPicker.input(() => config.inactiveColor = inactiveColorPicker.value());
    createElement('br').parent(container);
    createElement('br').parent(container);

    // Border color picker
    createSpan('Border Color').parent(container);
    createElement('br').parent(container);
    const borderColorPicker = createColorPicker(config.borderColor);
    borderColorPicker.parent(container);
    borderColorPicker.style("width",'100%')
    borderColorPicker.input(() => config.borderColor = borderColorPicker.value());
    createElement('br').parent(container);
    createElement('br').parent(container);

    // Create the "Randomize Colors" button
    const randomizeColorsButton = createButton('RANDOM C2P COLORS');
    randomizeColorsButton.parent(container); // Add to the UI container
    randomizeColorsButton.class("btn");
    randomizeColorsButton.mousePressed(randomizeColors);
    createElement('br').parent(container);
    createElement('br').parent(container);


    // Create the "Reset Colors" button
    const resetColorsButton = createButton('Reset Colors');
    resetColorsButton.parent(container); // Add to the UI container
    resetColorsButton.class("btn");
    resetColorsButton.mousePressed(resetColors);
    createElement('br').parent(container);
    createElement('br').parent(container);


      // Text Opacity slider
    const textOpacityLabel = createSpan('Text Opacity');
    textOpacityLabel.parent(container);
    createElement('br').parent(container);
    const textOpacitySlider = createSlider(0, 255, config.cellSize, 5);
    textOpacitySlider.class("slider");
    textOpacitySlider.id("textOpacitySlider");
    textOpacitySlider.style("width",'100%')
    textOpacitySlider.parent(container);
    textOpacitySlider.input(() => config.textOpacity = textOpacitySlider.value());
    createElement('br').parent(container);
    createElement('br').parent(container);


    // Aspect ratio selector
    const aspectRatioLabel = createSpan('Canvas Ratio');
    aspectRatioLabel.parent(container);
    createElement('br').parent(container);
    const aspectRatioSelect = createSelect();
    aspectRatioSelect.class("btn");
    aspectRatioSelect.style("width",'100%')
    aspectRatioSelect.parent(container);
    aspectRatioSelect.option('1:1', '1:1');       // Square
    aspectRatioSelect.option('16:9', '16:9');     // Widescreen
    aspectRatioSelect.option('9:16', '9:16');     // Vertical
    aspectRatioSelect.option('4:3', '4:3');       // Standard Digital
    aspectRatioSelect.option('3:2', '3:2');       // DSLR/35mm Film
    aspectRatioSelect.option('A4', 'A4');         // International Paper (A4)
    aspectRatioSelect.option('A3', 'A3');         // International Paper (A3)
    aspectRatioSelect.option('5:7', '5:7');       // Standard Photo
    aspectRatioSelect.option('11:14', '11:14');   // Medium Print Size
    aspectRatioSelect.changed(() => updateCanvasRatio(aspectRatioSelect.value()));
    createElement('br').parent(container);
    createElement('br').parent(container);

    // Horizontal spacing slider
    const hSpacingLabel = createSpan('Horizontal Spacing');
    hSpacingLabel.parent(container);
    createElement('br').parent(container);
    const hSpacingSlider = createSlider(0, 300, config.horizontalSpacing, 1);
    hSpacingSlider.class("slider");
    hSpacingSlider.style("width",'100%')
    hSpacingSlider.parent(container);
    hSpacingSlider.input(() => config.horizontalSpacing = hSpacingSlider.value());
    createElement('br').parent(container);
    createElement('br').parent(container);

    // Vertical spacing slider
    const vSpacingLabel = createSpan('Vertical Spacing');
    vSpacingLabel.parent(container);
    createElement('br').parent(container);
    const vSpacingSlider = createSlider(0, 300, config.verticalSpacing, 1);
    vSpacingSlider.class("slider");
    vSpacingSlider.style("width",'100%')
    vSpacingSlider.parent(container);
    vSpacingSlider.input(() => config.verticalSpacing = vSpacingSlider.value());
    createElement('br').parent(container);
    createElement('br').parent(container);

      // Cell size slider
    const cellSizeLabel = createSpan('Cell Size');
    cellSizeLabel.parent(container);
    createElement('br').parent(container);
    const cellSizeSlider = createSlider(5, 100, config.cellSize, 1);
    cellSizeSlider.class("slider");
    cellSizeSlider.style("width",'100%')
    cellSizeSlider.parent(container);
    cellSizeSlider.input(() => config.cellSize = cellSizeSlider.value());
    createElement('br').parent(container);
    createElement('br').parent(container);

    // Create a span to display the current slider value
    const maxCharsValueDisplay = createSpan("0");
    maxCharsValueDisplay.parent(container);

    // Max Characters Per Row Slider
    const maxCharsLabel = createSpan(' Per Row (0 = Auto)');
    maxCharsLabel.parent(container);
    

    const maxCharsSlider = createSlider(0, 20, 0); // Range from 0 to 50, default is 0 for "auto"
    maxCharsSlider.class("slider");
    maxCharsSlider.style("width", '100%');
    maxCharsSlider.parent(container);
    
    maxCharsSlider.input(() => {
        config.userMaxCharsPerRow = maxCharsSlider.value(); // Store user-defined value in config
        maxCharsValueDisplay.html(` ${maxCharsSlider.value()}`); // Update displayed value

    });
    
    createElement('br').parent(container);
    createElement('br').parent(container);

    // Text input
    // createSpan('Text Input: ').parent(container);
    const textInput = createElement('textarea');
    textInput.id('textarea');
    textInput.style('padding', '10px');
    textInput.style('grid-column', 'span 2');
    textInput.style('overflow', 'hidden'); // Prevent scrolling
    textInput.attribute('placeholder', 'Enter your text here...'); // Set placeholder text
    textInput.parent(select('#app-container'));
    textInput.input(() => {
        config.text = textInput.value().toUpperCase();
        updateQRCode(config.text);
        resizeText();
    });
    createElement('br').parent(container);
    createElement('br').parent(container);

    // Set the extracted text as the initial value in the textarea
    const initialText = getTextFromURL();
    textInput.value(initialText); // Set initial text in the textarea
    config.text = initialText.toUpperCase(); // Update config with initial text

    // Function to resize text based on textarea size
    function resizeText() {
        const maxFontSize = 100; // Set an upper limit for font size
        let fontSize = maxFontSize;

        // Decrease font size until text fits within the textarea
        textInput.style('font-size', `${fontSize}px`);
        while (textInput.elt.scrollHeight > textInput.elt.clientHeight || textInput.elt.scrollWidth > textInput.elt.clientWidth) {
            fontSize -= 1;
            textInput.style('font-size', `${fontSize}px`);
        }
    }

    // setInterval(() => textInput.elt.focus(), 2500);

    // Save button
    const saveButton = createButton('Save Image');
    saveButton.parent(container);
    saveButton.style("height","10%");
    saveButton.style("font-size","x-large");
    saveButton.class("btn");
    saveButton.mousePressed(() => {
      saveCanvasImage();
    });

    createElement('br').parent(container);
    createElement('br').parent(container);

    // Toggle QR Code Button
    const showQRButton = createButton('Toggle QR');
    showQRButton.parent(container);
    showQRButton.style("height","10%");
    showQRButton.style("font-size","x-large");
    showQRButton.class("btn");
    showQRButton.mousePressed(() => {
        const qrContainer = document.getElementById('qr-code-container');
        console.log(qrContainer)
        qrContainer.style.display = qrContainer.style.display === 'none' ? 'flex' : 'none';
    });

    createElement('br').parent(container);
    createElement('br').parent(container);

    // Run LLM Button
    // const runLLMButton = createButton('RUN');
    // runLLMButton.parent(container);
    // runLLMButton.style("height","10%");
    // runLLMButton.style("font-size","x-large");
    // runLLMButton.class("btn");
    // runLLMButton.mousePressed(() => {
    //     runModel();
    // });

    // createElement('br').parent(container);
    // createElement('br').parent(container);

    // Save preset button
    const savePresetButton = createButton('Save Preset');
    savePresetButton.parent(container);
    savePresetButton.style("height","5%");
    savePresetButton.style("font-size","x-large");
    savePresetButton.class("btn");
    savePresetButton.id("savePresetBtn");
    savePresetButton.mousePressed(() => {
	    const presetName = prompt("Enter a name for your preset:");
	    savePreset(presetName);
	    alert(`Preset "${presetName}" saved!`);
    });

    createElement('br').parent(container);
    
    // Load preset button
    const loadPresetButton = createButton('Load Preset');
    loadPresetButton.parent(container);
    loadPresetButton.style("height","5%");
    loadPresetButton.style("font-size","x-large");
    loadPresetButton.class("btn");
    loadPresetButton.id("loadPresetBtn");
    loadPresetButton.mousePressed(() => {
        const presetName = prompt("Enter the name of the preset to load:");
        loadPreset(presetName);
    });
    createElement('br').parent(container);
    createElement('br').parent(container);

    
    // ETH button
    const ethButton = createButton("");
    ethButton.parent(container);
    ethButton.style("height","10%");
    ethButton.style("font-size","x-large");
    ethButton.class("btn");
    ethButton.id("ethCopyButton");
    ethButton.mousePressed(() => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(ethAddress).then(() => {
                showCustomAlert("ETH address copied to clipboard!");
            }).catch(err => {
                console.error("Failed to copy ETH address: ", err);
                showCustomAlert("Failed to copy. Try again.");
            });
        } else {
            const tempTextarea = document.createElement("textarea");
            tempTextarea.value = ethAddress;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            try {
                document.execCommand("copy");
                showCustomAlert("ETH address copied to clipboard!");
            } catch (err) {
                console.error("Fallback copy method failed: ", err);
                showCustomAlert("Failed to copy. Try again.");
            }
            document.body.removeChild(tempTextarea);
        }
    });
    createElement("i").class("fab fa-ethereum").parent(ethButton)
    createElement('br').parent(container);
    createElement('br').parent(container);

    // const presetListContainer = createDiv("Preset List");
    // presetListContainer.parent(container);
    // presetListContainer.id("presetListContainer");
    // presetListContainer.style("height","25%");




    updateQRCode("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
}

// Function to toggle UI visibility
function toggle_UI() {
  let tu = document.querySelector('.toggle-ui');
  tu.click();
}

function resizeTextareaFont() {
    const textInput = select('textarea'); // Select the textarea element
    const maxFontSize = 50; // Define a max font size
    const minFontSize = 10; // Define a min font size
    let fontSize = maxFontSize;

    if (textInput) {
        textInput.style('font-size', `${fontSize}px`);

        // Reduce the font size until content fits within the textarea
        while ((textInput.elt.scrollHeight > textInput.elt.clientHeight || 
                textInput.elt.scrollWidth > textInput.elt.clientWidth) && fontSize > minFontSize) {
            fontSize -= 1;
            textInput.style('font-size', `${fontSize}px`);
        }
    }
}

function showCustomAlert(message, duration = 3000) {
    const alertDiv = document.getElementById("customAlert");

    if (!alertDiv) return; // Exit if the alert div doesn't exist

    alertDiv.textContent = message;
    alertDiv.classList.remove("hidden");
    alertDiv.classList.add("show");

    // Set a timeout to slide back and fade away
    setTimeout(() => {
        alertDiv.classList.remove("show");
        setTimeout(() => {
            alertDiv.classList.add("hidden");
        }, 500); // Match the CSS transition duration for smooth hiding
    }, duration);
}
