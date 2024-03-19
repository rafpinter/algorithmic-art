/* BezierCurves

References:
https://www.youtube.com/watch?v=uctX1P3H3xM
https://editor.p5js.org/PeterQwertz/sketches/Mh7aSsyMl


vec_of_bezier_lines = [...,...,...]
new_point = point
vec_of_bezier_lines[i % len(vec)] = new_point
*/

let pause = false
let x1, y1, x2, y2, x3, y3, x4, y4
let i = 30
let offset = 1
let speed = 0.006
let j1 = -100
let j2 = -100
let j3 = 100
let j4 = 100

let steps = 150

function setup() {
    createCanvas(700, 900, SVG)
    background(255)
}

function draw() {
    background(255)

    // Tests:
    call_bezier(1)
    // save
    let button = createButton('save svg')
    button.position(750, 900)
    button.mousePressed(save_svg)
}

function save_svg() {
    save("mySVG.svg")
}

function bezier_func(l) {

    noFill()
    strokeWeight(1)

    let k = 1;

    for (let j = 0; j < steps; j++) {
        stroke(200, 200, 0)
        x1 = (noise(offset + i) * width + j1) * l
        y1 = (noise(offset + i * 2) * height + j1) * l
        x2 = (noise(offset + i * 3) * width + j2) * l
        y2 = (noise(offset + i * 4) * height + j2) * l
        x3 = (noise(offset + i * 5) * width + j3) * l
        y3 = (noise(offset + i * 6) * height + j3) * l
        x4 = (noise(offset + i * 7) * width + j4) * l
        y4 = (noise(offset + i * 8) * height + j4) * l

        bezier(x1, y1, x2, y2, x3, y3, x4, y4)

        // Points
        // point(x1, y1)
        // point(x2, y2)
        // point(x3, y3)
        // point(x4, y4)

        // Option 1
        // line(x2, windowWidth, x2, y2)
        // line(x3, y3, windowHeight, y3)
        line(0, x1, x1, y1)
        line(x4, y4, y4, windowHeight)

        // Option 2
        // line(x1, y1)
        // line(x4, y4, 700, 900)

        // Option 3
        // line(x1, y1, x2, y2)
        // line(x2, y2, x3, y3)
        // line(x3, y3, x4, y4)

        offset += speed
    }
    noLoop()
}


function call_bezier(l) {
    if (l < 1) {
        return
    }
    else {
        bezier_func(l)
        call_bezier(l / 2)
    }
}