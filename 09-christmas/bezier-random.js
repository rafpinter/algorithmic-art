/* BezierCurves

References:
https://www.youtube.com/watch?v=uctX1P3H3xM
https://editor.p5js.org/PeterQwertz/sketches/Mh7aSsyMl


vec_of_bezier_lines = [...,...,...]
new_point = point
vec_of_bezier_lines[i % len(vec)] = new_point
*/

// https://github.com/rethread-studio/algorithmic-art-course/blob/main/examples/template-p5-to-svg.html
//letter: 8.5in x 11in
//96dpi is for plotting on the UUNA TEK iDraw
//which gives this width and height for a letter format paper
//w=96*8.5=816
//h=96*11=1056
let a3 = [
    11.693,
    16.535
]
let letter = [
    8.5,
    11
]

let paper = a3

var echelle = 1
var w = paper[0] * 96 * echelle
var h = paper[1] * 96 * echelle
//I suggest to keep a bit of white space on the sides of page when plotting.
//so plot within the area leftmargin - rightmargin on the x-axis and topmargin - bottommargin on the y axis
var rightmargin = 0.9 * w
var leftmargin = 0.1 * w
var topmargin = 0.1 * h
var bottommargin = 0.9 * h
var actualwidth = rightmargin - leftmargin
var actualheight = bottommargin - topmargin

// playground
let x1, y1, x2, y2, x3, y3, x4, y4
let i = 8
let offset = 100
let speed = 0.01
let j1 = -100
let j2 = -100
let j3 = 100
let j4 = 100

let steps = 100

function setup() {
    createCanvas(w, h, SVG)
    background(255)
}

function draw() {
    background(255)

    // Tests:
    call_bezier(1)
    // save
    let button = createButton('SAVE SVG')
    button.position(w + 30, actualheight)
    button.mousePressed(save_svg)
}

function save_svg() {
    save("v3.svg")
}

function bezier_func(l) {

    noFill()
    strokeWeight(2)
    let k = 1;

    for (let j = 0; j < steps; j++) {
        // stroke(215, 36, 42)
        stroke(252, 186, 69)
        x1 = (noise(offset + i) * width + j1) * l
        y1 = (noise(offset + i * 52) * height + j1) * l
        x2 = (noise(offset + i * 53) * width + j2) * l - 100
        y2 = (noise(offset + i * 54) * height + j2) * l - 100
        x3 = (noise(offset + i * 55) * width + j3) * l + 100
        y3 = (noise(offset + i * 56) * height + j3) * l + 100
        x4 = (noise(offset + i * 57) * width + j4) * l
        y4 = (noise(offset + i * 58) * height + j4) * l

        bezier(x1, y1, x2, y2, x3, y3, x4, y4)


        offset += speed
    }
    for (let j = 0; j < steps; j++) {
        stroke(5, 171, 190)
        // stroke(0)
        x1 = (noise(offset + i) * width + j1) * l - 150
        y1 = (noise(offset + i * 2) * height + j1) * l + 150
        x2 = (noise(offset + i * 3) * width + j2) * l
        y2 = (noise(offset + i * 4) * height + j2) * l
        x3 = (noise(offset + i * 5) * width + j3) * l
        y3 = (noise(offset + i * 6) * height + j3) * l
        x4 = (noise(offset + i * 7) * width + j4) * l + 150
        y4 = (noise(offset + i * 8) * height + j4) * l + 150

        bezier(x1, y1, x2, y2, x3, y3, x4, y4)
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