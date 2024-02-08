var a, b, c, d;
let p1, p2, p3;

function setup() {
    createCanvas(700, 900);
    // background(0);
    // noLoop();
    a = 100;
    b = 100;
    c = 300;
    d = 0;
    p0 = createVector(d, c)
    p1 = createVector(c, d)
    p2 = createVector(2 * c, c)
}

function draw() {
    background(0);

    stroke(255)
    strokeWeight(1)
    noFill()

    let delta = 0.02

    beginShape()
    for (let t = 0; t <= 1.001; t += delta) {
        let x1 = lerp(p0.x, p1.x, t)
        let y1 = lerp(p0.y, p1.y, t)
        let x2 = lerp(p1.x, p2.x, t)
        let y2 = lerp(p1.y, p2.y, t)
        line(x1, y1, x2, y2)
        let x = lerp(x1, x2, t)
        let y = lerp(y1, y2, t)
        vertex(x, y)
    }
    endShape()
}