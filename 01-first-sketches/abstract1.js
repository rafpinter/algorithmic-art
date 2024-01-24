function setup() {
    var wd = 575;
    var ht = 750;
    createCanvas(wd, ht);
}

function draw() {
    // Dark background
    background(0);

    // Configuring the line
    strokeWeight(2);
    stroke(255, 204, 0);

    // Testing foor loop
    line(100, 100, 500, 100);
    for (let posX = 0; posX < 5; posX++) {
        for (let posY = 0; posY < 5; posY++) {
            circle(posX * 25 + 100, posY * 25 + 150, 10);
        }
    }

    // connecting lines
    line(400, 400, 500, 100);
    line(400, 400, 85, 700);
    line(400, 45, 85, 700);
    line(400, 45, 80, 75);
}
