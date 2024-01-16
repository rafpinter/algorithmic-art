// page config
let wd;
let ht;

// solar system sizes
var sun_size = 50;
var rocky_planets = 10;
var gas_planets = 15;
var axis_color = 100

// number of segmentations
var division = 10

// motion configs
var earth_velocity = 0.01;
var angles = [];

var speeds = [
    earth_velocity * 1.61,
    earth_velocity * 1.18,
    earth_velocity * 1,
    earth_velocity * 0.81,
    earth_velocity * 0.44,
    earth_velocity * 0.32,
    earth_velocity * 0.23,
    earth_velocity * 0.18
];

// Page setup 
function setup() {
    wd = 800;
    ht = 800;
    createCanvas(wd, ht);
    for (var i = 0; i < 8; i++) {
        angles[i] = 0;
    }
}

// Draw figure
function draw() {
    background(30, 31, 41);

    // astros
    sun();
    mercury();
    venus();
    earth();
    mars();
    jupiter();
    saturn();
    uranus();
    neptune();
}

function sun() {
    fill(253, 216, 53);
    circle(wd / 2, ht / 2, sun_size);
    noStroke();
}

function drawPlanet(x_pos, y_pos, size, color_index, speed_index) {
    var radius = (ht / 2 - x_pos);

    // axis
    noFill();
    stroke(axis_color);
    circle(ht / 2, ht / 2, radius * 2);

    // planet
    fill(color_index);
    noStroke();
    var x = ht / 2 + radius * cos(angles[speed_index]);
    var y = y_pos + radius * sin(angles[speed_index]);
    circle(x, y, size);
    angles[speed_index] = angles[speed_index] + speeds[speed_index];
}

function mercury() {
    var x_pos = 8 * (ht / 2) / division;
    var y_pos = 1 * wd / 2;
    drawPlanet(x_pos, y_pos, rocky_planets, color(100), 0);
}

function venus() {
    var x_pos = 7 * (ht / 2) / division;
    var y_pos = 1 * wd / 2;
    drawPlanet(x_pos, y_pos, rocky_planets, color(255, 165, 0), 1);
}

function earth() {
    var x_pos = 6 * (ht / 2) / division;
    var y_pos = 1 * wd / 2;
    drawPlanet(x_pos, y_pos, rocky_planets, color(0, 0, 255), 2);
}

function mars() {
    var x_pos = 5 * (ht / 2) / division;
    var y_pos = 1 * wd / 2;
    drawPlanet(x_pos, y_pos, rocky_planets, color(255, 0, 0), 3);
}

function jupiter() {
    var x_pos = 4 * (ht / 2) / division;
    var y_pos = 1 * wd / 2;
    drawPlanet(x_pos, y_pos, gas_planets, color(255, 100, 0), 4);
}

function saturn() {
    var x_pos = 3 * (ht / 2) / division;
    var y_pos = 1 * wd / 2;
    drawPlanet(x_pos, y_pos, gas_planets, color(220, 200, 100), 5);
}

function uranus() {
    var x_pos = 2 * (ht / 2) / division;
    var y_pos = 1 * wd / 2;
    drawPlanet(x_pos, y_pos, gas_planets, color(0, 255, 255), 6);
}

function neptune() {
    var x_pos = 1 * (ht / 2) / division;
    var y_pos = 1 * wd / 2;
    drawPlanet(x_pos, y_pos, gas_planets, color(0, 0, 255), 7);
}