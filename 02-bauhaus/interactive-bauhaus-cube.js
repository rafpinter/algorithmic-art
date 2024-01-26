
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
let int_space = 10; // min: 5

// Objects
let round_edges = 0;
let transp = 250;
let stroke_weight = 5;

// Randomness
let random_sizes = true;
let inc_limit = 250;
let no_stroke = false;
let random_stroke = true;
let random_objects = true;
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
        color(166, 41, 13, transp), // red
        color(4, 119, 191, transp), // blue
        color(34, 34, 34, transp), // black
        color(242, 183, 5, transp), // yellow
        color(background_color, transp), // white
        color(background_color, transp), // white
        color(background_color, transp), // white
        // color(background_color, transp), // white
        // color(background_color, transp), // white
        // color(background_color), // white
        color(background_color), // white
        // color(background_color), // white
        // color(background_color), // white
        // color(background_color), // white
    ];
    cube = new Cube(dim_cube, ext_space, int_space, round_edges, color_array, sq_size);
}

// Draw function
function draw() {
    background(background_color);
    strokeWeight(stroke_weight);
    for (let i = 0; i < cube.objects.length; i++) {
        cube.objects[i].display();
    }
}

// Interactive function
function mousePressed(event) {
    if (event.button === 0) {
        let x = Math.floor(mouseX / (wd / dim_cube));
        let y = Math.floor(mouseY / (ht / dim_cube));
        cube.objects[dim_cube * x + y].redraw_object();
    }
    if (event.button === 1) {
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
                console.log(randint);

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
        // Triangle points
        let x1, y1, x2, y2, x3, y3;

        // Default triangle        
        x1 = this.xmin;
        y1 = this.ymax;
        x2 = this.xmax;
        y2 = this.ymax;
        x3 = (this.xmin + this.xmax) / 2;
        y3 = this.ymin;

        // Declaring randint before using it
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
        if (random_stroke || !no_stroke) {
            noStroke();
        }

        // Displaying figure
        fill(this.fill_color);
        triangle(
            x1,
            y1,
            x2,
            y2,
            x3,
            y3
        );
    }
}


// Squares data structure
class Square extends GeometricForm {
    display() {

        fill(this.fill_color);

        let inc = 0;
        if (random_sizes) {
            inc = random(-inc_limit, inc_limit);
        }

        if (round_edges == 0) {
            rect(
                this.xmin,
                this.ymin,
                this.size + inc,
            );
        }
        else {
            rect(
                this.xmin,
                this.ymin,
                this.size + inc,
                this.round_corner
            );
        }
    }
}
