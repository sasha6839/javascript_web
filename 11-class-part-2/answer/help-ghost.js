// === 1. Canvas Setup ===
// Get canvas element from DOM
const canvas = document.getElementById('canvas');
// Get 2D rendering context for the canvas
const ctx = canvas.getContext('2d');
// Store canvas width
const cWidth = canvas.width;
// Store canvas height
const cHeight = canvas.height;
// Path to images folder
const imgFolder = 'images/';

// === 2. Global Variables ===
// Frame counter for animation timing
let gameFrame = 0;
// Player score
let score = 0;
// Game state flag (running/paused)
let isRunning = true;
// ID for animation frame request
let requestId = null;

// === 3. Images ===
// Create background image object
const back = new Image();
// Set background image source
back.src = imgFolder + 'map01_preview-01.png';

// === 4. Mouse Object ===
// Object to track mouse position
let mouse = {
	x: cWidth / 2,  // Initial x position (center)
	y: cHeight / 2  // Initial y position (center)
};

// === 5. Mouse Event Handler ===
// Listen for mouse movement on canvas
canvas.addEventListener('mousemove', function (evt) {
	// Get canvas position relative to viewport
	let canvasPosition = canvas.getBoundingClientRect();
	// Calculate mouse x position relative to canvas (with offset)
	mouse.x = evt.clientX - canvasPosition.left - 30;
	// Calculate mouse y position relative to canvas (with offset)
	mouse.y = evt.clientY - canvasPosition.top - 50;
});

// === 6. Player Class ===
class Player {
	// Static properties for player images
	static heroImg = new Image();      // Idle state image
	static runLeftImg = new Image();  // Running left animation
	static runRightImg = new Image(); // Running right animation

	// Static method to load player images
	static loadImages() {
		Player.heroImg.src = imgFolder + 'idle_hero.png';
		Player.runLeftImg.src = imgFolder + 'run_left.png';
		Player.runRightImg.src = imgFolder + 'run_right.png';
	}

	// Constructor for player instances
	constructor(x, y) {
		this.x = x;            // X position
		this.y = y;            // Y position
		this.heroMaxFrame = 17; // Frames in idle animation
		this.runMaxFrame = 8;   // Frames in run animation
		this.xFrame = 0;       // Current animation frame
		this.sWidth = 43;      // Sprite width
		this.sHeight = 50;     // Sprite height
		this.takt = 6;         // Animation speed control
		this.speed = 5;        // Movement speed
	}

	// Draw idle animation
	stay() {
		// Draw current frame of idle animation
		ctx.drawImage(Player.heroImg, this.sWidth * this.xFrame, 0, this.sWidth, this.sHeight, this.x, this.y, this.sWidth * 1.5, this.sHeight * 1.5);
		// Update frame every 6 game frames
		if (gameFrame % this.takt === 0) {
			this.xFrame = (this.xFrame + 1) % this.heroMaxFrame;
		}
	}

	// Draw run left animation
	runLeft() {
		// Draw current frame of run left animation
		ctx.drawImage(Player.runLeftImg, this.sWidth * this.xFrame, 0, this.sWidth, this.sHeight, this.x, this.y, this.sWidth * 1.5, this.sHeight * 1.5);
		// Update frame based on takt value
		if (gameFrame % this.takt === 0) {
			this.xFrame = (this.xFrame + 1) % this.runMaxFrame;
		}
	}

	// Draw run right animation
	runRight() {
		// Draw current frame of run right animation
		ctx.drawImage(Player.runRightImg, this.sWidth * this.xFrame, 0, this.sWidth, this.sHeight, this.x, this.y, this.sWidth * 1.5, this.sHeight * 1.5);
		// Update frame based on takt value
		if (gameFrame % this.takt === 0) {
			this.xFrame = (this.xFrame + 1) % this.runMaxFrame;
		}
	}

	// Update player position based on mouse
	update() {
		// Calculate distance to mouse
		let dx = mouse.x - this.x;
		let dy = mouse.y - this.y;
		let distance = Math.sqrt(dx * dx + dy * dy);

		// Move toward mouse if far enough away
		if (distance > this.speed) {
			this.x += (dx / distance) * this.speed;
			this.y += (dy / distance) * this.speed;
		} else {
			// Snap to mouse if close
			this.x = mouse.x;
			this.y = mouse.y;
		}
	}

