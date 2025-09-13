// === 1. Налаштування канви ===
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cWidth = canvas.width;
const cHeight = canvas.height;
const imgFolder = 'images/';

// === 2. Глобальні змінні ===
let gameFrame = 0;
let score = 0;
let isRunning = true;
let requestId = null;

// === 3. Зображення ===
const back = new Image();
back.src = imgFolder + 'map01_preview-01.png';

// === 4. Об'єкт миші ===
let mouse = {
	x: cWidth / 2,
	y: cHeight / 2
};

// === 5. Обробник події миші ===
canvas.addEventListener('mousemove', function (evt) {
	let canvasPosition = canvas.getBoundingClientRect();
	mouse.x = evt.clientX - canvasPosition.left - 30;
	mouse.y = evt.clientY - canvasPosition.top - 50;
});

// === 6. Клас Player ===
class Player {
	static heroImg = new Image();
	static runLeftImg = new Image();
	static runRightImg = new Image();

	static loadImages() {
		Player.heroImg.src = imgFolder + 'idle_hero.png';
		Player.runLeftImg.src = imgFolder + 'run_left.png';
		Player.runRightImg.src = imgFolder + 'run_right.png';
	}

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.heroMaxFrame = 17;
		this.runMaxFrame = 8;
		this.xFrame = 0;
		this.sWidth = 43;
		this.sHeight = 50;
		this.takt = 6;
		this.speed = 5;
	}

	stay() {
		ctx.drawImage(Player.heroImg, this.sWidth * this.xFrame, 0, this.sWidth, this.sHeight, this.x, this.y, this.sWidth * 1.5, this.sHeight * 1.5);
		if (gameFrame % this.takt === 0) {
			this.xFrame = (this.xFrame + 1) % this.heroMaxFrame;
		}
	}

	runLeft() {
		ctx.drawImage(Player.runLeftImg, this.sWidth * this.xFrame, 0, this.sWidth, this.sHeight, this.x, this.y, this.sWidth * 1.5, this.sHeight * 1.5);
		if (gameFrame % this.takt === 0) {
			this.xFrame = (this.xFrame + 1) % this.runMaxFrame;
		}
	}

	runRight() {
		ctx.drawImage(Player.runRightImg, this.sWidth * this.xFrame, 0, this.sWidth, this.sHeight, this.x, this.y, this.sWidth * 1.5, this.sHeight * 1.5);
		if (gameFrame % this.takt === 0) {
			this.xFrame = (this.xFrame + 1) % this.runMaxFrame;
		}
	}

	update() {
		let dx = mouse.x - this.x;
		let dy = mouse.y - this.y;
		let distance = Math.sqrt(dx * dx + dy * dy);

		if (distance > this.speed) {
			this.x += (dx / distance) * this.speed;
			this.y += (dy / distance) * this.speed;
		} else {
			this.x = mouse.x;
			this.y = mouse.y;
		}
	}

	move() {
		const delta = Math.abs(this.x - mouse.x);
		if (delta < 2) {
			this.stay();
		} else if (this.x < mouse.x) {
			this.runRight();
		} else {
			this.runLeft();
		}
	}
}

// === 7. Клас Ghost ===
class Ghost {
	static idleGhost = new Image();

	constructor() {
		this.sWidth = 43;
		this.sHeight = 50;
		this.x = Math.random() * (cWidth - this.sWidth);
		this.y = cHeight + 50;
		this.speed = Math.random() * 5;
		this.xFrame = 0;
		this.maxFrame = 11;
        this.takt = 6
	}

	move() {
		this.y -= this.speed;
		ctx.drawImage(Ghost.idleGhost,
			this.sWidth * this.xFrame,
			0,
			this.sWidth,
			this.sHeight,
			this.x,
			this.y,
			this.sWidth * 1.5,
			this.sHeight * 1.5);

		if (gameFrame % this.takt === 0) {
			this.xFrame = (this.xFrame + 1) % this.maxFrame;
		}
	}
}

Ghost.idleGhost.src = imgFolder + "ghostRight.png";

// === 8. Функція зіткнення ===
function checkCollision(obj1, obj2) {
	let dx = obj1.x - obj2.x;
	let dy = obj1.y - obj2.y;
	let distance = Math.sqrt(dx * dx + dy * dy);
	return distance < obj1.sWidth / 2 + obj2.sWidth / 2;
}

// === 9. Масив привидів та їх генерація ===
let ghostArray = [];

function ghostMaker() {
	if (gameFrame % 50 === 0) {
		ghostArray.push(new Ghost());
	}
	ghostArray.forEach(ghost => ghost.move());

	ghostArray = ghostArray.filter(ghost => {
		if (ghost.y < -ghost.sHeight) return false;
		if (checkCollision(player, ghost)) {
			score++;
			return false;
		}
		return true;
	});
}

// === 10. Створення гравця ===
let player = new Player(cWidth / 2, cHeight / 2);
Player.loadImages();

// === 11. Основна анімація ===
function animate() {
	if (!isRunning) return;

	ctx.clearRect(0, 0, cWidth, cHeight);
	ctx.drawImage(back, 0, 0, cWidth * 1.8, cHeight * 1.8, 0, 0, cWidth, cHeight);
	ctx.fillStyle = 'white';
	ctx.font = '30px serif';
	ctx.fillText('score: ' + score, 40, 40);

	player.update();
	player.move();
	ghostMaker();

	gameFrame++;
	requestId = requestAnimationFrame(animate);
}

// === 12. Обробка Escape ===
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		isRunning = !isRunning;
		if (isRunning) {
			animate();
		} else {
			cancelAnimationFrame(requestId);
		}
	}
});

// === 13. Очікування завантаження зображень ===
const images = [back, Player.heroImg, Player.runLeftImg, Player.runRightImg, Ghost.idleGhost];
let loadedImages = 0;

images.forEach(img => {
	img.onload = () => {
		loadedImages++;
		if (loadedImages === images.length) {
			animate();
		}
	};
});
