let wd = 600;
let ht = 600;
let ext_space = 40;
let int_space = 10;
let round_edges = 10;
let color_array = [];
let sq_space;

let background_color = 230;

function setup() {
    createCanvas(wd, ht);
    noLoop();
    // frameRate(0.75);

    sq_space = (wd - ext_space * 2 - int_space * 2) / 3;

    color_array = [
        color(157, 39, 25), // red
        color(21, 64, 132), // blue
        color(215, 180, 24), // yellow
        color(237, 237, 237), // white
        color(34, 34, 34) // black
    ];

}

function draw() {
    background(background_color);
    noStroke();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            print_square(i, j);
        }
    }
}

function print_square(i, j) {
    fill(random(color_array));
    square(
        ext_space + i * (sq_space + int_space),
        ext_space + j * (sq_space + int_space),
        sq_space,
        round_edges);

}


