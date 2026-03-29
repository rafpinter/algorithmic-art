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


const SKETCH_NAME = document.currentScript?.src
    .split("/")
    .pop()
    .replace(/\.js$/, "") || "sketch";

var echelle = 1
var resolution = 93
var w = paper[0] * resolution * echelle // x
var h = paper[1] * resolution * echelle // y
//I suggest to keep a bit of white space on the sides of page when plotting.
//so plot within the area leftmargin - rightmargin on the x-axis and topmargin - bottommargin on the y axis

let margin_perc = 0.16
var rightmargin = (1 - margin_perc) * w
var leftmargin = margin_perc * w
var topmargin = margin_perc * h
var bottommargin = (1 - margin_perc) * h
var actualwidth = rightmargin - leftmargin
var actualheight = bottommargin - topmargin

var center_x = w / 2
var center_y = h / 2 

let num_sq = 4
let noise_level = 1
let noise_percentage = 0.12 //0.055
let noise_percentage_inc = 0.001
let stroke_size = 1
let num_square_reps = 45
let inner_square_step = 2

function setup() {
  let cnv = createCanvas(w, h, SVG);
  cnv.style("background", "white"); // only for on-screen preview
  noLoop();
}

function draw() {
    // draw
    // Clip to canvas boundaries
    drawingContext.save()
    drawingContext.beginPath()
    drawingContext.rect(0, 0, w, h)
    drawingContext.clip()

    // ==============
    art()
    // ==============
    
    drawingContext.restore()
    // save
    let button = createButton('SAVE SVG')
    button.position(w + 30, actualheight)
    button.mousePressed(save_svg)

}

function save_svg() {
    save(`${SKETCH_NAME}.svg`)
}


function art(){
    draw_squares(num_sq, noise_level, noise_percentage)
}


function draw_squares(num_sq, noise_level=0, noise_percentage=0) {
    let x1, y1, x2, y2, x3, y3, x4, y4
    
    stroke(200,100,0)
    strokeWeight(stroke_size)
    noFill()

    x1 = leftmargin 
    y1 = topmargin 
    x2 = rightmargin 
    y2 = topmargin 
    x3 = leftmargin 
    y3 = bottommargin 
    x4 = rightmargin 
    y4 = bottommargin 
    draw_square(x1, y1, x2, y2, x3, y3, x4, y4, noise_level, noise_percentage)

    let step_x = (rightmargin - leftmargin) / (2 * num_sq - 1)
    let step_y = (bottommargin - topmargin) / (2 * num_sq - 1)

    for(let i = 0; i < num_sq - 1; i++){
        noise_percentage = noise_percentage + noise_percentage_inc
        x1 = x1 + step_x
        y1 = y1 + step_y
        x2 = x2 - step_x
        y2 = y2 + step_y
        x3 = x3 + step_x
        y3 = y3 - step_y
        x4 = x4 - step_x
        y4 = y4 - step_y
        
        if (x1 >= x2 || x3 >= x4 || y1 >= y3 || y2 >= y4 ||
            x1 >= center_x || x2 <= center_x || y1 >= center_y || y3 <= center_y)
            return
        draw_square(x1, y1, x2, y2, x3, y3, x4, y4, noise_level, noise_percentage)
        
    }
}

function draw_square(x1, y1, x2, y2, x3, y3, x4, y4, noise_level=0, noise_percentage=0){
    let x_noise = (x2 - x1) * noise_percentage
    let y_noise = (y3 - y1) * noise_percentage

    x1 = x1 + random(-x_noise, x_noise) * noise_level
    y1 = y1 + random(-y_noise, y_noise) * noise_level
    x2 = x2 + random(-x_noise, x_noise) * noise_level
    y2 = y2 + random(-y_noise, y_noise) * noise_level
    x3 = x3 + random(-x_noise, x_noise) * noise_level
    y3 = y3 + random(-y_noise, y_noise) * noise_level
    x4 = x4 + random(-x_noise, x_noise) * noise_level
    y4 = y4 + random(-y_noise, y_noise) * noise_level
        if (x1 >= x2 || x3 >= x4 || y1 >= y3 || y2 >= y4 ||
            x1 >= center_x || x2 <= center_x || y1 >= center_y || y3 <= center_y)
            return
    one_square(x1, y1, x2, y2, x3, y3, x4, y4)

    for(let j = 0; j < num_square_reps; j++){
        x1 = x1 + inner_square_step
        y1 = y1 + inner_square_step
        x2 = x2 - inner_square_step
        y2 = y2 + inner_square_step
        x3 = x3 + inner_square_step
        y3 = y3 - inner_square_step
        x4 = x4 - inner_square_step
        y4 = y4 - inner_square_step
        if (x1 >= x2 || x3 >= x4 || y1 >= y3 || y2 >= y4 ||
            x1 >= center_x || x2 <= center_x || y1 >= center_y || y3 <= center_y)
            return
        one_square(x1, y1, x2, y2, x3, y3, x4, y4)
    }
}

function one_square(x1, y1, x2, y2, x3, y3, x4, y4){
    // square
    // top
    // line(
    //     x1, y1,
    //     x2, y2
    // )
    // // left
    // line(
    //     x1, y1,
    //     x3, y3
    // )
    // // right
    // line(
    //     x2, y2,
    //     x4, y4
    // )
    // // bottom
    // line(
    //     x3, y3,
    //     x4, y4
    // )

    quad(
        x1, y1,
        x2, y2,
        x4, y4,
        x3, y3,
    )
}