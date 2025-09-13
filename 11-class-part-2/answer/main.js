const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const cWidth = canvas.width
const cHeight = canvas.height
const imgFolder = 'images/';

const back = new Image()
back.src = imgFolder + 'map01_preview-01.png'

let gameFrame = 0
let score = 0

// Mouse
let mouse = {
	x: cWidth / 2,
	y: cHeight / 2
}

canvas.addEventListener('mousemove', function (evt) {
	let canvasPosition = canvas.getBoundingClientRect();
	mouse.x = evt.clientX - canvasPosition.left - 30;
	mouse.y = evt.clientY - canvasPosition.top - 50;
});

// Клас гравця
class Player {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.heroImg = new Image()
		this.heroImg.src = imgFolder + 'idle_hero.png'
		this.heroMaxFrame = 17
		this.runLeftImg = new Image()
		this.runLeftImg.src = imgFolder + 'run_left.png'
		this.runMaxFrame = 8
		this.runRightImg = new Image()
		this.runRightImg.src = imgFolder + 'run_right.png'
		this.xFrame = 0
		this.sWidth = 43
		this.sHeight = 50
		this.takt = 6
		this.speed = 5
	}

	stay() {
		ctx.drawImage(this.heroImg, this.sWidth * this.xFrame, 0, this.sWidth, this.sHeight, this.x, this.y, this.sWidth * 1.5, this.sHeight * 1.5)
		if (gameFrame % 6 === 0) {
			if (this.xFrame > this.heroMaxFrame - 2) {
				this.xFrame = 0
			} else {
				this.xFrame++
			}
		}
	}
	runLeft() {
		ctx.drawImage(this.runLeftImg, this.sWidth * this.xFrame, 0, this.sWidth, this.sHeight, this.x, this.y, this.sWidth * 1.5, this.sHeight * 1.5)
		if (gameFrame % 8 === 0) {
			if (this.xFrame > this.runMaxFrame - 2) {
				this.xFrame = 0
			} else {
				this.xFrame++
			}
		}
	}
	runRight() {

		ctx.drawImage(this.runRightImg, this.sWidth * this.xFrame, 0, this.sWidth, this.sHeight, this.x, this.y, this.sWidth * 1.5, this.sHeight * 1.5)
		if (gameFrame % this.takt === 0) {
			if (this.xFrame > this.runMaxFrame - 2) {
				this.xFrame = 0
			} else {
				this.xFrame++
			}
		}
	}

	update() {
		if (this.x !== mouse.x && this.y !== mouse.y) {
			let dx = this.x - mouse.x
			let dy = this.y - mouse.y
			if (dx * dx + dy * dy > this.speed * this.speed) {
				if (dx < 0) {
					this.x += Math.sqrt(dx * dx * this.speed * this.speed / (dx * dx + dy * dy))
				} else {
					this.x -= Math.sqrt(dx * dx * this.speed * this.speed / (dx * dx + dy * dy))
				}
				if (dy < 0) {
					this.y += Math.sqrt(dy * dy * this.speed * this.speed / (dx * dx + dy * dy))
				} else {
					this.y -= Math.sqrt(dy * dy * this.speed * this.speed / (dx * dx + dy * dy))
				}
			} else {
				this.x = mouse.x
				this.y = mouse.y
			}
		}
	}

	move() {
		if (this.x < mouse.x) {
			this.runRight()
		} else if (this.x > mouse.x) {
			this.runLeft()
		}
		else {
			this.stay()
		}
	}
}

// Клас привида
class Ghost {
	constructor() {
		this.idleGhost = new Image()
		this.idleGhost.src = imgFolder + "ghostRight.png"
		this.sWidth = 43
		this.sHeight = 50
		this.x = Math.random() * (cWidth - this.sWidth)
		this.y = cHeight + 50
		this.speed = Math.random() * 5
		this.xFrame = 0
		this.maxFrame = 11
	}

	move() {
		this.y -= this.speed
		ctx.drawImage(this.idleGhost,
			this.sWidth * this.xFrame,
			0,
			this.sWidth,
			this.sHeight,
			this.x,
			this.y,
			this.sWidth * 1.5,
			this.sHeight * 1.5)

		if (gameFrame % 6 === 0) {
			if (this.xFrame > this.maxFrame - 2) {
				this.xFrame = 0
			} else {
				this.xFrame++
			}
		}
	}
}

let ghostArray = []
function ghostMaker() {
	if (gameFrame % 50 == 0) {
		ghostArray.push(new Ghost())
	}
	for (let i = 0; i < ghostArray.length; i++) {
		ghostArray[i].move()
	}
	for (let i = 0; i < ghostArray.length; i++) {
		let dx = player.x - ghostArray[i].x
		let dy = player.y - ghostArray[i].y
		if (ghostArray[i].y < 0 - ghostArray[i].sHeight) {
			ghostArray.splice(i, 1)
		} else if (Math.sqrt(dx * dx + dy * dy) < ghostArray[i].sWidth / 2 + player.sWidth / 2) {
			ghostArray.splice(i, 1)
			score++
		}
	}
}

let player = new Player(cWidth / 2, cHeight / 2)
let ghost = new Ghost()

// Анімація канви
function animate() {
	ctx.clearRect(0, 0, cWidth, cHeight)
	ctx.drawImage(back, 0, 0, cWidth * 1.8, cHeight * 1.8, 0, 0, cWidth, cHeight)
	ctx.fillStyle = 'white'
	ctx.font = '30px serif'
	ctx.fillText('score: ' + score, 40, 40)

	player.update()
	player.move()
	ghostMaker()
	gameFrame++
	requestAnimationFrame(animate)
}


animate()
