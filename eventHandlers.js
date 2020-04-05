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

var touchEvent = {
    startX : 0,
    startY : 0,
    startTime : 0,
    allowedTime : 200,
    threshold : 150,
    allowedNoise : 100
}

window.addEventListener('touchstart', function(evt){
    var touchObj = evt.changedTouches[0];
    touchEvent.startX = touchObj.pageX;
    touchEvent.startY = touchObj.pageY;
    touchEvent.startTime = new Date().getTime();
    evt.preventDefault();
})


window.addEventListener('touchmove', function(evt){
    evt.preventDefault();
})


window.addEventListener('touchend', function(evt){
    var touchObj = evt.changedTouches[0];
    distX = touchObj.pageX - touchEvent.startX;
    distY = touchObj.pageY - touchEvent.startY;
    elapsedTime = new Date().getTime() - touchEvent.startTime;
    var swipeRightBol = (elapsedTime <= touchEvent.allowedTime && 
        distX >= touchEvent.threshold && Math.abs(distY) <= touchEvent.allowedNoise);
    var swipeLeftBol = (elapsedTime <= touchEvent.allowedTime && 
        distX <= -touchEvent.threshold && Math.abs(distY) <= touchEvent.allowedNoise);
    var swipeUpBol = (elapsedTime <= touchEvent.allowedTime && 
        distY <= -touchEvent.threshold && Math.abs(distX) <= touchEvent.allowedNoise);
    var swipeDownBol = (elapsedTime <= touchEvent.allowedTime && 
        distY >= touchEvent.threshold && Math.abs(distX) <= touchEvent.allowedNoise);
    if(swipeRightBol){
        game.move(K_RIGHT);
    }
    else if(swipeLeftBol){
        game.move(K_LEFT);
    }
    else if(swipeUpBol){
        game.move(K_UP);
    }
    else if(swipeDownBol){
        game.move(K_DOWN);
    }
    evt.preventDefault();    
})