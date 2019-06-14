
var matrix = [];

var grassArr = [];
var grassEaterArr = [];
var gishatichArr = [];
var kabanArr = [];
var kataxiArr = [];
var side = 20;

function setup() {
    m = 40;
    var rand1 = Math.floor(random(30));
    var rand = Math.floor(random(30));
    matrix = [];
    for (var y = 0; y < m; y++) {
        matrix[y] = []
        for (var x = 0; x < m; x++) {
            var r = Math.round(random(200));
           if(r<100) {matrix[y][x] = 0}
           else if(r>=100 && r<120) {matrix[y][x] = 1}
           else if(r>=120 && r<=160) {matrix[y][x] = 2}
           else if(r>=160 && r<=192) {matrix[y][x] = 3}
           else if(r>=192 && r<=198) {matrix[y][x] = 4}
        else{matrix[y][x] = 0}
        }
    }
    matrix[rand1][rand] = 5;


    
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');



    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x,y,2);
                grassEaterArr.push(et);
                
            }
            else if (matrix[y][x] == 3) {
                var gi = new Gishatich(x,y,3);
                gishatichArr.push(gi);
                
            }
            else if (matrix[y][x] == 4) {
                var am = new Kaban(x,y,4);
                kabanArr.push(am);
                
            }
            else if (matrix[y][x] == 5) {
                 var newkataxi = new Kataxi(x,y,5);
                 kataxiArr.push(newkataxi);
                
            }
        }
    }
 
}
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("#FF6D33");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }
     for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();
    }
    for (var i in gishatichArr) {
        gishatichArr[i].move();
        gishatichArr[i].eat();
        gishatichArr[i].mul();
        gishatichArr[i].die();
    }
    for (var i in kabanArr) {
        kabanArr[i].move();
        kabanArr[i].eat();
        kabanArr[i].mul();
        kabanArr[i].die();
    }
    for (var i in kataxiArr) {
        kataxiArr[i].move();
        kataxiArr[i].eat();
        kataxiArr[i].mul();
        kataxiArr[i].end();
    }
    
       
    
}
