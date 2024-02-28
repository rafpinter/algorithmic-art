let shape = 800;
let edge = 3 * shape / 100
let inc = 10
// let svgbtn;

function setup() {
    createCanvas(shape, shape)
    background(0)

    // svgbtn = createButton("save svg");
    // placebtn()
    // svgbtn.mouseClicked(savesvg);
}

// function placebtn() {
//     var x = (windowWidth - w) / 2;
//     var y = (windowHeight - h) / 2;
//     // genbtn.position(x - 200, y + h / 2)
//     svgbtn.position(x - 200, y + h / 2 + 42)
//     // gcodebtn.position(x - 200, y + h / 2 + 84)
// }

// function savesvg() {
//     save("plottable001.svg");
// }

function draw() {
    noLoop()
    background(230, 230, 220);
    fill(25)
    // noStroke()

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
    stroke(100, random(10, 300))
    let i = 2;
    for (let a = frac; a < (den - 1) * frac; a = a + inc) {
        strokeWeight(1 + noise(a + 10) * i)
        stroke(100, random(200, 300))
        line(edge, meio, x1, a)
        // bezier_vertexes(edge, meio, x1, a, a, passo)

        strokeWeight(1 + noise(a + 20) * i)
        stroke(100, random(10, 300))
        // line(x1, a, x2, a)
        bezier_vertexes(x1, a, x2, a, a, passo)

        strokeWeight(1 + noise(a + 30) * i)
        line(x2, a, meio, meio)
        // bezier_vertexes(x2, a, meio, meio, a, passo)

        strokeWeight(1 + noise(a + 40) * i)
        line(meio, meio, x3, a)
        // bezier_vertexes(meio, meio, x3, a, a, passo)

        strokeWeight(1 + noise(a + 50) * i)
        // line(x3, a, x4, a)
        bezier_vertexes(x3, a, x4, a, a, passo)

        strokeWeight(1 + noise(a + 60) * i)
        line(x4, a, shape - edge, meio)
        // bezier_vertexes(x4, a, shape - edge, meio, a, passo)
    }
}


function bezier_vertexes(xi, yi, xo, yo, offset, passo) {
    beginShape();
    noFill()
    vertex(xi, yi);
    bezierVertex(
        xi + passo * 1, yi + noise(offset + 10) * 20,
        xi + passo * 2, yi + noise(offset + 20) * 20,
        xi + passo * 3, yi + noise(offset + 30) * 20,);
    bezierVertex(
        xi + passo * 4, yi + noise(offset + 50) * 20,
        xi + passo * 5, yi - 10,
        xo, yo);

    endShape();
}
