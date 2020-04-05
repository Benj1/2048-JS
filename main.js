var game = new Board();
var frozenGrid = [];
var frame = 0;
var pause = 0;
var newData = [];

function updateGameArea(game) {
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

setInterval(updateGameArea, 20, game);