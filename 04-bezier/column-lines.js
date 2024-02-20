let shape = 800;
let edge = 3 * shape / 100
let inc = 10

function setup() {
    createCanvas(shape, shape)
    background(0)
}

function draw() {
    noLoop()
    background(230, 230, 220);
    fill(25)
    noStroke()

    square(edge, edge, shape - 2 * edge)

    let x1, x2, x3, x4
    let meio = shape / 2;
    let den = 7
    let frac = shape / den
    let quinto = shape / 5;
    x1 = quinto
    x2 = meio - 100
    x3 = meio + 100
    x4 = shape - quinto
    let passo = (x2 - x1) / 5;
    stroke(100)
    let i = 1.15;
    for (let a = frac; a < (den - 1) * frac; a = a + inc) {
        strokeWeight(1 + noise(a + 10) * i)
        line(edge, meio, x1, a)
        strokeWeight(1 + noise(a + 20) * i)
        line(x1, a, x2, a)
        strokeWeight(1 + noise(a + 30) * i)
        line(x2, a, meio, meio)
        strokeWeight(1 + noise(a + 40) * i)
        line(meio, meio, x3, a)
        strokeWeight(1 + noise(a + 50) * i)
        line(x3, a, x4, a)
        strokeWeight(1 + noise(a + 60) * i)
        line(x4, a, shape - edge, meio)
        // bezier_vertexes(x3, a, x4, a, a, passo)
        // bezier_vertexes(x1, a, x2, a, a, passo)
    }
}
// x1 = 160
// x2 = 350
// x3 = 450
// x4 = 640
function bezier_vertexes(xi, yi, xo, yo, offset, passo) {
    beginShape();
    noFill()
    vertex(xi, yi);
    bezierVertex(
        xi + passo * 1, yi + noise(offset + 10) * 50,
        xi + passo * 2, yi + noise(offset + 20) * 50,
        xi + passo * 3, yi + noise(offset + 30) * 50,);
    bezierVertex(
        xi + passo * 4, yi + noise(offset + 50) * 50,
        xi + passo * 5, yi + noise(offset + 50) * 50,
        xo, yo);
    // bezierVertex(50, 140, 75, 140,);
    endShape();

}

n