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
let wd = 500
let ht = 500
let margin = 35

// setup
var grid
let data
var songs_json = 'houses_of_the_holy.json';
let the_rain_song
var data_loaded = false
let points_array

function setup() {
    createCanvas(wd, ht);
    // read data
    loadJSON(songs_json, on_data_loaded)

}

function on_data_loaded(loadedData) {
    data = loadedData
    the_rain_song = data["0"]
    data_loaded = true
}

function draw() {
    background(240, 240, 230)
    translate(width / 2, height / 2);
    strokeWeight(3)
    if (data_loaded) {
        drawPoints(1200, 10, 25)
    }
}

function drawPoints(len, space, divs) {
    let n_points_per_line = Math.ceil(len / divs);
    points_array = new Array(n_points_per_line);
    for (let i = 0; i < n_points_per_line; i++) {
        points_array[i] = new Array(divs);
        for (let j = 0; j < divs; j++) {
            let angle = 2 * Math.PI * j / divs
            let x = (i * space) * Math.cos(angle)
            let y = (i * space) * Math.sin(angle)
            points_array[i][j] = [x, y]
        }
    }
    // console.log(points_array)
    let song_idx = 0;
    for (let i = 0; i < n_points_per_line; i++) {
        for (let j = 0; j < divs; j++) {
            let x = points_array[i][j][0] + the_rain_song[song_idx][0] * 10
            let y = points_array[i][j][1] + the_rain_song[song_idx][1] * 10
            // console.log(points_array[i][j])
            stroke(0, the_rain_song[song_idx][2] * 9)
            point(x, y)
            song_idx++
        }
    }
    // noLoop()
}