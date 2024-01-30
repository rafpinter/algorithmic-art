
/*
Genuary: Bauhaus

"At the core of Bauhaus art were principles that championed simplicity and utility:
- Unity of art and technology,
- Clean, abstract styles,
- Minimalism with emphasis on rationality."
from: https://filmlifestyle.com/what-is-bauhaus/

Inspirations:
- Mondrian: 
- https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.peoplesworld.org%2Farticle%2F100-years-of-bauhaus-building-for-a-society-of-equals%2F&psig=AOvVaw3R0SELCYlxOXtjsYoEcSwm&ust=1706206557542000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIiwnvHQ9oMDFQAAAAAdAAAAABAD

Rafaela Pinter
*/


// Playground variables
// --------------------
// Cube dimensions
let number_circles = 300;

// Grid
let ext_space = 100;
let int_space = 20; // min: 5

// Objects
let round_edges = 0;
let random_stroke = true;
let transp = 200;
let stroke_weight = 0;
let stroke_color = 0;
let no_fill = false;

// Randomness
let random_sizes = true;
let inc_limit = 100;
let no_stroke = true;
// ---------------------

// Global variables
let wd = 800;
let ht = 800;
let color_array = [];
let r = 237; // 110
let g = 235; // 187
let b = 228; // 19
let sq_size = (wd - ext_space * 2 - int_space * (dim_cube - 1)) / dim_cube;
var cube;

// Setup function
function setup() {
    createCanvas(wd, ht);
    noLoop();

    // // probabilistic colors
    color_array = [
        color(157, 39, 25, transp), // red
        color(21, 64, 132, transp), // blue
        color(215, 180, 24, transp), // yellow
        color(34, 34, 34, transp), // black
        color(237, 237, 237, transp), // white
    ];
    cube = new Cube(dim_cube, ext_space, int_space, round_edges, color_array, sq_size);
}

// Draw function
function draw() {
    background(color(r, g, b));
    stroke(stroke_color);
    strokeWeight(stroke_weight);
    for (let i = 0; i < cube.objects.length; i++) {
        cube.objects[i].display();
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
        // Randomness
        // if (random_stroke || no_stroke == true) {
        //     noStroke();
        // }
        let inc = 0;
        if (random_sizes) {
            inc = random(-inc_limit, inc_limit);
        }
        // Painting object
        if (no_fill) {
            noFill();

        } else {
            fill(this.fill_color);
        }
        circle(
            this.xmin + this.size / 2,
            this.ymin + this.size / 2,
            this.size + inc,
        );
    }
}

class Arc extends GeometricForm {
    display() {
        let inc = 0;
        if (random_sizes) {
            inc = random(-inc_limit, inc_limit);
        }
        // Painting object
        if (no_fill) {
            noFill();

        } else {
            fill(this.fill_color);
        }
        circle(
            this.xmin + this.size / 2,
            this.ymin + this.size / 2,
            this.size + inc,
        );
    }
}
