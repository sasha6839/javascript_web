console.log('start!')

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cWidth = canvas.width;
const cHeight = canvas.cHeight
const imgFolder = 'images/'

const bgImg = new Image();
bgImg.src = imgFolder + 'map01_preview-01.png';

let gameFrame = 0;

class Player{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.heroImg = new Image()
        this.heroImg.src = imgFolder + 'idle_hero.png'
        this.heroMaxFrame = 17
    }

    stay() {

    }
    runLeft() {

    }
    runRight() {

    }
    move() {

    }
    update() {

    }
}
class Ghost {
    constructor() {

    }
}

let player = new

function startAnimete() {
    // console.log(gameFrame);
    ctx.clearRect(0,0,cWidth,cHeight)
    ctx.drawImage(bgImg, 0, 0,)

    gameFrame++;
    requestAnimationFrame(startAnimete)
}

// setInterval(startAnimete, 100)
startAnimete()