/*
Genuary: Bauhaus (?)

"At the core of Bauhaus art were principles that championed simplicity and utility:
- Unity of art and technology,
- Clean, abstract styles,
- Minimalism with emphasis on rationality."
from: https://filmlifestyle.com/what-is-bauhaus/

What if I:
- recreate my rubik's cube in a bauhaus style?
- can make my cube bigger?
- use probability to remove some objects?
- change the objects and their sizes randomly?
- change the transparancy?
- remove some objects and add random strokes?
- create some projections?

Is it already Bauhaus?

Rafaela Pinter
*/

// Playground variables
// --------------------

// Cube dimensions
let dim_cube = 10;

// Objects Grid
let ext_space = 100;
let int_space = 10;

// Objects perimeter
let round_edges = 0;
let no_stroke = false;
let stroke_weight = 0;
let stroke_color = 0;

// Object color
let transp = 40;
let no_fill = false;

// Objects repetition
let max_forms_square = 10;
let max_forms_triangle = 10;
let max_forms_circles = 10;

// Objects Randomness
let random_sizes = true;
let inc_limit = 100;
let random_stroke = true;
let random_objects = false;
let object_number = 0; // Square:0 | Circle:1 | Triangle:2

// Hidden objects
let max_random_number = 5;

// Text
let add_text = true;

// Background
let mode = "random_triagles";
let r = 237;
let g = 237;
let b = 237;


// Canvas variables 
// ---------------
let wd = 800;
let ht = 900;
let color_array = [];
let sq_size = (wd - ext_space * 2 - int_space * (dim_cube - 1)) / dim_cube;
var cube;



// Setup function
function setup() {
    createCanvas(wd, ht);
    noLoop();

    // Probabilistic colors
    color_array = [
        // color(157, 39, 25, transp), // red
        // color(21, 64, 132, transp), // blue
        // color(215, 180, 24, transp), // yellow
        // color(237, 237, 237, transp), // white
        color(34, 34, 34, transp), // black
        // color(249, 91, 19), // orange
        // color(245, 245, 245), // white no transp
    ];

    cube = new Cube(
        dim_cube,
        ext_space,
        int_space,
        round_edges,
        color_array,
        sq_size);
}

// Draw function
function draw() {
    if (mode == "dark") {
        r = 40; g = 40; b = 40;
    }
    else if (mode == "random") {
        r = random(0, 255); g = random(0, 255); b = random(0, 255);
    }
    else if (mode == "random_triangles") {
        r = 110; g = 187; b = 222;
    }
    background(color(r, g, b));
    stroke(stroke_color);
    strokeWeight(stroke_weight);
    for (let i = 0; i < cube.objects.length; i++) {
        cube.objects[i].display();
    }
    txtBottom();
}

function txtBottom() {
    font = "awanzaman";
    textFont(font);
    if (add_text) {
        if (mode == "dark") {
            cor = 200;
        } else {
            cor = 30;
        }
        push();
        // Line
        translate(0, ht * 0.875);
        stroke(cor);
        strokeWeight(ht * 0.005);
        strokeCap(SQUARE);
        line(100, 0, 700, 0)
        noStroke();

        // Text
        fill(cor, cor, cor, 255);
        textAlign(100);
        textSize(ht * 0.025);
        text("is it already bauhaus?", 100, ht * 0.031);
        pop();
    }
}

// Cube data structure
class Cube {
    constructor(shape, ext_space, int_space, round_edges, color_array, sq_size) {
        this.shape = shape;
        this.ext_space = ext_space;
        this.int_space = int_space;
        this.round_edges = round_edges;
        this.color_array = color_array;
        this.sq_size = sq_size;
        this.create_objects();
    }

