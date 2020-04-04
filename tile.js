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
