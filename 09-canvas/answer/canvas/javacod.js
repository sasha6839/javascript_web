const canvas1 = document.getElementById('canvas1')
const ctx1 = canvas1.getContext('2d')
ctx1.fillRect(20, 20, 100, 100)
ctx1.clearRect(40, 40, 60, 60)
ctx1.strokeRect(45, 45, 50, 50)

let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');
ctx2.beginPath()
ctx2.moveTo(30, 30)
ctx2.lineTo(40, 30);
ctx2.lineTo(40, 20);
ctx2.lineTo(100, 20);
ctx2.lineTo(100, 30);
ctx2.lineTo(110, 30);
ctx2.lineTo(110, 40);
ctx2.lineTo(120, 40);
ctx2.lineTo(120, 110);
ctx2.lineTo(50, 110);
ctx2.lineTo(50, 100);
ctx2.lineTo(40, 100);
ctx2.lineTo(40, 90);
ctx2.lineTo(30, 90);
ctx2.closePath()
ctx2.fill()

ctx2.beginPath()
ctx2.moveTo(40, 40)
ctx2.lineTo(50, 40)
ctx2.lineTo(50, 30)
ctx2.lineTo(90, 30)
ctx2.lineTo(90, 40)
ctx2.lineTo(100, 40)
ctx2.lineTo(100, 50)
ctx2.lineTo(80, 50)
ctx2.lineTo(80, 40)
ctx2.lineTo(80, 50)
ctx2.lineTo(80, 40)
ctx2.lineTo(60, 40)
ctx2.lineTo(60, 80)
ctx2.lineTo(80, 80)
ctx2.lineTo(80, 70)
ctx2.lineTo(70, 70)
ctx2.lineTo(70, 60)
ctx2.lineTo(100, 60)
ctx2.lineTo(100, 90)
ctx2.lineTo(90, 90)
ctx2.lineTo(90, 80)
ctx2.lineTo(80, 80)
ctx2.lineTo(80, 90)
ctx2.lineTo(50, 90)
ctx2.lineTo(50, 80)
ctx2.lineTo(40, 80)
ctx2.closePath()
ctx2.fillStyle = "white"
ctx2.fill()

let canvas3 = document.getElementById('canvas3')
let ctx3 = canvas3.getContext('2d')
ctx3.beginPath()
ctx3.arc(60, 60, 50, (Math.PI/180)*270, (Math.PI/180)*90, true)
ctx3.fill()
ctx3.beginPath()
ctx3.moveTo(60, 110)
ctx3.lineTo(240,110)
ctx3.lineTo(240,10)
ctx3.lineTo(60,10)
ctx3.fill()
ctx3.beginPath()
ctx3.arc(240, 60, 50, (Math.PI/180)*270, (Math.PI/180)*90, false)
ctx3.fill()
ctx3.strokeStyle = "white"
ctx3.font = "80px serif"
ctx3.textAlign = "center"
ctx3.textBaseline = "middle"
ctx3.strokeText("BUTTON", 150, 60, 140)

const slidesArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]
let canvas4 = document.getElementById('canvas4')
let ctx4 = canvas4.getContext('2d')
let slideIndex = 0
let slideImg = new Image()
slideImg.src = slidesArr[slideIndex]
slideImg.onload = function(){
	ctx4.drawImage(slideImg, 0, 0)	
}


let buttonLeft = document.getElementById('leftButton')
let buttonRight = document.getElementById('rightButton')
buttonLeft.onclick = function(){
	slideIndex--
	if(slideIndex < 0){
		slideIndex = 0
	}
	slideImg.src = slidesArr[slideIndex]
}
buttonRight.onclick = function(){
	slideIndex++
	if(slideIndex >= slidesArr.length){
		slideIndex = slidesArr.length - 1
	}
	slideImg.src = slidesArr[slideIndex]
}

let stepX = 1
function sliderScroll(){
	slideIndex += stepX
	if(slideIndex >= slidesArr.length){
		slideIndex = slidesArr.length - 1
		stepX = -1
	}
	if(slideIndex < 0){
		slideIndex = 0
		stepX = 1
	}
	slideImg.src = slidesArr[slideIndex]
}


setInterval(sliderScroll, 3000)

let canvas5 = document.getElementById('canvas5')
let ctx5 = canvas5.getContext('2d')
const screenWidth = canvas5.width
const screenHeight = canvas5.height
const str = "А+Б0В-Г1Д=Е2Ё Ж3З И4Й К5Л М6Н О7П Р8С Т9У Ф!Х Ц?Ч Ш.ЩЪ,Ы Ь:ЭЮ;Я/  *@"
let matrix = str.split("")
let fontSize = 11
let colum = screenWidth/fontSize
let textPosition = []
for(let i = 0; i < colum; i++){
	textPosition[i] = 1
}
function draw(){
	ctx5.fillStyle = 'rgba(0, 0, 0, 0.05)'
	ctx5.fillRect(0, 0, screenWidth, screenHeight)
	ctx5.fillStyle = '#0f0'
	ctx5.font = fontSize + 'px system-uf'
	for(let i = 0; i < colum; i++){
		let text = matrix[Math.floor(Math.random()*(matrix.length - 1))]
		ctx5.fillText(text, i*fontSize, textPosition[i]*fontSize)
		textPosition[i]++
		if(textPosition[i] > screenHeight/fontSize && Math.random() > 0.96){
			textPosition[i] = 1
		}
		
	}
}
setInterval(draw, 200)









