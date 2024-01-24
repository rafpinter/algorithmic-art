// Cube variables
let dim_cube = 4; // 5

// Global variables
let wd = 800;
let ht = 800;
let ext_space = 40;
let int_space = 10;
let round_edges = 1;
let color_array = [];
let background_color = 240;
let sq_size = (wd - ext_space * 2 - int_space * (dim_cube - 1)) / dim_cube;
var cube;

// Setup function
function setup() {
    createCanvas(wd, ht);
    noLoop();
    // frameRate(0.6);

    // probabilistic colors
    color_array = [
        color(157, 39, 25), // red
        color(21, 64, 132), // blue
        color(34, 34, 34), // black
        color(215, 180, 24), // yellow
        color(240, 240, 240), // white
        color(240, 240, 240), // white
        color(240, 240, 240), // white
        color(240, 240, 240), // white
        color(240, 240, 240), // white
        // color(240, 240, 240), // white
        // color(240, 240, 240), // white
    ];
    cube = new Cube(dim_cube, ext_space, int_space, round_edges, color_array, sq_size);
}

// Draw function
function draw() {
    background(background_color);
    strokeWeight(4);
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
                let randint = floor(random(3)); // Use floor to get integer values
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
        fill(this.fill_color);
        circle(
            this.xmin + this.size / 2,
            this.ymin + this.size / 2,
            this.size);
    }
}

class Triangle extends GeometricForm {
    display() {
        // noStroke();
        fill(this.fill_color);
        let randint = floor(random(3));
        if (randint === 0) {
            triangle(
                this.xmin, // x1, left corner of the base
                this.ymax, // y1, bottom
                this.xmax, // x2, right corner of the base
                this.ymax, // y2, bottom
                (this.xmin + this.xmax) / 2, // x3, center of the base (now the tip)
                this.ymin // y3, top (now the tip)
            );
        }
        else if (randint === 1) {
            triangle(
                this.xmin, // x1
                this.ymin, // y1
                this.xmax, // x2
                this.ymin, // y2
                (this.xmin + this.xmax) / 2, // x3 (center of base)
                this.ymax, // y3 (top of triangle)
            );
        }
        else if (randint === 2) {
            triangle(
                this.xmin,
                this.ymin, // New left base
                this.xmin,
                this.ymax, // New right base
                this.xmax,
                (this.ymin + this.ymax) / 2 // New tip
            );
        }

    }
}


// Squares data structure
class Square extends GeometricForm {
    display() {
        // noStroke();
        fill(this.fill_color);
        square(
            this.xmin,
            this.ymin,
            this.size,
            this.round_corner);
    }
}
