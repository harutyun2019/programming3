class Kaban {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 10;
    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],

            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2],

            [this.x - 3, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 3, this.y + 3],
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);

                }
            }
        }
        return found;
    }
    //qayluma
    move() {

        //yntruma vandak
        var newCell1 = this.chooseCell(1);
        var newCell2 = this.chooseCell(0);
        var newCell = random(newCell1.concat(newCell2));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            if (matrix[newY][newX] == 1) {
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                 matrix[this.y][this.x] = 1;
                var gr = new Grass(this.x, this.y, 1);
                grassArr.push(gr); 

            }
            else if (matrix[newY][newX] == 0) {

                matrix[this.y][this.x] = 0;

            } matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;

            this.energy--;
        }
    }
    eat() {


        var newCell = random(this.chooseCell(3));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in gishatichArr) {
                if (newX == gishatichArr[i].x && newY == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 4;


        }
    }

    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 22 && newCell) {

            var newkaban = new Kaban(newCell[0], newCell[1], this.index);
            kabanArr.push(newkaban);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 10;
        }

    }



    die() {

        if (this.energy <= 9) {
            matrix[this.y][this.x] = 0;
            for (var i in kabanArr) {
                if (this.x == kabanArr[i].x && this.y == kabanArr[i].y) {
                    //    console.log("DDDIE")
                    kabanArr.splice(i, 1);
                    break;
                }
            }

        }

    }
}