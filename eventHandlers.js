var touchEvent = {
    startX : 0,
    startY : 0,
    startTime : 0,
    allowedTime : 200,
    threshold : 150,
    allowedNoise : 100
}

window.addEventListener('keydown', function (k) {
    if (k.keyCode == K_LEFT || k.keyCode == K_RIGHT || k.keyCode == K_UP ||
        k.keyCode == K_DOWN){
            handleMove(k.keyCode);
    }
})

window.addEventListener('touchstart', function(evt){
    evt.preventDefault();
    var touchObj = evt.changedTouches[0];
    touchEvent.startX = touchObj.pageX;
    touchEvent.startY = touchObj.pageY;
    touchEvent.startTime = new Date().getTime();
})

window.addEventListener('touchmove', function(evt){
    evt.preventDefault();
})

window.addEventListener('touchend', function(evt){
    evt.preventDefault();  
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
        handleMove(K_RIGHT);
    }
    else if(swipeLeftBol){
        handleMove(K_LEFT);
    }
    else if(swipeUpBol){
        handleMove(K_UP);
    }
    else if(swipeDownBol){
        handleMove(K_DOWN);
    }
})

function handleMove(key){
    if (1 <= frame && frame <= TRANSITIONLENGTH){
        game.resetTiles();
    }
    frozenGrid = [];
    for(var i=0; i<4; i++){
        var row = game.grid[i];
        frozenGrid.push([...row])
    }
    var tempData = game.move(key);
    if (tempData[0]){
        newData = tempData;
        frame = 1;
    }
}