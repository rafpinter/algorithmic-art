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



    // save button
    let button = createButton('SAVE SVG')
    button.position(w + 30, actualheight)
    button.mousePressed(save_svg)
}

function save_svg() {
    save("svg-file.svg")
}
