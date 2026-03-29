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

let deserres = [
    9,
    12
]

let caderninho = [
    5.5,
    8.2
]

let paper = deserres

var echelle = 1
var w = paper[0] * 96 * echelle // x
var h = paper[1] * 96 * echelle // y
//I suggest to keep a bit of white space on the sides of page when plotting.
//so plot within the area leftmargin - rightmargin on the x-axis and topmargin - bottommargin on the y axis

let margin_perc = 0.15
var rightmargin = (1 - margin_perc) * w
var leftmargin = margin_perc * w
var topmargin = margin_perc * h
var bottommargin = (1 - margin_perc) * h
var actualwidth = rightmargin - leftmargin
var actualheight = bottommargin - topmargin

var center_x = w / 2
var center_y = h / 2 

function setup() {
    createCanvas(w, h, SVG)
    
    background(0)
    noLoop()
}

function draw() {
    // draw
    // Clip to canvas boundaries
    drawingContext.save()
    drawingContext.beginPath()
    drawingContext.rect(0, 0, w, h)
    drawingContext.clip()
    art()
    drawingContext.restore()
    noLoop()
    // save
    let button = createButton('SAVE SVG')
    button.position(w + 30, actualheight)
    button.mousePressed(save_svg)

}

function save_svg() {
    save("svg-file.svg")
}

function art() {

    drawEllipseLines({
        midx: w / 2,
        midy: h / 2,
        numdots: 500,
        in_rx: 200,
        in_ry: 200,
        out_rx: 800,
        out_ry: 800,
        noiseAmountX: 500,
        noiseAmountY: 200,
        noiseScale: 1,
        strokeColor: [255, 255, 200],
        strokeW: 1
    })
    }



function drawEllipseLines({
    midx,
    midy,
    numdots = 250,
    in_rx = 150,
    in_ry = 110,
    out_rx = 280,
    out_ry = 210,
    noiseAmountX = 20,
    noiseAmountY = 20,
    noiseScale = 1.5,
    strokeColor = 0,
    strokeW = 1
}) {
    stroke(strokeColor);
    strokeWeight(strokeW);

for (let i = 0; i < numdots; i++) {
    let angle = TWO_PI * i / numdots;

    let nx = map(
        noise(noiseScale * cos(angle) + 100, noiseScale * sin(angle) + 100),
        0, 1, -noiseAmountX, noiseAmountX
    );

    let ny = map(
        noise(noiseScale * cos(angle) + 500, noiseScale * sin(angle) + 500),
        0, 1, -noiseAmountY, noiseAmountY
    );

    let x1 = constrain(midx + (in_rx + nx) * cos(angle), leftmargin, rightmargin);
    let y1 = constrain(midy + (in_ry + ny) * sin(angle), topmargin, bottommargin);

    let x2 = constrain(midx + (out_rx + nx) * cos(angle), leftmargin, rightmargin);
    let y2 = constrain(midy + (out_ry + ny) * sin(angle), topmargin, bottommargin);

    line(x1, y1, x2, y2);
}
}

