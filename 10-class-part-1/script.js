console.log('start!')

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cWidth = canvas.width;
const cHeight = canvas.height;
const imgFolder = 'images/'

const bgImg = new Image();
bgImg.src = imgFolder + 'map01_preview-01.png';

let gameFrame = 0;

let mouse = {
    x: cWidth / 2,
    y: cHeight / 2
}

canvas.addEventListener('mousemove', function(event){
    console.log(event)
    let canvasPosition = canvas.getBoundingClientRect();
    mouse.x = event.clientX - canvasPosition.left
    mouse.y = event.clientY - canvasPosition.top
})

class Player{
    static heroImg = new Image();
    static runLeftImg = new Image();
    static runRightImg = new Image();

    static loadImages(){
        Player.heroImg.src = imgFolder + 'idle_hero.png'
        Player.runLeftImg.src = imgFolder + 'run_left.png'
        Player.runRightImg.src = imgFolder + 'run_right.png'
    }
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.heroMaxFrame = 17;
        this.runMaxFrame = 8;
        this.xFrame = 0;
        this.sWidth = 43;
        this.sHeight = 50;
        this.speed = 5;
        this.takt = 6;

    }

    stay() {
        ctx.drawImage(
            Player.heroImg,
            this.sWidth * this.xFrame,
            0,
            this.sWidth,
            this.sHeight,
            this.x,
            this.y,
            this.sWidth,
            this.sHeight
            );
        if(gameFrame % this.takt == 0)
            this.xFrame = (this.xFrame + 1) % this.heroMaxFrame
    }
    runLeft() {
        ctx.drawImage(
            Player.runLeftImg,
            this.sWidth * this.xFrame,
            0,
            this.sWidth,
            this.sHeight,
            this.x,
            this.y,
            this.sWidth,
            this.sHeight
            );
        if(gameFrame % this.takt == 0)
            this.xFrame = (this.xFrame + 1) % this.runMaxFrame
    }
    runRight() {
        ctx.drawImage(
            Player.runRightImg,
            this.sWidth * this.xFrame,
            0,
            this.sWidth,
            this.sHeight,
            this.x,
            this.y,
            this.sWidth,
            this.sHeight
            );
        if(gameFrame % this.takt == 0)
            this.xFrame = (this.xFrame + 1) % this.runMaxFrame
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > this.speed){
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        } else {
            this.x = mouse.x;
            this.y = mouse.y;
        }
    }
    move() {
        const delta = Math.abs(this.x - mouse.x)
        
        if(delta < 2) {
            this.stay()
        } else if (this.x < mouse.x) {
            this.runRight()
        } else {
            this.runLeft()
        }
    }

}
class Ghost {
    static idleGhost = new Image();

    constructor() {
        this.sWidth = 43;
        this.sHeight = 50;
        this.x = Math.random() * (cWidth - this.sWidth)
        this.y = cHeight + 50;
        this.speed = Math.random() * 5
    }
}

let player = new Player()
Player.loadImages()

function startAnimete() {
    // console.log(gameFrame);
    ctx.clearRect(0,0,cWidth,cHeight)
    ctx.drawImage(bgImg, 0, 0,)

    player.update()
    player.move()

    gameFrame++;
    requestAnimationFrame(startAnimete)
}

// setInterval(startAnimete, 100)
startAnimete()