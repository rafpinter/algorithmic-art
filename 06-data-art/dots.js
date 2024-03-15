/*
what does data do?
*/

// playground
let data_action = false
var default_grid = true

// screen
let wd = 1600
let ht = 900
let margin = 100

// setup
var grid
let data
var songs_json = 'houses_of_the_holy.json';
let the_rain_song
var data_loaded = false

let song_weight = 20
let X = 1000;
let Y = 450;

let fill_color = 244

function setup() {
    createCanvas(wd, ht);
    // read data
    loadJSON(songs_json, on_data_loaded)
}

function on_data_loaded(loadedData) {
    data = loadedData
    let song_sel = "1"
    the_rain_song = data[song_sel]["metrics"]
    data_loaded = true
}

function draw() {
    if (data_loaded) {
        background(255 - fill_color)
        noStroke()
        let dims = floor(sqrt(the_rain_song.length))
        grid = new Grid(dims, the_rain_song)
        grid.create_song_grid()

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

}


class Grid {
    constructor(dims, song, i) {
        this.objects = []
        this.dims = dims
        this.row_space = wd / (dims)
        this.column_space = ht / (dims)
        this.rows = dims * this.row_space
        this.columns = dims * this.column_space
        this.song = song
    }

    create_song_grid() {

        let k = 0
        for (let i = margin; i <= this.rows - margin; i += this.row_space) {
            for (let j = margin; j <= this.columns - margin; j += this.column_space) {
                // add a dot to the grid
                let shift = 0
                // for (shift = 0; shift < this.column_space; shift++)
                this.objects.push(new Dot(i + shift, j + shift, i + shift, j + shift, this.song[k]))
                k++
            }

        }
    }

    modify_grid() {
    }
}

class Dot {
    constructor(x, y, i, j, song) {
        this.flag = false
        this.x = x
        this.y = y
        this.i = i
        this.j = j
        this.song = song
        this.create_starting_variables(x, y, this.song)
    }
    create_starting_variables(x, y, song) {
        if (this.song && this.song.length >= 2) {
            this.x = this.x + this.song[0] * song_weight
            this.y = this.y + this.song[1] * song_weight
            this.alfa = abs(this.song[0] + this.song[1])
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
        fill(fill_color, this.alfa * 20)
        ellipse(this.x, this.y, 2)

        stroke(fill_color, this.alfa * 50)
        strokeWeight(2)
        line(
            this.x,
            this.y,
            this.i,
            this.j)
        line(X, Y, this.x,
            this.y,)
    }
}