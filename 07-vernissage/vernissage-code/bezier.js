/* BezierCurves

References:
https://www.youtube.com/watch?v=uctX1P3H3xM
https://editor.p5js.org/PeterQwertz/sketches/Mh7aSsyMl
https://github.com/rethread-studio/algorithmic-art-course/blob/main/examples/template-p5-to-svg.html
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
let x1, y1, x2, y2, x3, y3, x4, y4
let j1 = -100
let j2 = -100
let j3 = 100
let j4 = 100
let i = 100

// playground!!
let offset = 100
let noise_speed = 0.0055

// Animation variables
let steps = 150
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
}

// Drawing on the canvas
function draw() {
    bezier_func()
}

// My bezier function
function bezier_func() {
    // Configuration of the lines
    noFill() // No filling color 
    stroke(255) // Color of the line. 255 = white
    strokeWeight(2) // Weight of the line

    // Adding randomness to the points
    x1 = (noise(offset + i) * width + j1)
    y1 = (noise(offset + i + 2) * height + j1)
    x2 = (noise(offset + i + 3) * width + j2)
    y2 = (noise(offset + i + 4) * height + j2)
    x3 = (noise(offset + i + 5) * width + j3)
    y3 = (noise(offset + i + 6) * height + j3)
    x4 = (noise(offset + i + 7) * width + j4)
    y4 = (noise(offset + i + 8) * height + j4)

    // Constructing Bezier curves with the points
    bezier(x1, y1, x2, y2, x3, y3, x4, y4)

    // Adding straight line to an end of the Beziers
    line(leftmargin, x1, x1, y1)
    // But watching out for the margins
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
}


// Pause/play interactivity
function mousePressed() {
    if (pause == false) {
        noLoop()
        pause = true
    } else {
        loop()
        pause = false
    }
}
