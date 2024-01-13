let wd;
let ht;
function setup() {
    wd = 580;
    ht = 750;
    createCanvas(wd, ht);
}

function draw() {
    // Dark background
    background(0);

    // Configuring the line
    strokeWeight(1);
    stroke(255, 204, 0);
    let spc = 50;

    // line(100, 100, 500, 100);
    // for (let posX = 0; posX < 120; posX++) {
    //     line(1 + posX * spc, 1, 1 + posX * spc, ht);
    //     line(1, 1 + posX * spc, wd, 1 + posX * spc);
    // }
    for (let posX = 0; posX < 120; posX++) {
        line(1 + posX * spc, 1, 1 + posX * spc, ht);
    }

}

function matrix() {
    // Define the dimensions of the matrix
    const numRows = 2;
    const numCols = 2;

    // Create an empty matrix
    const matrix = [];

    for (let i = 0; i < numRows; i++) {
        const row = [];
        row.push(i + 10);
        row.push(10);
        // }
        matrix.push(row);
    }

    // Print the matrix
    for (let i = 0; i < numRows; i++) {
        console.log(matrix[i]);
    }

}