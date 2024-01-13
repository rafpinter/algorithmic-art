let wd;
let ht;
function setup() {
    wd = 580;
    ht = 750;
    createCanvas(wd, ht);
}

function draw() {
    // Dark background
    background(0);

    // Configuring the line
    strokeWeight(1);
    stroke(255, 204, 0);

    // line(100, 100, 500, 100);
    for (let posX = 0; posX < 100; posX++) {
        line(1, 1 + posX * 10, 1 + posX * 10, ht);

    }
}