	// Determine which animation to play
	move() {
		// Calculate distance to mouse x position
		const delta = Math.abs(this.x - mouse.x);
		// If very close, play idle animation
		if (delta < 2) {
			this.stay();
		} 
		// If moving right, play right animation
		else if (this.x < mouse.x) {
			this.runRight();
		} 
		// Otherwise play left animation
		else {
			this.runLeft();
		}
	}
}

// === 7. Ghost Class ===
class Ghost {
	// Static ghost image property
	static idleGhost = new Image();

	// Constructor for ghost instances
	constructor() {
		this.sWidth = 43;      // Sprite width
		this.sHeight = 50;     // Sprite height
		// Random x position within canvas bounds
		this.x = Math.random() * (cWidth - this.sWidth);
		// Start below canvas
		this.y = cHeight + 50;
		// Random speed
		this.speed = Math.random() * 5;
		this.xFrame = 0;       // Current animation frame
		this.maxFrame = 11;    // Total frames in animation
	}

	// Move ghost upward
	move() {
		// Move up by speed value
		this.y -= this.speed;
		// Draw current frame of ghost animation
		ctx.drawImage(Ghost.idleGhost,
			this.sWidth * this.xFrame,
			0,
			this.sWidth,
			this.sHeight,
			this.x,
			this.y,
			this.sWidth * 1.5,
			this.sHeight * 1.5);

		// Update animation frame every 6 game frames
		if (gameFrame % 6 === 0) {
			this.xFrame = (this.xFrame + 1) % this.maxFrame;
		}
	}
}

// Set ghost image source
Ghost.idleGhost.src = imgFolder + "ghostRight.png";

// === 8. Collision Detection Function ===
function checkCollision(obj1, obj2) {
	// Calculate distance between objects
	let dx = obj1.x - obj2.x;
	let dy = obj1.y - obj2.y;
	let distance = Math.sqrt(dx * dx + dy * dy);
	// Check if distance is less than sum of radii
	return distance < obj1.sWidth / 2 + obj2.sWidth / 2;
}

// === 9. Ghost Array and Generator ===
// Array to store active ghosts
let ghostArray = [];

// Function to manage ghost generation and movement
function ghostMaker() {
	// Create new ghost every 50 frames
	if (gameFrame % 50 === 0) {
		ghostArray.push(new Ghost());
	}
	// Move all existing ghosts
	ghostArray.forEach(ghost => ghost.move());

	// Filter ghosts that are off-screen or collided
	ghostArray = ghostArray.filter(ghost => {
		// Remove if above top of screen
		if (ghost.y < -ghost.sHeight) return false;
		// Remove if collided with player and increase score
		if (checkCollision(player, ghost)) {
			score++;
			return false;
		}
		// Keep otherwise
		return true;
	});
}

// === 10. Player Creation ===
// Create player instance at center of canvas
let player = new Player(cWidth / 2, cHeight / 2);
// Load player images
Player.loadImages();

// === 11. Main Animation Loop ===
function animate() {
	// Skip if game is paused
	if (!isRunning) return;

	// Clear canvas
	ctx.clearRect(0, 0, cWidth, cHeight);
	// Draw background (scaled)
	ctx.drawImage(back, 0, 0, cWidth * 1.8, cHeight * 1.8, 0, 0, cWidth, cHeight);
	// Set score text style
	ctx.fillStyle = 'white';
	ctx.font = '30px serif';
	// Draw score
	ctx.fillText('score: ' + score, 40, 40);

	// Update and draw player
	player.update();
	player.move();
	// Manage ghosts
	ghostMaker();

	// Increment frame counter
	gameFrame++;
	// Request next animation frame
	requestId = requestAnimationFrame(animate);
}

// === 12. Escape Key Handling ===
document.addEventListener('keydown', (e) => {
	// Toggle pause when Escape is pressed
	if (e.key === 'Escape') {
		isRunning = !isRunning;
		// Resume if now running
		if (isRunning) {
			animate();
		} 
		// Pause if now stopped
		else {
			cancelAnimationFrame(requestId);
		}
	}
});

// === 13. Image Loading ===
// Array of all game images
const images = [back, Player.heroImg, Player.runLeftImg, Player.runRightImg, Ghost.idleGhost];
// Counter for loaded images
let loadedImages = 0;

// Wait for all images to load before starting
images.forEach(img => {
	img.onload = () => {
		loadedImages++;
		// Start game when all images are loaded
		if (loadedImages === images.length) {
			animate();
		}
	};
});