const CANVAS = document.getElementById("gameArea");
const CONTEXT = CANVAS.getContext("2d");

const TRANSITIONLENGTH = 5;

const IMAGESIZE = 130;
const NAMES = ["oliver", "owen", "cass", "alastair",
          "nic", "cath", "ben", "alexp", "alexs", "louise", "melissa", 
        "henry", "david","clare", "harry"];

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

function writeScore(score) {
    var score = score;
    CONTEXT.fillStyle = "black";
    CONTEXT.font = "bold 20px Arial";
    CONTEXT.fillText("Score: " + score, 450, 50);
    CONTEXT.font = "bold 15px Arial";
    CONTEXT.fillText("Combine tiles to reach the coveted Harry tile", 50, 50);
}

function gameDialog(message){
    window.alert(message);
}

var game = new Board();
var frozenGrid = [];
var frame = 0;
var pause = 0;
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


function updateGameArea() {
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    drawEmptyTiles();
    writeScore(game.score);

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
        pause += 1;
        if (pause > 30){
            gameDialog("You Win!");
            pause = 0;
            frame = 0;
            game = new Board();
        }
    }

    if(!game.stillAlive()){
        pause += 1;
        if (pause > 30){
            gameDialog("You Lose!");
            frame = 0;
            pause = 0;
            game = new Board();
        }
    }
}

setInterval(updateGameArea, 20);