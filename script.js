
//! Setup function fires automatically

var socket = io();
function setup() {


    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grasseaterCountElement = document.getElementById('grasseaterCount');
    let  gishatichCountElement = document.getElementById('gishatichCount');
    let  kabanCountElement = document.getElementById('kabanCount');
    let  kataxiCountElement = document.getElementById('kataxiCount');
    let  weatherElement = document.getElementById('cuycTalExanak');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grasseaterCountElement.innerText = data.grasseaterCounter;
        gishatichCountElement.innerText = data.gishatichCounter;
        kabanCountElement.innerText = data.kabanCounter;
        weatherElement.innerHTML=data.Weather;
        kataxiCountElement.innerText = data.kataxiCounter; 
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");     
                } 
                else if (matrix[i][j] == 2) {
                    fill("yellow");
                } 
                else if (matrix[i][j] == 0) {
                    fill('#acacac');
                }
                 else if (matrix[i][j] == 3) {
                    fill('red');
                }
                 else if (matrix[i][j] == 4) {
                    fill('orange');
                }
                 else if (matrix[i][j] == 5) {
                    fill('black');
                }
                

                if(data.Weather=="Գարուն"){
                    if (matrix[i][j] == 1) {
                        fill("#66ff99");     
                    } 
                }
                if(data.Weather=="Աշուն"){
                    if (matrix[i][j] == 1) {
                        fill("#ffd480");     
                    } 
                }
                if(data.Weather=="Ձմեռ"){
                    if (matrix[i][j] == 1) {
                        fill("#ccffff");     
                    } 
                }

                rect(j * side, i * side, side, side);
            }
        }
    }
}

function Sarqelexanak(Exan){

    socket.emit("weather",Exan);
}