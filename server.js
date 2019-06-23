
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Gishatich = require("./modules/Gishatich.js");
var Kaban = require("./modules/Kaban.js");
var Kataxi = require("./modules/Kataxi.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
gishatichArr = [];
kabanArr = [];
kataxiArr = [];
matrix = [];
grassHashiv = 0;
grasseaterHashiv = 0;
gishatichHashiv = 0;
kabanHashiv = 0;
kataxiHashiv = 0;
ExanakCounter=0;
Exanak="";
needToMake=-1;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, gishatich, kaban, kataxi) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < gishatich; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < kaban; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < kataxi; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
        
    }
   
}
matrixGenerator(20, 40, 40,90,30,2);
//! Creating MATRIX --  END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {``
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } 
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var gishatich = new Gishatich(x, y);
                gishatichArr.push(gishatich);
            }
            else if (matrix[y][x] == 4) {
                var kaban = new Kaban(x, y);
                kabanArr.push(kaban);
            }
            else if (matrix[y][x] == 5) {
                var kataxi = new Kataxi(x, y);
                kataxiArr.push(kataxi);
            }

        }
    }
}

creatingObjects();

function makeExan(data){
    needToMake=data;
}
io.on("connection",function(socket){
    socket.on("weather",makeExan);
});

function game() {
    ExanakCounter++;
    if (ExanakCounter>=20)ExanakCounter-=20;
    if (needToMake!=-1){
        ExanakCounter=needToMake;
        needToMake=-1;
    }
    if (ExanakCounter>=0 && ExanakCounter<=4)Exanak="Գարուն";

    if (ExanakCounter>=5 && ExanakCounter<=9)Exanak="Ամառ";

    if (ExanakCounter>=10 && ExanakCounter<=14)Exanak="Աշուն";

    if (ExanakCounter>=15 && ExanakCounter<=19)Exanak="Ձմեռ";
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }

    if (gishatichArr[0] !== undefined) {
        for (var i in gishatichArr) {
            gishatichArr[i].move();
            gishatichArr[i].eat();
            gishatichArr[i].mul();
            gishatichArr[i].die();
        }
    }
    if (kabanArr[0] !== undefined) {
        for (var i in kabanArr) {
            kabanArr[i].move();
            kabanArr[i].eat();
            kabanArr[i].mul();
            kabanArr[i].die();
        }
    }
    if (kataxiArr[0] !== undefined) {
        for (var i in kataxiArr) {
            kataxiArr[i].move();
            kataxiArr[i].eat();
            kataxiArr[i].mul();
            kataxiArr[i].end();
        }
    }
    


    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grasseaterCounter:grasseaterHashiv,
        gishatichCounter:gishatichHashiv,
        kabanCounter:kabanHashiv,
        kataxiCounter:kataxiHashiv,
        Weather:Exanak
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
  
}



setInterval(game, 1000)