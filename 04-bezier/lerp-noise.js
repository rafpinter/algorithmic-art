var a, b, c, d;

function setup() {
    createCanvas(700, 900);
    background(0);
    // noLoop();
    a = 100;
    b = 200;
    c = 300;
    d = 0;
}

function draw() {
    noLoop()
    background(0);

    stroke(255);
    strokeWeight(1);
    noFill();

    let noiseLevel = 1000;
    let noiseScale = 0.001;
    // Scale input coordinate.
    let nt = noiseScale * frameCount;
    // Compute noise value.
    let xi = noiseLevel * noise(nt);
    let yi = noiseLevel * noise(nt + 10000);

    p0 = createVector(xi, yi);
    p1 = createVector(noise(nt), d);
    p2 = createVector(2 * c, c);

    let delta = 0.05;

    beginShape();
    for (let t = 0; t <= 1.001; t += delta) {
        let x1 = lerp(p0.x, p1.x, t);
        let y1 = lerp(p0.y, p1.y, t);
        let x2 = lerp(p1.x, p2.x, t);
        let y2 = lerp(p1.y, p2.y, t);
        // map(x1, )
        strokeWeight(.2)
        line(x1, y1, x2, y2);
        let x = lerp(x1, x2, t);
        let y = lerp(y1, y2, t);
        vertex(x, y);
    }
    endShape();

}