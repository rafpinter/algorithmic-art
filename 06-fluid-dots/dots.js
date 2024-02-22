/*

what does data do?

ideas:
- create a regular grid of x,y points
- use data as distortion

*/
// playground
let data_action = false // or random_action
var default_grid = true

// screen
let wd = 700
let ht = 700

// setup
var grid

function setup() {
    createCanvas(wd, ht);
    noLoop();

    // instanciate default grid
    grid = new Grid(ht, wd)
    grid.create_grid()
}

function draw() {
    background(0)

    if (default_grid) {
        // just print grid
        for (let i = 0; i < grid.objects.length; i++) {
            grid.objects[i].display()
        }
    } else {
        if (data_action) {
            // use data as distortion

        } else {
            // noise distortion
            // call grid.modify_grid()
        }
    }
}



class Grid {
    constructor(rows, columns) {
        this.rows = rows
        this.columns = columns
        this.row_space = 10
        this.column_space = 10
        this.objects = [] // vector that holds the dots
    }

    create_grid() {
        // will loop to create dots
        // variables will come from the constructor
        for (let i = 1; i < this.rows; i += this.row_space) {
            for (let j = 1; j < this.columns; j += this.column_space) {
                // add a dot to the grid
                this.objects.push(new Dot(i, j, i))
            }
        }
    }

    modify_grid() {
        // will get each point and modify it
        // does this function belong here? idk. tba.
    }

}

class Dot {
    constructor(x, y, i) {
        this.x = x
        this.y = y
        this.i = i
        this.create_starting_variables(x, y)
    }

    create_starting_variables(x, y) {
        // this variables must come from data   
        this.x = this.x
        this.y = this.y
        this.size = 1
        this.alpha = 500
        this.color = 200
    }

    create_dot() {
        // creates and returns a dot (which will be a point in x,y
        // with a strokeWeight = size, and stroke(color, alpha))
    }

    modify_point(x, y, size, alpha, color) {
        this.x = x
        this.y = y
        this.size = size
        this.alpha = alpha
        this.color = color
    }

    display() {
        strokeWeight(this.size + noise(this.i) * 10)
        stroke(this.color, this.alpha)
        point(this.x, this.y)
    }
}