// Global variables
let wd = 1000;
let ht = 600;
let color_array = [];
let background_color = 240;


// Setup function
function setup() {
    createCanvas(wd, ht);
    noLoop();
    color_array = [
        color(166, 41, 13, 200), // red
        color(4, 119, 191, 200), // blue
        color(34, 34, 34, 200), // black
        color(242, 183, 5, 200), // yellow
    ]
}

// Draw function
function draw() {
    background(background_color);
    // hi-hat
    draw_elipse(width, height, 2, 220, 290, 350, 70, color_array);
    // cymbal1
    draw_elipse(width, height, 2.59, 150, 250, 500, 50, color_array);
    // snare
    draw_elipse(width, height, 0, -200, 100, 280, 280, color_array);
    // draw_line(100, 300, 110, 520);

    // tom
    draw_elipse(width, height, 0, -100, -100, 200, 150, color_array);
    // ride
    draw_elipse(width, height, 3, -200, 100, 350, 300, color_array);
    // bass drum
    // draw_line(400, 230, 800, 200);

    draw_elipse(width, height, 0, 50, 100, 450, 250, color_array);
    // floor tom
    draw_elipse(width, height, 2, 0, -350, 250, 200, color_array);
    // cymbal2
    draw_elipse(width, height, 4, -100, 250, 500, 50, color_array);
    // china
    draw_elipse(width, height, 4.5, -100, 400, 400, 20, color_array);

    // draw_line(750, 200, 730, 520);
    // draw_line(700, 200, 730, 520);
    // draw_line(900, 300, 730, 520);
    draw_line(200, 100, 300, 520);


}

function draw_elipse(width, height, rotation, x1, y1, w, h, color_array) {
    fill(random(color_array));
    push();
    noStroke();
    // translate to where you want the center of the ellipse to be
    translate(width / 2, height / 2);
    // rotate using the frameCount (increases by one on each frame)
    rotate(rotation);
    // draw the ellipse at the origin
    ellipse(x1, y1, w, h);
    pop();
}

function draw_line(x1, y1, x2, y2) {
    strokeWeight(3);
    stroke(60);
    line(x1, y1, x2, y2);
    // line(100, 200, 500, 200);
    noStroke();
}