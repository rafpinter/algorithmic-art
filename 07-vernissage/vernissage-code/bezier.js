/* BezierCurves

References:
https://www.youtube.com/watch?v=uctX1P3H3xM
https://editor.p5js.org/PeterQwertz/sketches/Mh7aSsyMl
https://github.com/rethread-studio/algorithmic-art-course/blob/main/examples/template-p5-to-svg.html

p5.js
*/

// Screen variables
var w
var h
var rightmargin
var leftmargin
var topmargin
var bottommargin
var actualwidth
var actualheight

// Main variables
let x1, y1, x2, y2, x3, y3, x4, y4 // points of the lines 
let j1 = -100
let j2 = -100
let j3 = 100
let j4 = 100
let i = 100

// playground!!
let offset = 100
let noise_speed = 0.0055

// Animation variables
var pause = true


// Configuration of the canvas
function setup() {
    // Adjusting margins
    w = windowWidth
    h = windowHeight
    rightmargin = 0.9 * w
    leftmargin = 0.1 * w
    topmargin = 0.1 * h
    bottommargin = 0.9 * h
    actualwidth = rightmargin - leftmargin
    actualheight = bottommargin - topmargin
    createCanvas(w, h)
    frameRate(20)
    mousePressed()
    noFill() // No filling color 
}

// Drawing on the canvas
function draw() {
    bezier_func()
}

// My bezier function
function bezier_func() {
    // Configuration of the lines
    stroke(255) // Color of the line. 255 = white
    strokeWeight(2) // Thickness of the line

    // Adding randomness to the points
    // In the original work, I "automatically" created all the lines with a "for" loop:
    // for (let j = 0; j < steps; j++) {
    // but here I'm showing one by one
    x1 = noise(offset + i) * width + j1
    y1 = noise(offset + i + 2) * height + j1
    x2 = noise(offset + i + 3) * width + j2
    y2 = noise(offset + i + 4) * height + j2
    x3 = noise(offset + i + 5) * width + j3
    y3 = noise(offset + i + 6) * height + j3
    x4 = noise(offset + i + 7) * width + j4
    y4 = noise(offset + i + 8) * height + j4

    // Constructing Bezier curves with the points
    bezier(x1, y1, x2, y2, x3, y3, x4, y4)
    // What happens if we see only the bezier curves?

    // Adding straight line to an end of the Beziers
    line(leftmargin, topmargin, x1, y1)
    // Respecting the margins
    let max_right
    if (y4 > rightmargin) {
        max_right = rightmargin
    } else {
        max_right = y4
    }

    // Adding another line to another end of the Beziers
    line(x4, y4, max_right, bottommargin)

    // Shift!!!!! Motion!!!!!
    offset += noise_speed

    // End of "for" in the original work
    // }
    // In the original work, I also desabled the javascript loops, 
    // so the screen is not refreshed
    // noLoop()

    // Now let's play with the code
}


// Pause/play interactivity
function mousePressed() {
    // If it's paused, we should play it
    if (pause == false) {
        noLoop()
        pause = true
    } else { // If it's playing, we should pause
        loop()
        pause = false
    }
}
