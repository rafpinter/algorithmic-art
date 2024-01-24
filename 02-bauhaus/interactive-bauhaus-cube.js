
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
let dim_cube = 3; // 5

// Grid
let ext_space = 50;
let int_space = 20; // min: 5

// Objects
let round_edges = 5;
let random_stroke = false;
let transp = 250;
let stroke_weight = 0;

// Randomness
let random_sizes = false;
let inc_limit = 500;
let no_stroke = false;
let random_objects = false;
let object_number = 0; // Square:0 | Circle:1 | Triangle:2


// ---------------------

// Global variables
let wd = 800;
let ht = 800;
let color_array = [];
let background_color = 245;
let sq_size = (wd - ext_space * 2 - int_space * (dim_cube - 1)) / dim_cube;
var cube;

// Setup function
function setup() {
    createCanvas(wd, ht);
    noLoop();

    // probabilistic colors
    color_array = [
        color(157, 39, 25, transp), // red
        color(21, 64, 132, transp), // blue
        color(34, 34, 34, transp), // black
        color(215, 180, 24, transp), // yellow
        color(background_color), // white
    ];
    cube = new Cube(dim_cube, ext_space, int_space, round_edges, color_array, sq_size);
}

// Draw function
function draw() {
    background(background_color);
    strokeWeight(stroke_weight);
    for (let i = 0; i < cube.objects.length; i++) {
        cube.objects[i].display(); // Changed from 'cube.squares[i]' to 'cube.objects[i]'
    }
}

// Interactive function
function mousePressed(event) {
    if (event.button === 0) {
        let x = Math.floor(mouseX / (wd / dim_cube));
        let y = Math.floor(mouseY / (wd / dim_cube));
        cube.objects[dim_cube * x + y].redraw_object();
    }
    if (event.button === 1 || event.button === 2) {
        redraw();
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
        this.objects = []; // Renamed from 'this.squares' to 'this.objects'
        for (let i = 0; i < this.shape; i++) {
            for (let j = 0; j < this.shape; j++) {
                let randint;
                if (random_objects) {
                    randint = floor(random(3)); // Use floor to get integer values
                }
                else {
                    randint = object_number;
                }

                if (randint === 0) {
                    // push square
                    this.objects.push(new Square(i, j, this.sq_size, this.round_edges, this.color_array, this.ext_space, this.int_space));
                }
                else if (randint === 1) {
                    // push circle
                    this.objects.push(new Circle(i, j, this.sq_size, this.round_edges, this.color_array, this.ext_space, this.int_space));
                }
                else if (randint === 2) {
                    // push triangle
                    this.objects.push(new Triangle(i, j, this.sq_size, this.round_edges, this.color_array, this.ext_space, this.int_space));
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
    }

    dimensions() {
        this.xmin = this.ext_space + this.x * (this.size + this.int_space);
        this.xmax = this.xmin + this.size;
        this.ymin = this.ext_space + this.y * (this.size + this.int_space)
        this.ymax = this.ymin + this.size;

        this.fill_color = random(this.color_array);
    }

    redraw_object() {
        this.fill_color = random(this.color_array);
        this.display();
    }
}


class Circle extends GeometricForm {
    display() {
        if (random_stroke) {
            noStroke();
        }

        let inc = 0;
        if (random_sizes) {
            inc = random(-inc_limit, inc_limit);
        }

        fill(this.fill_color);
        circle(
            this.xmin + this.size / 2,
            this.ymin + this.size / 2,
            this.size + inc,
        );
    }
}

class Triangle extends GeometricForm {
    display() {
        fill(this.fill_color);

        // controling stroke
        if (no_stroke == false) {
            stroke(0);
        }
        else {
            noStroke();
        }

        let randint = floor(random(3));

        if (randint === 0) {
            if (random_stroke) {
                noStroke();
            }
            triangle(
                this.xmin,
                this.ymax,
                this.xmax,
                this.ymax,
                (this.xmin + this.xmax) / 2,
                this.ymin
            );
        }
        else if (randint === 1) {
            triangle(
                this.xmin,
                this.ymin,
                this.xmax,
                this.ymin,
                (this.xmin + this.xmax) / 2,
                this.ymax,
            );
        }
        else if (randint === 2) {
            triangle(
                this.xmin,
                this.ymin,
                this.xmin,
                this.ymax,
                this.xmax,
                (this.ymin + this.ymax) / 2
            );
        }

    }
}


// Squares data structure
class Square extends GeometricForm {
    display() {
        if (no_stroke == false) {
            stroke(0);
        }
        else {
            noStroke();
        }
        fill(this.fill_color);

        let inc = 0;
        if (random_sizes) {
            inc = random(-inc_limit, inc_limit);
        }

        if (round_edges == 0) {
            square(
                this.xmin,
                this.ymin,
                this.size + inc,
            );
        }
        else {
            square(
                this.xmin,
                this.ymin,
                this.size + inc,
                this.round_corner
            );
        }
    }
}
