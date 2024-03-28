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
let small_paper = [
    5.5,
    5.5
]

let paper = small_paper

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
let i = 100
let offset = 2
let speed = 0.017

let j1 = 0
let j2 = -100
let j3 = -100
let j4 = 0

// let j1 = -300
// let j2 = -100
// let j3 = -100
// let j4 = 300

let steps = 50

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
    save("v2.svg")
}

function call_bezier(l) {

    noFill()
    strokeWeight(2)

    for (let j = 0; j < steps; j++) {

        x1 = (noise(offset + i) * width) * l + j1
        y1 = (noise(offset + i * 2) * height) * l + j1
        x2 = (noise(offset + i * 3) * width) * l
        y2 = (noise(offset + i * 4) * height) * l
        x3 = (noise(offset + i * 5) * width) * l
        y3 = (noise(offset + i * 6) * height) * l
        x4 = (noise(offset + i * 7) * width) * l + j4
        y4 = (noise(offset + i * 8) * height) * l + j4
        stroke(0, 161, 171)
        bezier(x1, y1, x2, y2, x3, y3, x4, y4)


        stroke(227, 109, 159)
        line(x3, y3, rightmargin, y3)
        line(x2, bottommargin, x2, y2)

        offset += speed
    }
    noLoop()
}
