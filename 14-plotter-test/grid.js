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
let paper = deserres;
let margin_perc = 0;
// ---------------------------

const SKETCH_NAME =
  document.currentScript?.src.split("/").pop().replace(/\.js$/, "") || "sketch";

let echelle = 1;
let resolution = 96;
let w = paper[0] * resolution * echelle; // 871
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

// ---------------------------
// SKETCH
// ---------------------------

function art() {

    line(leftmargin, 950, rightmargin, 950)
    // line(center_x + 55, bottommargin, center_x + 55, 0)

    draw_text();
}

// Replace normal spaces with non-breaking spaces so SVG keeps indentation
function preserveSvgSpaces(line) {
  return line
    .replace(/\t/g, "    ")
    .replace(/ /g, "\u00A0");
}

function draw_text() {
    push();
    stroke(0);
    textSize(18);
    textLeading(100);

    if (monoFont) {
    textFont(monoFont);
    } else {
    textFont("monospace");
    }

    let code = `testando 1 2`;

    let lines = code.split("\n");
    let x = 10;
    let y = random(500,1200);

    for (let i = 0; i < lines.length; i++) {
        text(preserveSvgSpaces(lines[i]), x, y + i * 9);
    }
    pop();
}