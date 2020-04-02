const MAXTILE = 15;
const INITVALUE = [2,2,2,2,4];

class Tile {
    constructor() {
        this.value = INITVALUE[Math.floor(Math.random()*5)];
        this.image_index = 0;
        this.scale = 1;
        this.speed = [0, 0];
        this.setDisplay();
    }

    isEmpty(){
        return false;
    }

    equals(other){
        return this.value == other.value;
    }

    setDisplay(){
        for(var i=0; i < MAXTILE; i++){
            if(this.value == 2 ** (i+1)){
                this.image_index = i;
            }
        }
    }
}

class EmptyTile {
    constructor(){
        this.value = 0;
        this.speed = [0,0];
    }

    isEmpty(){
        return true;
    }

    equals(other){
        return this.value == other.value;
    }

    setDisplay() {}
}

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

const CANVAS = document.getElementById("gameArea");
const CONTEXT = CANVAS.getContext("2d");

const LIGHTGREY = "#bfbfbf";
const DARKGREY = "#6e6e6e";
const RED = "#ff0000";

const TRANSITIONLENGTH = 5;

function drawEmptyTiles(){
    CONTEXT.fillStyle = LIGHTGREY;
    CONTEXT.fillRect(0,0,CANVAS.width, CANVAS.height);
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            CONTEXT.fillStyle = DARKGREY;
            CONTEXT.fillRect(20 + 150*i, 80 + 150*j, 130, 130);
        }
    }
}

function drawTiles(grid) {
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            var tile = grid[i][j];
            if (!tile.isEmpty()){
                var index = tile.image_index;
                var im = document.getElementById(index);
                CONTEXT.drawImage(im , 20 + 150*j, 80 + 150*i, IMAGESIZE, IMAGESIZE);
            }
        }
    } 
}

function drawNewTile(tile, row, col){
    var im = document.getElementById(tile.image_index);
    var centre = [85+150*col, 145+150*row];
    var size = IMAGESIZE * tile.scale;
    var pos = [centre[0] - size/2, centre[1] - size/2];
    CONTEXT.drawImage(im, pos[0], pos[1], size, size);
    tile.scale += 1 / TRANSITIONLENGTH;
}

function drawMovingTiles(frozenGrid, frame) {
    for (var i=0; i<4; i++){
        for (var j=0; j<4; j++){
            var tile = frozenGrid[i][j];
            if (!tile.isEmpty()){
                var image = document.getElementById(tile.image_index);
                var initPos = [20 + 150*j, 80 + 150*i];
                var pos = [initPos[0] + tile.speed[0] * 150 / TRANSITIONLENGTH * frame,
                        initPos[1] + tile.speed[1] * 150 / TRANSITIONLENGTH * frame];
                CONTEXT.drawImage(image, pos[0], pos[1], IMAGESIZE, IMAGESIZE);
            }
        }
    }
}

function writeScore(game) {
    var score = game.score;
    CONTEXT.fillStyle = "black";
    CONTEXT.font = "bold 20px Arial";
    CONTEXT.fillText("Score: " + score, 450, 50);
    CONTEXT.font = "bold 15px Arial";
    CONTEXT.fillText("Combine tiles to reach the coveted Harry tile", 50, 50);
}

var game = new Board();

IMAGESIZE = 130;
IMAGES = [];
NAMES = ["oliver", "owen", "cass", "alastair",
          "nic", "cath", "ben", "alexp", "alexs", "louise", "melissa", 
        "henry", "david","clare", "harry"];

window.onload = function() {
    drawEmptyTiles();
    drawTiles(game.grid);
    writeScore(game);
}

var frozenGrid = [];
var frame = 0;
var newData = [];

window.addEventListener('keydown', function (k) {
    if (1 <= frame && frame <= TRANSITIONLENGTH){
        game.resetTiles();
    }
    frozenGrid = [];
    for(var i=0; i<4; i++){
        var row = game.grid[i];
        frozenGrid.push([...row])
    }
    var tempData = game.move(k.keyCode);
    if (tempData[0]){
        newData = tempData;
        frame = 1;
    }
  })

function gameDialog(message){
    window.alert(message);
}

function updateGameArea() {
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    drawEmptyTiles();
    writeScore(game);

    if (1 <= frame && frame < TRANSITIONLENGTH){
        drawNewTile(newData[1], newData[2][0], newData[2][1]);
        drawMovingTiles(frozenGrid, frame);
        frame += 1;
    }
    else if (frame == TRANSITIONLENGTH) {
        game.resetTiles();
        drawTiles(game.grid);
        frame = 0;
    }
    else {
        drawTiles(game.grid);
    }

    if(game.checkWin()){
        gameDialog("You Win!");
        frame = 0;
        game = new Board();
    }

    if(!game.stillAlive()){
        gameDialog("You Lose!");
        frame = 0;
        game = new Board();
    }
}

setInterval(updateGameArea, 20);