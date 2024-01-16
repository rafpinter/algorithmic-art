let stroke_col = 255;

function setup() {
    wd = 580;
    ht = 750;
    createCanvas(wd, ht);

    let background_a = random(0, 255);
    let background_b = random(0, 255);
    let background_c = random(0, 255);

    c1 = color(stroke_col);
    c2 = color(background_a, background_b, background_c);

    for (let y = 0; y < height; y++) {
        n = map(y, 0, height, 0, 1);
        let newc = lerpColor(c1, c2, n);
        stroke(newc);
        line(0, y, width, y);
    }
}

function draw() {
    let max = 2;
    let i_max = random(3, max);
    let j = random(3, max);
    for (let i = 1; i < i_max; i++)
        graphFunction(x => sin(i * x + i) * cos(x + j), 0, 2 * PI);
    // graphFunction(x => sin(i * x + i) ^ 2 * cos(x + j), 0, 2 * PI);
    // graphFunction(x => sin(i * x + i ^ 2) * cos(x + j), 0, 2 * PI);
    noLoop();

}

// not my code from here:
// credits to https://www.youtube.com/watch?v=Q9Gje2vh22Q
function graphFunction(fn, x1, x2) {
    let o = getFunctionValues(fn, x1, x2, 10000);

    let values = o.values;
    let y1 = o.min;
    let y2 = o.max;

    drawGraph(values, x1, x2, y1, y2);
}

function drawGraph(values, x1, x2, y1, y2) {
    stroke(stroke_col);
    strokeWeight(20);

    for (let i = 0; i < values.length - 1; i++) {
        let x = values[i].x;
        let y = values[i].y;

        let screenX = map(x, x1, x2, 0, width - 1);
        let screenY = map(y, y1, y2, height - 1, 0);

        let xNext = values[i + 1].x;
        let yNext = values[i + 1].y;

        let screenXNext = map(xNext, x1, x2, 0, width - 1);
        let screenYNext = map(yNext, y1, y2, height - 1, 0);

        line(screenX, screenY, screenXNext, screenYNext);
    }
}

function getFunctionValues(fn, x1, x2, n) {
    let ar = [];
    let min = Infinity;
    let max = -Infinity;

    let step = (x2 - x1) / n;

    for (let x = x1; x <= x2; x += step) {
        let y = fn(x);
        ar.push({ x, y });

        if (y < min) {
            min = y;
        }

        if (y > max) {
            max = y;
        }
    }

    return { values: ar, min, max };
}