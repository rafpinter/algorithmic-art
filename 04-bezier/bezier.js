/* BezierCurves

References:
https://www.youtube.com/watch?v=uctX1P3H3xM
https://editor.p5js.org/PeterQwertz/sketches/Mh7aSsyMl
*/
let pause = false
let x1, y1, x2, y2, x3, y3, x4, y4
let i = 30
let offset = 100
let speed = 0.005

function setup() {
    createCanvas(700, 900)
    background(0)
}

function draw() {
    noFill()
    strokeWeight(1)

    stroke(
        noise(offset + i) * width,
        noise(offset + i * 2) * height,
        noise(offset + i * 3) * width,
        50)


    x1 = noise(offset + i) * width
    y1 = noise(offset + i * 2) * height
    x2 = noise(offset + i * 3) * width
    y2 = noise(offset + i * 4) * height
    x3 = noise(offset + i * 5) * width
    y3 = noise(offset + i * 6) * height
    x4 = noise(offset + i * 7) * width
    y4 = noise(offset + i * 8) * height
    bezier(x1, y1, x2, y2, x3, y3, x4, y4)
    offset += speed
}

function rects(x, y, w, h, stroke_col) {
    noFill()
    stroke(stroke_col)
    if (w < 10 || h < 10) {
        return;
    } else {
        rect(x, y, w, h);
        rects(x + 10, y + 15, w - 20, h - 20, stroke_col - 10);
    }

}

function mousePressed() {
    if (pause == false) {
        noLoop()
        pause = true
    } else {
        loop()
        pause = false
    }
}