let stroke_col = 200;
let fill_col = 30;

function setup() {
    wd = 600;
    ht = 600;
    createCanvas(wd, ht);
    background(220);
}

function draw() {
    for (let X = 0; X < 10; X++) {
        for (let Y = 0; Y < 10; Y++) {
            for (let posX = 0; posX < 5; posX++) {
                for (let posY = 0; posY < 5; posY++) {
                    fill(fill_col);
                    noStroke();
                    circle(posX * 25 + 20 * X + 10, posY * 25 + 20 * Y + 10, 5);

                    fill(fill_col * 2);
                    noStroke();
                    circle(posX * 25 + 20 * X + 100, posY * 25 + 20 * Y + 100, 5);

                    fill(fill_col * 3);
                    noStroke();
                    circle(posX * 25 + 20 * X + 200, posY * 25 + 20 * Y + 200, 5);

                    fill(fill_col * 4);
                    noStroke();
                    circle(posX * 25 + 20 * X + 300, posY * 25 + 20 * Y + 300, 5);
                }
            }
        }
    }
}

// function not working
function create_squares(position_shift, fill_mult, fill_col) {
    fill(fill_col * fill_mult);
    circle(posX * 25 + 20 * X + position_shift, posY * 25 + 20 * Y + position_shift, 5);
}