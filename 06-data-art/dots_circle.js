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
    translate(width / 2, height / 2)
    strokeWeight(1)
    if (data_loaded) {
        drawPoints(1200, 2, 3)
    }
}

// function drawPoints(len, space, divs) {
//     let n_points_per_line = Math.ceil(len / divs);
//     points_array = new Array(n_points_per_line);
//     for (let i = 2; i <= n_points_per_line + 1; i++) {
//         points_array[i - 2] = new Array(divs);
//         for (let j = 0; j < divs; j++) {

//             let angle = 2 * Math.PI * j / divs;
//             let x = (i * space) * Math.cos(angle);
//             let y = (i * space) * Math.sin(angle);
//             points_array[i - 2][j] = [x, y];
//         }
//     }
//     let song_idx = 0;
//     noFill()
//     beginShape()
//     vertex(0, 0)
//     for (let i = 0; i < n_points_per_line; i++) {
//         for (let j = 0; j < divs; j++) {
//             if (song_idx < the_rain_song.length) {
//                 let x = points_array[i][j][0] + the_rain_song[song_idx][0] * 10;
//                 let y = points_array[i][j][1] + the_rain_song[song_idx][1] * 10;
//                 strokeWeight(map(the_rain_song[song_idx][2], 15, 0, 0, 1));
//                 vertex(x, y);
//                 // point(x, y)
//                 song_idx++;
//             }
//         }
//     }
//     endShape(); 
//     // noLoop()
// }

// function drawPoints(len, space, divs) {
//     let n_points_per_line = Math.ceil(len / divs);
//     points_array = new Array(n_points_per_line);
//     for (let i = 2; i <= n_points_per_line + 1; i++) {
//         points_array[i - 2] = new Array(divs);
//         for (let j = 0; j < divs; j++) {

//             let angle = 2 * Math.PI * j / divs;
//             let x = (i * space) * Math.cos(angle);
//             let y = (i * space) * Math.sin(angle);
//             points_array[i - 2][j] = [x, y];
//         }
//     }
//     let song_idx = 0;
//     noFill()
//     beginShape()
//     vertex(0, 0)
//     for (let i = 0; i < n_points_per_line; i++) {
//         for (let j = 0; j < divs; j++) {
//             if (song_idx < the_rain_song.length) {
//                 let x = points_array[i][j][0] + the_rain_song[song_idx][0] * 10;
//                 let y = points_array[i][j][1] + the_rain_song[song_idx][1] * 10;
//                 strokeWeight(map(the_rain_song[song_idx][2], 15, 0, 0, 1));
//                 vertex(x, y);
//                 song_idx++;
//             }
//         }
//     }
//     endShape(); 
//     // noLoop()
// }

function drawPoints(len, space, divs) {
    let n_points_per_line = Math.ceil(len / divs);
    points_array = new Array(n_points_per_line);
    let inc = 1
    for (let i = 2; i <= n_points_per_line + 1; i++) {
        points_array[i - 2] = new Array(divs);
        for (let j = 0; j < divs; j++) {

            let angle = 2 * Math.PI * j / divs;
            let x = (inc * space) * Math.cos(angle);
            let y = (inc * space) * Math.sin(angle);
            points_array[i - 2][j] = [x, y];
            inc++
        }
    }
    // Assuming the_rain_song is an array of modifications to apply to each point
    let song_idx = 0;
    noFill();
    beginShape();
    if (points_array.length > 0 && points_array[0].length > 0) {
        // Move to the first point
        let firstPoint = points_array[0][0];
        vertex(firstPoint[0], firstPoint[1]);

        // Draw Bezier curves through the points
        for (let i = 0; i < points_array.length; i++) {
            for (let j = 0; j < points_array[i].length; j++) {
                if (song_idx < the_rain_song.length) {
                    let x = points_array[i][j][0] + the_rain_song[song_idx][0] * 10;
                    let y = points_array[i][j][1] + the_rain_song[song_idx][1] * 10;
                    let nextIdx = (j + 1) % points_array[i].length;
                    let nextPoint = points_array[i][nextIdx];
                    let ctrlX = (x + nextPoint[0]) / 2;
                    let ctrlY = (y + nextPoint[1]) / 2;
                    // Using the midpoint as control point for both the current and next point
                    bezierVertex(ctrlX, ctrlY, ctrlX, ctrlY, nextPoint[0], nextPoint[1]);
                    song_idx++;
                }
            }
        }
    }
    endShape();
}

