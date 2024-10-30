let nowModeActive = false; // Flag to track if "NOW" mode is active

let nowInterval; // Interval to update the time every second

let hereModeActive = false; // Flag to track if "HERE" mode is active


// Function to toggle "NOW" mode
function toggleNowMode() {
    nowModeActive = !nowModeActive; // Toggle the "NOW" mode state

    const nowToggleButton = select('.now'); // Select the toggle button

    if (nowModeActive) {
        // Start updating the time every second
        nowInterval = setInterval(updateTimeInTextarea, 1000);

        // Update button to indicate "NOW" mode is active
        // nowToggleButton.html('NOW Mode: ON');
        nowToggleButton.style('background-color', 'var(--text-color)'); // Background color from --text-color
        nowToggleButton.style('color', 'var(--bg-color)'); // Text color from --bg-color
    } else {
        // Stop updating the time
        clearInterval(nowInterval);
        nowInterval = null;

        // Update button to indicate "NOW" mode is inactive
        // nowToggleButton.html('NOW Mode: OFF');
        nowToggleButton.style('background-color', 'var(--bg-color)'); // Background color from --bg-color
        nowToggleButton.style('color', 'var(--text-color)'); // Text color from --text-color
    }
}

// Function to update the textarea with the current date and time
function updateTimeInTextarea() {
    const currentDateTime = new Date();

    // Format the date as YYYYMMDD
    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
    const day = String(currentDateTime.getDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;

    // Format the time as HHMMSSAM/PM
    let hours = currentDateTime.getHours();
    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0 should be 12)
    const formattedTime = `${String(hours).padStart(2, '0')}${minutes}${seconds}${ampm}`;

    const formattedDateTime = `${formattedDate}\n${formattedTime}`;

    // Update the textarea
    const textInput = select('textarea');
    if (textInput) {
        // Check if "HERE" data exists (indicated by N/S/W/E) and only update the time portion
        if (hereModeActive && /[NSWE]/.test(textInput.value())) {
            const locationData = textInput.value().split('\n\n')[0]; // Extract only the location data
            textInput.value(`${locationData}\n\n${formattedDateTime}`); // Update with location + updated time
        } else {
            textInput.value(formattedDateTime); // Set initial time if location data isn't present
        }
        config.text = textInput.value(); // Update config text to keep it in sync
    }

    resizeTextareaFont();
}

// Function to toggle "HERE" mode
function toggleHereMode() {
    hereModeActive = !hereModeActive; // Toggle the "HERE" mode state

    const hereToggleButton = select('.here'); // Select the toggle button for "HERE" mode

    if (hereModeActive) {
        // Request GPS data
        requestLocationPermission();

        // Update button to indicate "HERE" mode is active
        hereToggleButton.style('background-color', 'var(--text-color)');
        hereToggleButton.style('color', 'var(--bg-color)');

        // If "NOW" mode is active, ensure it appends the time to the location
        if (nowModeActive) {
            updateTimeInTextarea(); // Start updating the time
        }
    } else {
        // Deactivate "HERE" mode
        hereToggleButton.style('background-color', 'var(--bg-color)');
        hereToggleButton.style('color', 'var(--text-color)');

        // Optionally stop updating time if "HERE" is off and you only want updates in "HERE" mode
        if (nowModeActive) {
            clearInterval(nowInterval);
        }
    }
}

// Function to request location permission and handle response
function requestLocationPermission() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Location access granted:", position);
                updateLocationInTextarea(position); // Call the function to update textarea with location
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    alert("Location access denied. Please enable GPS access in browser settings.");
                } else {
                    alert("Error obtaining location: " + error);
                    console.log(error)
                }
                // Deactivate HERE mode if location is not available
                hereModeActive = false;
                const hereToggleButton = select('button'); // Select the toggle button for "HERE"
                hereToggleButton.html('not HERE :(');
                hereToggleButton.style('background-color', 'var(--bg-color)');
                hereToggleButton.style('color', 'var(--text-color)');
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
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

    // return `${d}°${m}'${s}" ${direction}`;
    return `${d}${m}${s}${direction}`;
}

// Function to update the textarea with the current GPS location in DMS format
function updateLocationInTextarea(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Pass true for latitude and false for longitude to get correct N/S or E/W
    const latDMS = toDMS(latitude, true);   // true indicates it's latitude
    const lonDMS = toDMS(longitude, false); // false indicates it's longitude

    const formattedLocation = `${latDMS}\n${lonDMS}`;

    // Update the textarea
    const textInput = select('textarea');
    if (textInput) {
        textInput.value(formattedLocation); // Update textarea with the GPS coordinates
        config.text = formattedLocation; // Update config text to keep it in sync
    }
    
    resizeTextareaFont();
}

// Handle errors from the Geolocation API
function handleLocationError(error) {
    console.error("Error obtaining location:", error);
    alert("Unable to retrieve location. Please enable GPS permissions and try again.");
}