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
    10,
    10
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
let i = 1000
let offset = 1
let speed = 0.014
let j1 = -100
let j2 = -100
let j3 = 100
let j4 = 100

let steps = 50

function setup() {
    createCanvas(w, h, SVG)
    // background(255)
    clear()
    noLoop()
}

function draw() {
    //draw
    bezier_func(1)
    // save
    let button = createButton('SAVE SVG')
    button.position(w + 30, actualheight)
    button.mousePressed(save_svg)

    draw_text()
}

function save_svg() {
    save("v1.svg")
}

function bezier_func(l) {
    noFill()
    strokeWeight(1.5)

    for (let j = 0; j < steps; j++) {

        stroke(5, 171, 190)
        x1 = (noise(offset + i) * width + j1) * l
        y1 = (noise(offset + i + 2) * height + j1) * l
        x2 = (noise(offset + i + 3) * width + j2) * l
        y2 = (noise(offset + i + 4) * height + j2) * l
        x3 = (noise(offset + i + 5) * width + j3) * l
        y3 = (noise(offset + i + 6) * height + j3) * l
        x4 = (noise(offset + i + 7) * width + j4) * l
        y4 = (noise(offset + i + 8) * height + j4) * l

        bezier(x1, y1, x2, y2, x3, y3, x4, y4)

        line(leftmargin, x1, x1, y1)
        let max_right
        if (y4 > rightmargin) {
            max_right = rightmargin
        } else {
            max_right = y4
        }

        line(x4, y4, max_right, bottommargin)

        offset += speed
    }
}

function draw_text() {
    stroke(5, 171, 190)

    let myFont

    myFont = loadFont('/Users/rafaelapinter/Library/Mobile Documents/com~apple~CloudDocs/1.UdeM/github-projects/algorithmic-art/07-vernissage/fonts/1CamBam_Stick_2.ttf')
    textFont(myFont)
    textSize(32)
    text(`
    function bezier_func(l) {
        noFill()
        strokeWeight(1.5)
        for (let j = 0; j < steps; j++) {
            stroke(5, 171, 190)
            x1 = (noise(offset + i) * width + j1) * l
            y1 = (noise(offset + i + 2) * height + j1) * l
            x2 = (noise(offset + i + 3) * width + j2) * l
            y2 = (noise(offset + i + 4) * height + j2) * l
            x3 = (noise(offset + i + 5) * width + j3) * l
            y3 = (noise(offset + i + 6) * height + j3) * l
            x4 = (noise(offset + i + 7) * width + j4) * l
            y4 = (noise(offset + i + 8) * height + j4) * l
            bezier(x1, y1, x2, y2, x3, y3, x4, y4)
            let max_right
            if (y4 > rightmargin) {
                max_right = rightmargin
            } else {
                max_right = y4
            }
            // 1
            line(leftmargin, x1, x1, y1)
            line(x4, y4, max_right, bottommargin)
            // 2
            line(x3, y3, rightmargin, y3)
            line(x2, bottommargin, x2, y2)
            // 3
            // repeat
            offset += speed
        }
    }
    `, 200, 900, 300)
}