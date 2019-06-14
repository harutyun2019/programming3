var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Kataxi extends LiveForm {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
    }
   getNewCoordinates() {
       this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
   }
   chooseCell(character) {
       this.getNewCoordinates(5);
       return super.chooseCell(character);
   }

    move() {

 
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            

        }
    }
    eat() {
        
    
        var newCell1 = this.chooseCell(1);
        var newCell2 = this.chooseCell(2);
        var newCell3 = this.chooseCell(3);
        var newCell4 = this.chooseCell(4);
        var newCell5 = newCell1.concat(newCell2,newCell3,newCell4);
        var newCell = random(newCell5)
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in gishatichArr) {
                if (newX == gishatichArr[i].x && newY == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }
            for (var i in kabanArr) {
                if (newX == kabanArr[i].x && newY == kabanArr[i].y) {
                    kabanArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 3;


        }
    }

    mul() {

        var newCell = this.chooseCell(0);

        if (this.energy >= 100 && newCell) {
            for (var k in newCell) {
                var x = newCell[k][0]
                var y = newCell[k][1]
                var newkataxi = new Kataxi(x, y, this.index);
                kataxiArr.push(newkataxi)
                matrix[y][x] = this.index;
                this.energy = 10;
            }
            
        }

    }
    end(){
        var finish = matrix.length * matrix[0].length * 0.2;
        if(kataxiArr.length >= finish){
                matrix[this.y][this.x] = 0;
                for (var i in kataxiArr) {
                    if (this.x == kataxiArr[i].x && this.y == kataxiArr[i].y) {
                        
                        if(this.x == kataxiArr[i].x && this.y == kataxiArr[i].y){
                        kataxiArr.splice(i, 1);
                        break;
                    }
                }
                }
    
            
    
        
        }
    }


    
 }

