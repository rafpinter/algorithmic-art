let wd;
let ht;
function setup() {
    wd = 580;
    ht = 750;
    createCanvas(wd, ht);
}

function draw() {
    // Dark background
    background(77, 117, 196);

    // Configuring the line
    strokeWeight(1);
    stroke(255, 204, 0);

    let partition = 1000;
    for (let i = 0; i < partition; i++) {
        fill(77, 117, 196 - i * 15);
        noStroke();
        rect(0, ht / i, wd, ht / i);
    }
    for (let j = 0; j < 100; j++) {
        stroke(100);
        line(0, ht, (wd - wd / 5) / 2, (ht / 5));
        line(wd, ht, (wd + wd / 5) / 2, (ht / 5));
    }
    noLoop();
}
