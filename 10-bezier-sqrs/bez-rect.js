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

let letter_sq = [
    8.5,
    8.5
]

let a3_T = [
    16.535,
    11.693
]
let letter_T = [
    11,
    8.5
]

let letter_phone = [
    50,
    85
]

let paper = letter_phone

var echelle = 1
var w = paper[0] * 96 * echelle
var h = paper[1] * 96 * echelle
//I suggest to keep a bit of white space on the sides of page when plotting.
//so plot within the area leftmargin - rightmargin on the x-axis and topmargin - bottommargin on the y axis

let margin_size = 0.3

var rightmargin = (1 - margin_size) * w
var leftmargin = margin_size * w
var topmargin = margin_size * h
var bottommargin = (1 - margin_size) * h
var actualwidth = rightmargin - leftmargin
var actualheight = bottommargin - topmargin


function setup() {
    createCanvas(w, h, SVG)
    let bg = 10
    background(bg, bg, bg)
    fill(20)
    noStroke()
    rect(leftmargin/2, topmargin, (rightmargin/2 - leftmargin/2)*3.5, (rightmargin/2 - leftmargin/2)*3.5)
    // square(leftmargin/2, topmargin/2, (rightmargin/2 - leftmargin/2)*3.5)
    
    noLoop()
}

function draw() {
    // plot:
    // points_in_a_circle()
    let a = -20
    let b = 20
    let c = random(1)
    
    // strokeWeight(floor(random(1, 4)))
    strokeWeight(1)
    square_w_lines(60, 60, 255, a, b, c)
    // strokeWeight(floor(random(1, 4)))
    square_w_lines(60, 255, 60, a, b, c)
    // strokeWeight(floor(random(1, 4)))
    square_w_lines(255, 60, 60, a, b, c)

    // save button
    let button = createButton('SAVE SVG')
    button.position(w + 30, actualheight)
    button.mousePressed(save_svg)
}

function square_w_lines(r, g, b, t_a, t_b, r_c) {
    translate(random(t_a,t_b), random(t_a,t_b));  // Adjust these values to shift the starting position
    rotate(random(-r_c, r_c))
    stroke(r, g, b)
    draw_lines();
    rect_with_lines_shift();
}

function save_svg() {
    save("svg-file.jpg")
    // saveCanvas();
}


function draw_lines(){
    let step = 3;
    let max = 2
    for (let posX = 0; posX < 200; posX = posX + step) {
        let rand = floor(random(1, max));
        if (rand == 1){
            line(
                leftmargin, 
                min(topmargin + posX * 10, bottommargin), 
                min(leftmargin + posX * 10, rightmargin), 
                bottommargin
            );
        }
        rand = floor(random(1, max));
        if (rand == 1){
            line(
                min(topmargin + posX * 10, bottommargin), 
                leftmargin, 
                bottommargin,
                min(leftmargin + posX * 10, rightmargin)
            );
        }
    }
}

function rect_with_lines_shift(){
    push()
    translate(w/2, h/2)
    rotate(PI/2)
    translate(-w/2, -h/2)
    draw_lines()
    pop()
}