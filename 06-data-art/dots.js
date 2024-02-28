/*

what does data do?

ideas:
- create a regular grid of x,y points
- use data as distortion


escrever um array com [media, media,..].
então eu vou populando ele a cada tempo (1 seg) a partir da frequencia
que eu to ouvindo no microfone. a cada passo eu vou fazendo um shift da
array pra que pareça algo fluido. aí assim dá até pra eu fazer do mesmo
jeito 

*/

// playground
let data_action = false // or random_action
var default_grid = true

// screen
let wd = 600
let ht = 600
let margin = 35

// setup
var grid
let data
var songs_json = 'houses_of_the_holy.json';
let the_rain_song
var data_loaded = false

// make it rain?
let make_it_rain = true

function setup() {
    createCanvas(wd, ht);
    // read data
    loadJSON(songs_json, on_data_loaded)
}

function on_data_loaded(loadedData) {
    data = loadedData
    the_rain_song = data["5"]
    data_loaded = true
}

function draw() {
    if (data_loaded) {
        background(0)
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
    }
    if (make_it_rain) {
        for (let k = 0; k < 2000; k++) {
            fill(0)
            stroke(200, 200, 0, 10)
            square(random(0, wd), random(0, ht), 10)
            // square(100, 100, 10)
        }
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
        // will loop to create dots
        // variables will come from the constructor)
        for (let i = margin - 8; i < this.rows - margin; i += this.row_space) {
            for (let j = margin - 8; j < this.columns - margin; j += this.column_space) {
                // add a dot to the grid
                let song_idx = i + j;
                // console.log()
                this.objects.push(new Dot(i, j, i, j, this.song[song_idx]))
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
            this.x = this.x + this.song[0] * 20
            this.y = this.y + this.song[1] * 20
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
        // stroke(200, 200, 0, this.alpha)
        strokeWeight(1)// + noise(this.i) * 10)
        for (let i = 0; i < 20; i++) {
            // stroke(10, 10, 10, 1 + 10 * i)
            noStroke()
            fill(100, 100, 250, 200)
            ellipse(this.x + i, this.y + i, 1)
        }

    }
    // display() {
    //     // stroke(200, 200, 0, this.alpha)
    //     strokeWeight(2)// + noise(this.i) * 10)
    //     for (let i = 0; i < 20; i++) {
    //         // stroke(10, 10, 10, 1 + 10 * i)
    //         fill(200, 200, 0, 120)
    //         ellipse(this.x + i, this.y + i, 1)
    //     }
    // }
}