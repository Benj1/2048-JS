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