    create_objects() {
        this.objects = [];
        for (let i = 0; i < this.shape; i++) {
            for (let j = 0; j < this.shape; j++) {
                let randint;
                if (random_objects) {
                    randint = floor(random(max_random_number));
                }
                else {
                    randint = object_number;
                }
                console.log(randint);

                if (randint === 0) {
                    // push square
                    this.objects.push(new Square(
                        i,
                        j,
                        this.sq_size,
                        this.round_edges,
                        this.color_array,
                        this.ext_space,
                        this.int_space
                    ));
                }
                else if (randint === 1) {
                    // push circle
                    this.objects.push(new Circle(
                        i,
                        j,
                        this.sq_size,
                        this.round_edges,
                        this.color_array,
                        this.ext_space,
                        this.int_space
                    ));
                }
                else if (randint === 2) {
                    // push triangle
                    this.objects.push(new Triangle(
                        i,
                        j,
                        this.sq_size,
                        this.round_edges,
                        this.color_array,
                        this.ext_space,
                        this.int_space
                    ));
                }
            }
        }
    }
}

class GeometricForm {
    constructor(x, y, size, round_corner, color_array, ext_space, int_space) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.round_corner = round_corner;
        this.color_array = color_array;
        this.ext_space = ext_space;
        this.int_space = int_space;

        this.dimensions();
        this.fill_object();
        this.object_stroke();
    }

    dimensions() {
        this.xmin = this.ext_space + this.x * (this.size + this.int_space);
        this.xmax = this.xmin + this.size;
        this.ymin = this.ext_space + this.y * (this.size + this.int_space)
        this.ymax = this.ymin + this.size;
    }

    fill_object() {
        this.fill_color = random(this.color_array);
    }

    object_stroke() {
        if (no_stroke == false) {
            stroke(0);
        }
        else {
            noStroke();
        }
    }

    redraw_object() {
        this.fill_color = random(this.color_array);
        if (this.fill_color != color(background_color, transp)) {
            this.display();
        }
    }
}


class Circle extends GeometricForm {
    display() {
        let inc = 0;
        if (random_sizes) {
            inc = random(-inc_limit, inc_limit);
        }
        for (let i = 0; i < max_forms_circles; i++) {
            if (no_fill) {
                noFill();

            } else {
                fill(this.fill_color);
            }
            circle(
                this.xmin + this.size / 2 + i,
                this.ymin + this.size / 2 + i,
                this.size + inc,
            );
        }
    }
}

class Triangle extends GeometricForm {
    display() {
        // Triangle points
        let x1, y1, x2, y2, x3, y3;
        // Default triangle
        x1 = this.xmin;
        y1 = this.ymax;
        x2 = this.xmax;
        y2 = this.ymax;
        x3 = (this.xmin + this.xmax) / 2;
        y3 = this.ymin;

        let randint = floor(random(3));

        // Other side
        if (randint === 1) {
            y1 = this.ymin;
            y2 = this.ymin;
            x3 = (this.xmin + this.xmax) / 2;
            y3 = this.ymax;
        }
        // Other side
        else if (randint === 2) {
            y1 = this.ymin;
            x2 = this.xmin;
            x3 = this.xmax;
            y3 = (this.ymin + this.ymax) / 2;
        }

        // Controling stroke
        if (random_stroke || no_stroke) {
            noStroke();
        }

        for (let i = 0; i < max_forms_triangle; i++) {
            // Displaying figure
            if (no_fill) {
                noFill();
            }

            else {
                fill(this.fill_color);
            }
            triangle(
                x1 - i,
                y1 - i,
                x2 - i,
                y2 - i,
                x3 - i,
                y3 - i
            );
        }
    }
}


// Squares data structure
class Square extends GeometricForm {
    display() {

        let inc = 0;
        if (random_sizes) {
            inc = random(-inc_limit, inc_limit);
        }
        for (let i = 0; i < max_forms_square; i++) {
            // Drawing object        
            if (no_fill) {
                noFill();

            } else {
                fill(this.fill_color);
            }

            if (round_edges != 0) {
                rect(
                    this.xmin + i,
                    this.ymin + i,
                    this.size + inc + i,
                    this.size + inc + i,
                    this.round_corner
                );
            }
            else {
                rect(
                    this.xmin + i,
                    this.ymin + i,
                    this.size + inc,
                );
            }
        }
    }
}






/*
the figures, I don't know. but the code surely is.
*/