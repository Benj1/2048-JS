class Board {
    constructor() {
        this.grid = [Array(4), Array(4), Array(4), Array(4)];
        this.score = 0;
        this.initialiseLayout();
    }

    initialiseLayout() {
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                this.grid[i][j] = new EmptyTile();
            }
        }
        var a = Math.floor(Math.random()*16);
        var aRow = a % 4;
        var aCol = (a - aRow)/4
        this.grid[aRow][aCol] = new Tile();
        do{
            var b = Math.floor(Math.random()*16);
        }
        while (b==a);
        var bRow = b % 4;
        var bCol = (b - bRow)/4;
        this.grid[bRow][bCol] = new Tile();
    }

    resetTiles(){
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                var tile = this.grid[i][j];
                tile.setDisplay();
                tile.speed = [0,0];
                tile.scale = 1;
    }}}

    move(direction){
        var newTile = false;
        if (direction == 37){
            newTile = this.moveLeft();
        }
        else if (direction == 39){
            newTile = this.moveRight();
        }
        else if (direction == 40){
            newTile = this.moveDown();
        }
        else if (direction == 38){
            newTile = this.moveUp();
        }
        if (newTile) {
            var x = this.addTile();
            var tile = x[0];
            var pos = x[1];
            return [newTile, tile, pos];
        }
        return [false, 0, 0];
    }

    moveLeft(){
        var success = false;
        for(var i=0; i<4; i++){
            var k=0;
            var mergeAllow = true;
            for(var j=0; j<4; j++){
                if(!this.grid[i][j].isEmpty()){
                    var tile = this.grid[i][j];
                    this.grid[i][j] = new EmptyTile();
                    if(k > 0 && this.grid[i][k-1].equals(tile) && mergeAllow){
                        this.grid[i][k-1].value += tile.value;
                        this.score += tile.value * 2;
                        success = true;
                        mergeAllow = false;
                        tile.speed = [k-1-j, 0];
                    }
                    else {
                        this.grid[i][k] = tile;
                        tile.speed = [k-j, 0];
                        if (k != j){
                            success = true;
                        }
                        k += 1;
                        mergeAllow = true;
                    }
                }
            }
        }   
        return success;
    }

    moveRight() {
        var success = false;
        for (var i=0; i<4; i++){
            var k=0;
            var mergeAllow = true;
            for(var j=0; j<4; j++){
                if(!this.grid[i][3-j].isEmpty()){
                    var tile = this.grid[i][3-j];
                    this.grid[i][3-j] = new EmptyTile();
                    if(k > 0 && this.grid[i][4-k].equals(tile) && mergeAllow){
                        this.grid[i][4-k].value += tile.value;
                        this.score += tile.value * 2;
                        success = true;
                        mergeAllow = false;
                        tile.speed = [1 - k + j,0];
                    }
                    else {
                        this.grid[i][3-k] = tile;
                        tile.speed = [j-k,0];
                        if (k != j){
                            success = true;
                        }
                        k+=1;
                        mergeAllow = true;
                    }
                }
            }
        }
        return success;
    }

    moveDown() {
        var success = false;
        for(var i=0; i<4; i++){
            var k=0;
            var mergeAllow = true;
            for (var j=0; j<4; j++){
                if(!this.grid[3-j][i].isEmpty()){
                    var tile = this.grid[3-j][i];
                    this.grid[3-j][i] = new EmptyTile();
                    if (k > 0 && this.grid[4-k][i].equals(tile) && mergeAllow){
                        this.grid[4-k][i].value += tile.value;
                        this.score += tile.value * 2;
                        success = true;
                        mergeAllow = false;
                        tile.speed = [0, 1-k+j];
                    }
                    else {
                        this.grid[3-k][i] = tile;
                        tile.speed = [0, j-k];
                        if (k != j){
                            success = true;
                        }
                        k+=1;
                        mergeAllow = true;
                    }
                }
            }
        }
        return success;
    }

    moveUp(){
        var success = false;
        for (var i=0; i<4; i++){
            var k=0;
            var mergeAllow = true;
            for (var j=0; j<4; j++){
                if (!this.grid[j][i].isEmpty()){
                    var tile = this.grid[j][i];
                    this.grid[j][i] = new EmptyTile();
                    if (k > 0 && this.grid[k-1][i].equals(tile) && mergeAllow){
                        this.grid[k-1][i].value += tile.value;
                        this.score += tile.value * 2;
                        success = true;
                        mergeAllow = false;
                        tile.speed = [0, k-1-j];
                    }
                    else {
                        this.grid[k][i] = tile;
                        tile.speed = [0, k-j];
                        if (k != j){
                            success = true;
                        }
                        k+=1;
                        mergeAllow = true;
                    }
                }
            }
        }
        return success
    }
    
    emptySpaces(){
        var spaces = [];
        for (var i=0; i<4; i++){
            for (var j=0; j<4; j++){
                if (this.grid[i][j].isEmpty()){
                    spaces.push(i + 4*j);
                }
            }
        }
        return spaces;
    }

    addTile() {
        var spaces = this.emptySpaces()
        var len = spaces.length;
        var rand_choice = Math.floor(Math.random() * len);
        var a = spaces[rand_choice];
        var aRow = a % 4;
        var aCol = (a - aRow)/4;
        var newTile = new Tile()
        newTile.scale = 1 / TRANSITIONLENGTH;
        this.grid[aRow][aCol] = newTile;
        return [newTile, [aRow, aCol]];
    }

   
    stillAlive() {
        if (this.emptySpaces().length > 0){
            return True
        }
        else {
            for(var i=0; i<4; i++){
                for(var j=0; j<3; j++){
                    if (this.grid[i][j].equals(this.grid[i][j+1])){
                        return true;
                    }
                    if (this.grid[j][i].equals(this.grid[j+1][i])){
                        return true;
                    }
                }
            }
        }
    }
    
    checkWin(){
        var win = false;
        for (var i=0; i<4; i++){
            for (var j=0; j<4; j++){
                var t = this.grid[i][j]
                if (t.image_index == MAXTILE - 1){
                    win = true;
                }
            } 
        return win;
        }
    }
}
