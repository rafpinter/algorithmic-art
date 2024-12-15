let font; // Global variable to store the font

function preload() {
    font = loadFont("./fonts/1CAMBam_Stick_9.ttf", () => {
        console.log("Font loaded successfully!");
    }, () => {
        console.error("Failed to load font.");
    });
}

function setup() {
    let canvasWidth = 800; // Width of the canvas
    let canvasHeight = 400; // Height of the canvas

    // Create an SVG canvas
    createCanvas(canvasWidth, canvasHeight, SVG);

    // Draw everything once
    noLoop();

    // Add a button to export the canvas as an SVG
    let button = createButton('Export as SVG');
    button.position(10, canvasHeight + 10); // Position the button below the canvas
    button.mousePressed(exportSVG);
}

function draw() {
    background(237); // Light gray background

    // Text settings
    textFont(font);
    textSize(32); // Text size
    fill(30); // Text color (dark gray)
    noStroke();

    // Draw the text
    let textToDisplay = "Is it already Bauhaus?";
    let textX = width / 2; // Center the text horizontally
    let textY = height / 2 + 40; // Position the text slightly below the center
    textAlign(CENTER, CENTER);
    text(textToDisplay, textX, textY);

    // Draw a horizontal line above the text
    stroke(30); // Line color
    strokeWeight(2); // Line thickness
    let lineX1 = width / 4; // Start position (left)
    let lineX2 = 3 * width / 4; // End position (right)
    let lineY = textY - 20; // Position the line above the text
    line(lineX1, lineY, lineX2, lineY);
}

// Function to export the canvas as an SVG
function exportSVG() {
    save("text_export.svg"); // Save the file as "text_export.svg"
}
