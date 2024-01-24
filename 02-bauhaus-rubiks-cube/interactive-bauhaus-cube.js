// Global variables
let wd = 800;
let ht = 800;
let dim_cube = 5; // 5
let ext_space = 40;
let int_space = 10;
let round_edges = 10;
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
        color(240, 240, 240), // white
        color(240, 240, 240), // white
    ];
}

// Draw function
function draw() {
    background(background_color);
    ; // 3x3 cube
    cube = new Cube(dim_cube, ext_space, int_space, round_edges, color_array, sq_size);
    for (let i = 0; i < dim_cube * dim_cube; i++) {
        cube.squares[i].display();
    }
}

// Interactive function
function mousePressed(event) {
    if (event.button === 0) {
        let x = Math.floor(mouseX / (wd / dim_cube));
        let y = Math.floor(mouseY / (wd / dim_cube));
        cube.squares[dim_cube * x + y].redraw_square();
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
        this.create_squares();
    }

    create_squares() {
        this.squares = [];
        for (let i = 0; i < this.shape; i++) {
            for (let j = 0; j < this.shape; j++) {
                this.squares.push(new Square(i, j, this.sq_size, this.round_edges, this.color_array, this.ext_space, this.int_space));
            }
        }
    }
}

// Squares data structure
class Square {
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

    display() {
        noStroke();
        fill(this.fill_color);
        square(
            this.xmin,
            this.ymin,
            this.size,
            this.round_corner);
    }

    redraw_square() {
        this.fill_color = random(this.color_array);
        this.display();
    }
}
