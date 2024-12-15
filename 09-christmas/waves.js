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

const RESOLUTION = 25;

function f(x, y) {
    const value = (sin(x) + cos(y));
    // const value = (x) + (y);
    return map(value, -1, 1, -TWO_PI, TWO_PI);
}

function save_svg() {
    save("waves.svg")
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
    for (let x = RESOLUTION / 2; x < width; x += RESOLUTION) {
        beginShape()
        for (let y = RESOLUTION / 2; y < height; y += RESOLUTION) {
            newX = x
            newY = y
            var angle = f(x, y)
            // fill(10 * sin(angle))
            strokeWeight(1)
            vertex(x + 10 * sin(angle), y + 10 * sin(angle))
            // stroke(55, 123, 223)
        }
        endShape()
    }
}