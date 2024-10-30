
// Initialize the QR code generator
let qr;

window.addEventListener("DOMContentLoaded", function () {
    // Check if QRious is loaded and initialize QR code
    qr = new QRious({
        element: document.getElementById('qr-code-canvas'), // Target canvas element for QR
        size: 300,
    });

});

// Function to update the QR code based on input text
function updateQRCode(text) {
    const qrUrl = `https://cryptotext.code2pixels.xyz?text=${encodeURIComponent(text)}`;
    qr.set({ value: qrUrl }); // Update QR code with the new URL
    //console.log("Updated QR Code URL:", qrUrl); // Debug line
}
