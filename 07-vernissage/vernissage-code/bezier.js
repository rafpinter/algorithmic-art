/* BezierCurves

References:
https://www.youtube.com/watch?v=uctX1P3H3xM
https://editor.p5js.org/PeterQwertz/sketches/Mh7aSsyMl
// https://github.com/rethread-studio/algorithmic-art-course/blob/main/examples/template-p5-to-svg.html


vec_of_bezier_lines = [...,...,...]
new_point = point
vec_of_bezier_lines[i % len(vec)] = new_point
*/

var w
var h
var rightmargin
var leftmargin
var topmargin
var bottommargin
var actualwidth
var actualheight

// playground
let x1, y1, x2, y2, x3, y3, x4, y4
let i = 100
let offset = 2
let noise_speed = 0.006
let j1 = -100
let j2 = -100
let j3 = 100
let j4 = 100

let steps = 150
var pause = false

function setup() {
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

function draw() {
    bezier_func()
    // noLoop()
}

function bezier_func() {
    noFill()
    strokeWeight(1.5)

    x1 = (noise(offset + i) * width + j1)
    y1 = (noise(offset + i + 2) * height + j1)
    x2 = (noise(offset + i + 3) * width + j2)
    y2 = (noise(offset + i + 4) * height + j2)
    x3 = (noise(offset + i + 5) * width + j3)
    y3 = (noise(offset + i + 6) * height + j3)
    x4 = (noise(offset + i + 7) * width + j4)
    y4 = (noise(offset + i + 8) * height + j4)

    stroke(255)
    bezier(x1, y1, x2, y2, x3, y3, x4, y4)
    line(leftmargin, x1, x1, y1)
    let max_right
    if (y4 > rightmargin) {
        max_right = rightmargin
    } else {
        max_right = y4
    }
    line(x4, y4, max_right, bottommargin)


    offset += noise_speed
}

function mousePressed() {
    if (pause == false) {
        noLoop()
        pause = true
    } else {
        loop()
        pause = false
    }
}
