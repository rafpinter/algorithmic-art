// circle colors
let fill_color_1 = 250;
let fill_color_2 = 12;
let fill_color_3 = 30;

function setup() {
    wd = 600;
    ht = 600;
    createCanvas(wd, ht);
    background(250);
}

function draw() {
    for (let X = 0; X < 10; X++) {
        for (let Y = 0; Y < 10; Y++) {
            create_squares(X, Y);
        }
    }
}

function create_squares(X, Y) {
    for (let posX = 0; posX < 5; posX++) {
        for (let posY = 0; posY < 5; posY++) {
            create_circles(1, 10, posX, posY, X, Y);
            create_circles(2, 100, posX, posY, X, Y);
            create_circles(3, 200, posX, posY, X, Y);
            create_circles(4, 300, posX, posY, X, Y);
        }
    }
}

function create_circles(fill_shift, pos_shift, posX, posY, X, Y) {
    fill(fill_color_1, fill_color_2, fill_color_3 * fill_shift);
    noStroke();
    circle(posX * 25 + 20 * X + pos_shift, posY * 25 + 20 * Y + pos_shift, 5);
}