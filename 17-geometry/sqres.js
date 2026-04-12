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
let paper = deserres;
let margin_perc = 0.15;
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
    let x = random(150,300)
    let y = random(300,500)
    let size = random(300,400)

    square(x, y, size)
    // quadrados(x, y, size)
    let line_step = 3
    let x1, y1, x2, y2

    for(let i = 0; i < size; i += line_step){

        if(i >= size/2){
            x1 = x + i
            y1 = y + i
            x2 = x + i
            y2 = y + size
        }
        else {
            x1 = x + i,
            y1 = y + size,
            x2 = x + i,
            y2 = y + size - i
        }
        line(
            x1,
            y1,
            x2,
            y2
        )
    }

}

function triangulos(x1, y1, x2, y2, x3, y3){
    
}

function quadrados(x, y, size){
    let line_step = 5

    for(let j = 0; j < 2; j++){

        let x_drift = random(-100,100)
        let y1_drift = random(-200, 200)
        let y2_drift = random(-200, 200)

        for(let i = 0; i <= size; i += line_step){
            line(
                x + x_drift, 
                y + i + y1_drift, 
                x + size + x_drift, 
                y + i + y2_drift
            )
        }
    }
}