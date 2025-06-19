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

let paper = letter_sq

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



function setup() {
    createCanvas(w*2, h*2, SVG)
    background(0)
    noLoop()
}

function draw() {
    // plot:
    // points_in_a_circle()
    let a = -30
    let b = 30
    let c = random(0.1)
    strokeWeight(1)
    stroke(random(100,255), random(100,255), random(100,255))

    translate(70, 70)

    rotate(random(-c, c))
    draw_lines()
    rect_with_lines_shift()

    translate(actualwidth + random(a,b), 0 + random(a,b));  // Adjust these values to shift the starting position
    rotate(random(-c, c))
    stroke(random(100,255), random(100,255), random(100,255))
    draw_lines();
    rect_with_lines_shift();
    translate(-actualwidth+ random(a,b), 0 + random(a,b));

    translate(0+ random(a,b), actualwidth + random(a,b));  // Adjust these values to shift the starting position
    rotate(random(-c, c))
    stroke(random(100,255), random(100,255), random(100,255))
    draw_lines();
    rect_with_lines_shift();

    translate(actualwidth + random(a,b), 0 + random(a,b));  // Adjust these values to shift the starting position
    rotate(random(-c, c))
    stroke(random(100,255), random(100,255), random(100,255))
    draw_lines();
    rect_with_lines_shift();

    // save button
    let button = createButton('SAVE SVG')
    button.position(w*2 + 30, actualheight)
    button.mousePressed(save_svg)
}

function save_svg() {
    save("svg-file.svg")
}


function draw_lines(){
    let step = 2;
    let max = 3
    for (let posX = 0; posX < 85; posX = posX + step) {
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