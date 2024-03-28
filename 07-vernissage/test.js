/*
    title: Cartel generator
    author: LenaMK & IFT6251 class of 2024
    date: 2023-03-24
    description: génère des cartels à exporter en SVG pour le plotter

*/
//landscape so that we can fit two cartels in heigth
let paperHeight = 28
let paperWidth = 22

let printerDPI = 96


let cartelWidth = 5.5
let cartelHeight = 7 //to fit 4 cartels in the width of the paper
var cartelMargins = 0.5
let cartelWidthPx, cartelHeightPx, paperHeightPx, paperWidthPx, cartelMarginsPx
var currentCartel
var myFont;
var titleFontSize = 30
var artistFontSize = 24
var textFontSize = 16

var titleHeight = 50
var artistHeight = 120
var hardwareHeight = 200
var softwareHeight = 300
var descriptionHeight = 350

function preload() {
    myFont = loadFont('fonts/1CAMBam_Stick_9.ttf')
    data = loadJSON("data.json")
}


function setup() {

    textFont(myFont)

    noLoop();

}



function draw() {

    textSize(titleFontSize)



}
