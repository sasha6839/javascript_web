const grid = document.querySelector('.grid')

for(let i = 0; i < 225; i++){
	let square = document.createElement('div')
	grid.append(square)
}
const squares = document.querySelectorAll('.grid div')
// індекси бомб (положення на сітці)
let bombs= [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]
let shooterIndex = 202
let directionRigt = true
let xStep = 1
const width = 15
let bombsRemoved = []
let result = document.querySelector('#result')

function draw(bombsArray, squaresArray){
	for(let i = 0; i < bombsArray.length; i++){
		if(!bombsRemoved.includes(i)){
			squaresArray[bombsArray[i]].classList.add('bomb')
		}
	}
}

function remove(bombsArray, squaresArray){
	for(let i = 0; i < bombsArray.length; i++){
		squaresArray[bombsArray[i]].classList.remove('bomb')
	}
}

function moveBombs(bombsArray, squaresArray, width){
	remove(bombsArray, squaresArray)
	let yStep = 0
	if(directionRigt && bombsArray[bombsArray.length-1] % width === width-1){
		directionRigt = false
		xStep = -1
		yStep = width
	}
	if(!directionRigt && bombsArray[0] % width === 0){
		directionRigt = true
		xStep = 1
		yStep = width
	}
	for(let i = 0; i < bombsArray.length; i++){
		bombsArray[i] += xStep + yStep
	}

	draw(bombsArray, squaresArray)

	if(bombs.length === bombsRemoved.length){
		alert('YOU WIN')
		clearInterval(timerId)
	}
	if(squaresArray[shooterIndex].classList.contains('bomb', 'shooter')){
		alert('GAME OVER')
		clearInterval(timerId)
	}
	if(bombsArray[bombsArray.length-1] > 210){
		alert('GAME OVER')
		clearInterval(timerId)
	}		
}

function moveShooter(event){
	squares[shooterIndex].classList.remove('shooter')
	
	switch(event.code){
		case 'ArrowLeft':
			if(shooterIndex % width !== 0){
				shooterIndex--
			}
			break
		case 'ArrowRight':
			if(shooterIndex % width !== width-1){
				shooterIndex++
			}
			break
	}
	squares[shooterIndex].classList.add('shooter')
}

function shoot(event){
	let shootTimerId
	let currentShootIndex = shooterIndex

	function moveShoot(){
		squares[currentShootIndex].classList.remove('shoot')
		currentShootIndex -= width
		if(squares[currentShootIndex].classList.contains('bomb')){
			squares[currentShootIndex].classList.remove('bomb')
			squares[currentShootIndex].classList.add('boom')
			setTimeout(() => {squares[currentShootIndex].classList.remove('boom')}, 300)
			clearInterval(shootTimerId)
			bombsRemoved.push(bombs.indexOf(currentShootIndex))
			result.innerHTML = bombsRemoved.length
		} else{
			squares[currentShootIndex].classList.add('shoot')
		}
	}

	if(event.code === 'Space'){
		shootTimerId = setInterval(moveShoot, 100)
	}	
}


draw(bombs, squares)
let timerId = setInterval(moveBombs, 500, bombs, squares, width)
squares[shooterIndex].classList.add('shooter')

document.addEventListener('keydown', moveShooter)
document.addEventListener('keydown', shoot)
