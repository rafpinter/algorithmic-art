let currentNumber;
let textX;
let textY;
let numbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
    70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
    80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
];

const randomItem = arr => arr.splice((Math.random() * arr.length) | 0, 1)[0];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialize the first random number and position
  updateRandomNumber();
}

function draw() {
    background(0)
    textSize(400)
    
    // Draw the white circle at mouse position
    fill(255)
    stroke(0)
    strokeWeight(1)
    circle(mouseX, mouseY, 1000)
    
    // Draw the black text at its fixed position
    fill(0)
    noStroke()
    text(currentNumber, textX, textY)
    console.log(currentNumber)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function mouseClicked() {
    if (numbers.length > 0) {
        updateRandomNumber();
    }
}

function updateRandomNumber() {
    currentNumber = randomItem(numbers);
    textX = random(200, windowWidth - 200);
    textY = random(200, windowHeight - 200);
}