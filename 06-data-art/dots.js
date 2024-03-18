/*
what does data do?
*/

// playground
let data_action = false
var default_grid = true

// screen
let wd = 1200
let ht = 800
let margin = 100

// setup
var grid
let data
var songs_json = 'houses_of_the_holy.json';
let the_rain_song
var data_loaded = false

let song_weight = 15
let X = 900
let Y = 450

let random_center = true
let random_song = true
let perimeter_line = false
let lines = true
let fill_color = 244

function setup() {
    createCanvas(wd, ht);
    // read data
    loadJSON(songs_json, on_data_loaded)
}

function on_data_loaded(loadedData) {
    data = loadedData
    let song_sel
    if (random_song) {
        song_sel = floor(random(0, 8))
        song_sel = song_sel.toString()
    } else {
        song_sel = "0"
    }
    the_rain_song = data[song_sel]["metrics"]
    data_loaded = true
}

function draw() {


    if (data_loaded) {
        if (random_center) {
            X = random(wd / 5, 4 * wd / 5)
            Y = random(ht / 5, 4 * ht / 5)
            noLoop()
        }

        background(255 - fill_color)
        noStroke()
        let dims = floor(sqrt(the_rain_song.length))
        grid = new Grid(dims, dims, the_rain_song, 1)
        grid.create_song_grid(0)

        if (default_grid) {
            // just print grid
            for (let i = 0; i < grid.objects.length; i++) {
                grid.objects[i].display()
            }
        } else {
            if (data_action) {
            } else {
            }
        }
        stroke(0)

        point(X, Y)
    }
    if (perimeter_line) {
        strokeWeight(1)
        stroke(100)
        noFill()
        let inc = 25
        rect(
            margin - inc,
            margin - inc,
            wd - (2 * (margin - inc)),
            ht - (2 * (margin - inc)))
    }

}


class Grid {
    constructor(dim_x, dim_y, song,) {
        this.objects = []
        this.row_space = wd / (dim_y)
        this.column_space = ht / (dim_x)
        this.rows = dim_y * this.row_space
        this.columns = dim_x * this.column_space
        this.song = song
    }

    create_song_grid() {

        let k = 0
        for (let i = margin; i <= this.rows - margin; i += this.row_space) {
            for (let j = margin; j <= this.columns - margin; j += this.column_space) {
                // add a dot to the grid
                this.objects.push(new Dot(i, j, this.song[k]))
                k++
            }

        }
    }

    modify_grid() {
    }
}

class Dot {
    constructor(x, y, song) {
        this.flag = false
        this.x = x
        this.y = y
        this.i = x
        this.j = y
        this.song = song
        this.create_starting_variables(x, y, this.song)
    }
    create_starting_variables(x, y, song) {
        if (this.song && this.song.length >= 2) {
            this.x = this.x + this.song[0] * song_weight
            this.y = this.y + this.song[1] * song_weight
            this.alpha_val = abs(this.song[0] + this.song[1])
        }
        this.size = 1
        this.alpha = 500
        this.color = color(0, 0, 0)
    }

    modify_point(x, y, size, alpha, color) {
        this.x = x
        this.y = y
        this.size = size
        this.alpha = alpha
        this.color = color
    }

    display() {

        noFill()
        strokeWeight(0)
        fill(fill_color, this.alpha_val * 90)
        ellipse(this.x, this.y, 2)
        let alpha_mult = 60
        if (!lines) {
            alpha_mult = 80
        }
        stroke(fill_color, this.alpha_val * alpha_mult)
        strokeWeight(2)
        line(
            this.x,
            this.y,
            this.i,
            this.j)
        if (lines) {

            line(X, Y, this.x,
                this.y,)
        }
    }
}