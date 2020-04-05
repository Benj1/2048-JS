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
