const grid = document.querySelector('.grid')
let bombsRemoved = []

for (let i = 0; i < 225; i++) {
    let div = document.createElement('div');
    div.id = i;
    grid.append(div);
}

let bombs = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];


const gridDiv = document.querySelectorAll('.grid div');

function drawBombs(bombsArray) {
    for(let i = 0; i < bombsArray.length; i++){
        if(!bombsRemoved.includes(i))
            gridDiv[bombsArray[i]].classList.add('bomb')
    }
}
drawBombs(bombs)
function removeBombs(bombsArray) {
    for(let i = 0; i < bombsArray.length; i++){
        gridDiv[bombsArray[i]].classList.remove('bomb')
    }
}


let shooterIndex = 217
gridDiv[shooterIndex].classList.add('shooter')

let xStep = 1;
let yStep = 0;
let directionRight = true;
let widthGrid = 15

function moveBombs(bombsArray) {
    removeBombs(bombsArray)
    yStep = 0;

    if(directionRight && 
        bombsArray[bombsArray.length-1] % widthGrid == widthGrid-1)
    {
        directionRight = false
        xStep = -1
        yStep = widthGrid
    }
    if(!directionRight && 
        bombsArray[0] % widthGrid == 0)
    {
        directionRight = true
        xStep = 1
        yStep = widthGrid
    }
    
    // змінюємо значення координат для кожнної бомби
    for (let i = 0; i < bombsArray.length; i++)        
        bombsArray[i] += xStep + yStep;




    drawBombs(bombsArray)
}
let setIntervalId = setInterval(moveBombs, 500, bombs)

// Рух гравця: влівл - вправо
function moveShooter(event){
    gridDiv[shooterIndex].classList.remove('shooter')
    //console.log(event)    
    switch (event.code){
        case 'ArrowLeft':
            if (shooterIndex > 210)
                shooterIndex--;
            break
        case 'ArrowRight':
            if (shooterIndex < 224)
                shooterIndex++;
            break
    }
    gridDiv[shooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

// Постріл гравця
function shoot(event) {
    let currentShooterIndex = shooterIndex
    let intervalId
    console.log(event)
    function moveShoot(){
        gridDiv[currentShooterIndex].classList.remove('shoot')
        currentShooterIndex -= 15
        
        if(currentShooterIndex < 0)
            clearInterval(intervalId)

        if(gridDiv[currentShooterIndex].classList.contains('bomb') ){
            bombsRemoved.push(bombs.indexOf(currentShooterIndex))
            
            gridDiv[currentShooterIndex].classList.remove('bomb')
            gridDiv[currentShooterIndex].classList.add('boom')

            setTimeout(()=>{gridDiv[currentShooterIndex].classList.remove('boom')}, 500)

            clearInterval(intervalId)
        } else {
            gridDiv[currentShooterIndex].classList.add('shoot')
        }        
    }

    if (event.code == 'Space') {
        console.log(1)
        intervalId = setInterval(moveShoot, 100)
    }
}
document.addEventListener('keydown', shoot)