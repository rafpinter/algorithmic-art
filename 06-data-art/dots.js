/*
what does data do?
*/


// Screen
let wd = 1200
let ht = 800
let margin = 100

// Setup
var grid
let data
var songs_json = 'houses_of_the_holy.json';
let the_rain_song
var data_loaded = false

// Shift weight
let shift_weight = 15

// Randomness
let random_song = true
// Focal point
let random_focal_point = true
let X = 900
let Y = 450

// Canvas
let perimeter_line = false
let lines = true
let only_song_dots = false
let dark_mode = true
let fill_color = 244



function setup() {
    createCanvas(wd, ht);
    // Read data
    loadJSON(songs_json, on_data_loaded)
}

function on_data_loaded(loadedData) {
    data = loadedData
    let song_sel
    // Random song
    if (random_song) {
        song_sel = floor(random(0, 8))
        song_sel = song_sel.toString()
    } else {
        song_sel = "0"
    }
    // Reading data
    the_rain_song = data[song_sel]["metrics"]
    // Read flag
    data_loaded = true
}

function draw() {
    // Removing stroke for everything
    noStroke()
    noLoop()

    if (data_loaded) {
        // Background color
        if (dark_mode) {
            fill_color = 255 - fill_color
        }
        background(255 - fill_color)

        // Processing song
        let dims = floor(sqrt(the_rain_song.length))
        grid = new Grid(dims, dims, the_rain_song, 1)
        grid.create_song_grid(0)

        // Display points
        for (let i = 0; i < grid.objects.length; i++) {
            grid.objects[i].display()
        }

        // Focal point
        if (random_focal_point) {
            X = random(wd / 5, 4 * wd / 5)
            Y = random(ht / 5, 4 * ht / 5)
        }
        stroke(240 - fill_color)
        point(X, Y)
    }
    // Simple frame
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
        // Processing the song data
        let k = 0
        for (let i = margin; i <= this.rows - margin; i += this.row_space) {
            for (let j = margin; j <= this.columns - margin; j += this.column_space) {
                // Adds a dot to the grid
                this.objects.push(new Dot(i, j, this.song[k]))
                k++
            }

        }
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
        this.applying_song_shift()
    }
    applying_song_shift() {
        // Applying song data to shift point coordinates
        if (this.song && this.song.length >= 2) {
            this.x = this.x + this.song[0] * shift_weight
            this.y = this.y + this.song[1] * shift_weight
            this.alpha_val = abs(this.song[0] + this.song[1])
        }
        this.alpha = 500
    }

    display() {
        if (only_song_dots) {
            // Showing only the shifted points
            if (dark_mode) {
                fill_color = 0
            }
            fill(fill_color, this.alpha_val * 90)
            ellipse(this.x, this.y, 5)
        } else {
            // Showing everything
            noFill()
            strokeWeight(0)
            if (dark_mode) {
                fill_color = 0
            }
            // Adding points shifted by the song
            fill(fill_color, this.alpha_val * 90)
            ellipse(this.x, this.y, 2)
            let alpha_mult = 50
            if (!lines) {
                alpha_mult = 80
            }
            // Connecting the shirted point and the focal point
            // (origin of the point)
            stroke(fill_color, this.alpha_val * alpha_mult)
            strokeWeight(2)
            line(
                this.x,
                this.y,
                this.i,
                this.j)
            // Connecting the shifted points to a focal point
            if (lines) {
                line(X, Y, this.x,
                    this.y,)
            }
        }
    }
}