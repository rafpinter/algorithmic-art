function setup() {
    var wd = 580;
    var ht = 750;
    createCanvas(wd, ht);
}

function draw() {
    // Dark background
    background(0);
    let padding = 10;

    let a = random(padding, width - padding);
    let c = random(padding, width - padding);
    let e = random(padding, width - padding);
    let g = random(padding, width - padding);
    let i = random(padding, width - padding);
    let k = random(padding, width - padding);

    let b = random(padding, height - padding);
    let d = random(padding, height - padding);
    let f = random(padding, height - padding);
    let h = random(padding, height - padding);
    let j = random(padding, height - padding);
    let m = random(padding, height - padding);

    // Configuring the line
    strokeWeight(2);
    stroke(255, 204, 0);

    // Testing foor loop
    line(k, m, d, e);

    for (let posX = 0; posX < 5; posX++) {
        for (let posY = 0; posY < 5; posY++) {
            circle(posX * 25 + a, posY * 25 + b, 10);
        }
    }

    // connecting lines
    //   x1 y1 x2 y2
    line(c, b, d, e);
    line(c, b, f, g);
    line(c, h, f, g);
    line(c, h, i, j);
    noLoop();
}
