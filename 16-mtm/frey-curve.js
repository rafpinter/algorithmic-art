// https://github.com/rethread-studio/algorithmic-art-course/blob/main/examples/template-p5-to-svg.html
// letter: 8.5in x 11in
// 96dpi is for plotting on the UUNA TEK iDraw
// which gives this width and height for a letter format paper
// w=96*8.5=816
// h=96*11=1056
let a3 = [11.693, 16.535];
let letter = [8.5, 11];
let deserres = [9, 12];
let caderninho = [5.5, 8.2];
let marcapagina = [2, 6];

// ---------------------------
// Choose paper and margin
let paper = marcapagina;
let margin_perc = 0.16;
// ---------------------------

const SKETCH_NAME =
  document.currentScript?.src.split("/").pop().replace(/\.js$/, "") || "sketch";

let echelle = 1;
let resolution = 93;
let w = paper[0] * resolution * echelle;
let h = paper[1] * resolution * echelle;

// Useful variables for plotting
let rightmargin = (1 - margin_perc) * w;
let leftmargin = margin_perc * w;
let topmargin = margin_perc * h;
let bottommargin = (1 - margin_perc) * h;
let actualwidth = rightmargin - leftmargin;
let actualheight = bottommargin - topmargin;
let center_x = w / 2;
let center_y = h / 2;

let monoFont;

function preload() {
  monoFont = loadFont("1CAMBam_Stick_9.ttf");
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

// ---------------------------
// SKETCH
// ---------------------------

function art() {
  stroke(0);
  strokeWeight(1);

  const xScale = 4;
  const xMin = -500;
  const xMax = 500;
  let step = 1.9;
  let abstep = 3.5;

  rect(0,0,w,h)
//   line(0,0, 0,h)

  const nValues = [2, 3, 5, 7, 11];

  for (const n of nValues) {
    for (let b = 2; b < 8; b += abstep) {
      for (let a = 1; a < 10; a += abstep) {
        for (let sx = xMin; sx <= xMax; sx += step) {
          let x = sx / xScale;
          let y = frey(x, a, b, n);

          if (y === null) continue;

          let px = sx + center_x - 20;
          point(px, center_y + 100 - y);
          point(px, center_y + 100 + y);
        }
      }
    }
  }

  draw_text();
}

function frey(x, a, b, n) {
  let A = Math.pow(a, n);
  let B = Math.pow(b, n);

  let d = x * (x - A) * (x + B);

  if (d < 0) {
    if (d > -1e-9) d = 0;
    else return null;
  }

  return Math.sqrt(d);
}

// Replace normal spaces with non-breaking spaces so SVG keeps indentation
function preserveSvgSpaces(line) {
  return line
    .replace(/\t/g, "    ")
    .replace(/ /g, "\u00A0");
}

function draw_text() {
  push();
  textSize(12);
  textLeading(100);

  if (monoFont) {
    textFont(monoFont);
  } else {
    textFont("monospace");
  }

  let code = ` 
function frey(x, a, b, n) {

  let A = Math.pow(a, n)

  let B = Math.pow(b, n)

  let t = x*(x — A)*(x + B)

  let y = Math.sqrt(t)

  return y

}`;

  let lines = code.split("\n");
  let x = 10;
  let y = 42;

  for (let i = 0; i < lines.length; i++) {
    text(preserveSvgSpaces(lines[i]), x, y + i * 9);
  }

  pop();
}