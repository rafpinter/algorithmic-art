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

var rightmargin = 0.9 * w
var leftmargin = 0.1 * w
var topmargin = 0.1 * h
var bottommargin = 0.9 * h
var actualwidth = rightmargin - leftmargin
var actualheight = bottommargin - topmargin


function save_svg() {
    save("imgs/waves.svg")
}

function setup() {
    createCanvas(w, h, SVG)
    noLoop();
    background(255)

    let button = createButton('SAVE SVG')
    button.position(w + 30, actualheight)
    button.mousePressed(save_svg)
}

function draw() {
    
}