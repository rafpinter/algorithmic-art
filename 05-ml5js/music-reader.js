const model_url =
    'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let mic;
let freq = 0;
let threshold = 1;
let i = 10
let lines = [];



function setup() {
    createCanvas(600, 900);
    audioContext = getAudioContext();
    mic = new p5.AudioIn();
    mic.start(listening);
    frameRate(10)
}

function draw() {
    background(0)
    textAlign(CENTER, CENTER);
    fill(255);
    // stroke()
    strokeWeight(1)
    textSize(32);
    text(freq.toFixed(0), width / 2, height - 150);
    let vol = mic.getLevel();
    let h = map(vol, 0, 1, 0, 3000);
    text(h.toFixed(0), width / 2, height - 100);

    stroke(200)
    if (h > 10) {

        // square(30, 20, freq)
        let a = map(vol, 0, 20, 1, 10)
        strokeWeight(a)
        line(300 + freq, i, 600, i)
        line(100 - freq, i, 100, i)
        i += 10
    }


}

function listening() {
    console.log('Listening!');
    pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
    console.log('model loaded');
    pitch.getPitch(gotPitch);
}

function gotPitch(error, frequency) {
    if (error) {
        console.error(error);
    } else {
        console.log(frequency);
        if (frequency) {
            freq = frequency;
        }
        pitch.getPitch(gotPitch);
    }
}
