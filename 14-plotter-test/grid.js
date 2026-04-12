// https://github.com/rethread-studio/algorithmic-art-course/blob/main/examples/template-p5-to-svg.html
// letter: 8.5in x 11in
// 96dpi is for plotting on the UUNA TEK iDraw
// which gives this width and height for a letter format paper
// w=96*8.5=816
// h=96*11=1056
let a3 = [11.693, 16.535];
let letter = [8.5, 11];
let deserres = [9.06, 12];
let caderninho = [5.5, 8.2];
let marcapagina = [2, 6];

// ---------------------------
// Choose paper and margin
// ---------------------------
let paper = deserres;
let margin_perc = 0.1;

// ---------------------------
// Common set up
// ---------------------------

const SKETCH_NAME =
  document.currentScript?.src.split("/").pop().replace(/\.js$/, "") || "sketch";

let echelle = 1;
let resolution = 96;
let w = paper[0] * resolution * echelle; // 869,76
let h = paper[1] * resolution * echelle; // 1152

// Useful variables for plotting
let rightmargin = (1 - margin_perc) * w;
let leftmargin = margin_perc * w;
let topmargin = margin_perc * h;
let bottommargin = (1 - margin_perc) * h;
let actualwidth = rightmargin - leftmargin;
let actualheight = bottommargin - topmargin;
let center_x = w / 2;
let center_y = h / 2;
let x_y_prop = paper[0] / paper[1];
let monoFont;

function preload() {
  monoFont = loadFont("../00-templates/1CAMBam_Stick_9.ttf");
}

function setup() {
  let cnv = createCanvas(w, h, SVG);
  cnv.style("background", "white");
  let button = createButton("SAVE SVG");
  button.position(w + 30, actualheight);
  button.mousePressed(save_svg);
  noLoop();
}

function draw() {
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(0, 0, w, h);
  drawingContext.clip();
  art();
  drawingContext.restore();
}

function save_svg() {
  save(`${SKETCH_NAME}.svg`);
}

function draw_text(txt_str, txt_size, txt_x, txt_y) {
    push();
    stroke(0);
    textSize(txt_size);
    textLeading(100);
    textFont(monoFont); // textFont("monospace");
    let lines = txt_str.split("\n");
    for (let i = 0; i < lines.length; i++) {
        text(preserveSvgSpaces(lines[i]), txt_x, txt_y + i * 9).replace(/\t/g, "    ").replace(/ /g, "\u00A0");
    }
    pop();
}

// ---------------------------
// SKETCH
// ---------------------------
// playground
let x1, y1, x2, y2, x3, y3, x4, y4
let i = 100
let offset = 3
let speed
let j1 = -100
let j2 = -100
let j3 = 100
let j4 = 100

function art() {
  let n_x = 10;
  let n_y = Math.ceil(n_x / x_y_prop);

  let step_x = actualwidth / n_x;
  let step_y = actualheight / n_y;

  stroke(0);
  noFill();

    // vertical lines
    for (let x = leftmargin; x <= rightmargin; x += step_x) {
        line(x, topmargin, x, bottommargin);
    }

    // horizontal lines
    for (let y = topmargin; y <= bottommargin; y += step_y) {
        line(leftmargin, y, rightmargin, y);
    }

    let choice = random([5])
    let r1 = random(0, 255)
    let r2 = random(0, 255)
    let g1 = random(0, 255)
    let g2 = random(0, 255)
    let b1 = random(0, 255)
    let b2 = random(0, 255)
    // speed = random(0.003, 0.007)
    speed = random(0.005, 0.02)
    steps = random(10, 10)

    for (let j = 0; j < steps; j++) {


    x1 = (noise(offset + i)     * width     + j1)
    y1 = (noise(offset + i + 2) * height    + j1)
    x2 = (noise(offset + i + 3) * width     + j2)
    y2 = (noise(offset + i + 4) * height    + j2)
    x3 = (noise(offset + i + 5) * width     + j3)
    y3 = (noise(offset + i + 6) * height    + j3)
    x4 = (noise(offset + i + 7) * width     + j4)
    y4 = (noise(offset + i + 8) * height    + j4)

    if (choice == 0) {
        stroke(r1, b1, g1)
        bezier(x1, y1, x2, y2, x3, y3, x4, y4)
        line(leftmargin, x1, x1, y1)
        let max_right
        if (y4 > rightmargin) {
            max_right = rightmargin
        } else {
            max_right = y4
        }
        line(x4, y4, max_right, bottommargin)
    }
    else if (choice == 1) {
        stroke(r1, g1, b1)
        bezier(x1, y1, x2, y2, x3, y3, x4, y4)
        stroke(r2, g2, b2)
        // line(x3, y3, rightmargin, y3)
        // line(x2, bottommargin, x2, y2)
    }
    else if (choice == 3) {
        x1 = (noise(offset + i)     * width     + j1    + random(0,300))
        y1 = (noise(offset + i + 2) * height    + j1    + random(0,300))
        x2 = (noise(offset + i + 3) * width     + j2    + random(0,300))
        y2 = (noise(offset + i + 4) * height    + j2    + random(0,300))
        x3 = (noise(offset + i + 5) * width     + j3    + random(0,300))
        y3 = (noise(offset + i + 6) * height    + j3    + random(0,300))
        x4 = (noise(offset + i + 7) * width     + j4    + random(0,300))
        y4 = (noise(offset + i + 8) * height    + j4    + random(0,300))

    }
    offset += speed
    }
}