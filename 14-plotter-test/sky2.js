/* BezierCurves

References:
https://www.youtube.com/watch?v=uctX1P3H3xM
https://editor.p5js.org/PeterQwertz/sketches/Mh7aSsyMl


vec_of_bezier_lines = [...,...,...]
new_point = point
vec_of_bezier_lines[i % len(vec)] = new_point
*/

// https://github.com/rethread-studio/algorithmic-art-course/blob/main/examples/template-p5-to-svg.html
//letter: 8.5in x 11in
//96dpi is for plotting on the UUNA TEK iDraw
//which gives this width and height for a letter format paper
//w=96*8.5=816
//h=96*11=1056
let a3 = [
    11.693,
    16.535
]
let letter = [
    8.5,
    11
]
let a4 = [
    8.268,
    11.693
]
let a5 = [
    8.5,
    5.5
]
let a6 = [
    5.827,
    4.134
]
let custom26x20 = [
    7.874,    // 20 cm
    10.236  // 26 cm
]


let paper = custom26x20

var echelle = 1
var w = paper[0] * 96 * echelle
var h = paper[1] * 96 * echelle
var margin = 0.1
//I suggest to keep a bit of white space on the sides of page when plotting.
//so plot within the area leftmargin - rightmargin on the x-axis and topmargin - bottommargin on the y axis
var rightmargin = (1 - margin) * w
var leftmargin = margin * w
var topmargin = margin * h
var bottommargin = (1 - margin) * h
var actualwidth = rightmargin - leftmargin
var actualheight = bottommargin - topmargin

function setup() {
    createCanvas(w, h, SVG)
    // background(10, 10, 20)
}

function draw() {
    // draw
    // Clip to canvas boundaries
    drawingContext.save()
    drawingContext.beginPath()
    drawingContext.rect(0, 0, w, h)
    drawingContext.clip()
    art()
    drawingContext.restore()
    noLoop()
    // save
    let button = createButton('SAVE SVG')
    button.position(w + 30, actualheight)
    button.mousePressed(save_svg)
}

function save_svg() {
    let timestamp = Date.now()
    save(`sky_${timestamp}.svg`)
}

function art() {
    // axis()
    // stroke(100, 100, 100)
    strokeWeight(1)

    let step = 15
    let size = 30

    let x1_noise
    let y1_noise

    let center_x = (leftmargin + rightmargin) / 2
    let center_y = (topmargin + bottommargin) / 2
    let color_drift;

    let chaos = 12

    let first_col = 1

    for (let x1 = leftmargin; x1 < rightmargin; x1 += step){
        let first_x = 0
        let last_x1
        let last_y1

        let y1 = topmargin
        
        for (y1 = topmargin; y1 < bottommargin; y1 += step) {
        
            x1_noise = x1 + size * noise(x1 * chaos, y1 * chaos)
            y1_noise = y1 + size * noise(x1 * chaos, y1 * chaos)
            if (x1_noise > x1 + step){
                x1_noise = x1 + step
                y1_noise = y1 + step
            }

            color_drift = int(random(10,100))
            stroke(200, color_drift, 10)

            if (Math.sqrt(Math.pow(x1 - center_x, 2) + Math.pow(y1 - center_y, 2)) < 250){
                line(
                    x1, y1, 
                    x1_noise, y1_noise
                )
                if (first_x == 0){
                    line(
                        x1, y1,
                        x1, topmargin,
                    )
                    first_x = 1
                }
                last_x1 = x1_noise
                last_y1 = y1_noise
            }
        }

        if (Math.sqrt(Math.pow(x1 - center_x, 2) + Math.pow(y1 - center_y, 2)) > 280){
            
                if ((x1 - center_x >= 250) || (center_x - x1 > 250)){

                    line(
                        x1, topmargin,
                        x1, bottommargin
                    )
                }
        }

        if (last_x1 > leftmargin){
            line(
                last_x1, last_y1,
                last_x1, bottommargin
            )
        }
        first_col = 0

    }
}

