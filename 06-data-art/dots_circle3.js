// Playground Variables
let data_action = false; // or random_action
var default_grid = true;

// Screen dimensions
let wd = 1500;
let ht = 1500;
let margin = 35;

// Variables for data and grid
var grid;
let data;
var songs_json = 'houses_of_the_holy.json'; // Path to your JSON file
let the_rain_song;
var data_loaded = false;

// p5.js setup function
function setup() {
    createCanvas(wd, ht); // Create canvas
    loadJSON(songs_json, on_data_loaded); // Load JSON data
}

// Callback function for when JSON is loaded
function on_data_loaded(loadedData) {
    data = loadedData;
    the_rain_song = data["0"]; // Load the first song's data
    data_loaded = true;
}

// p5.js draw function
function draw() {
    background(240, 240, 230); // Light background
    translate(width / 2, height / 2); // Center the canvas

    if (data_loaded) {
        drawPoints(1200, 10, 25); // Draw points with specified parameters
    }
}

// Function to draw points based on song data
function drawPoints(len, space, divs) {
    // Calculate the number of points per line
    let n_points_per_line = Math.ceil(len / divs);

    // Initialize points array
    let points_array = new Array(n_points_per_line);
    for (let i = 0; i < n_points_per_line; i++) {
        points_array[i] = new Array(divs);
        for (let j = 0; j < divs; j++) {
            let angle = (2 * Math.PI * j) / divs; // Divide the circle into equal segments
            let x = (i + 2) * space * Math.cos(angle * 3); // Offset starts at 2 to avoid center overlap
            let y = (i + 2) * space * Math.sin(angle * 1);
            points_array[i][j] = [x, y];
        }
    }

    // Begin drawing
    let song_idx = 0;
    noFill(); // No fill for shapes
    beginShape();

    for (let i = 0; i < n_points_per_line; i++) {
        for (let j = 0; j < divs; j++) {
            if (song_idx >= the_rain_song.length) break; // Stop if we run out of song data

            // Extract x, y distortion and intensity from the song data
            let distortion_x = the_rain_song[song_idx][0] * 10; // Scale up the distortion
            let distortion_y = the_rain_song[song_idx][1] * 10;
            let intensity = the_rain_song[song_idx][2];

            // Compute final x, y with distortion
            let x = points_array[i][j][0] + distortion_x;
            let y = points_array[i][j][1] + distortion_y;

            // Set stroke weight and color based on intensity
            strokeWeight(map(intensity, 0, 20, 0.5, 3)); // Map intensity to stroke weight
            stroke(50, map(intensity, 0, 20, 100, 255)); // Map intensity to stroke alpha

            // Add vertex to the shape
            point(x, y);

            song_idx++;
        }
    }

    endShape(); // Close the shape
}
