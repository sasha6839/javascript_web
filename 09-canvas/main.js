const canvasBg = document.getElementById('canvas-bg');

let ctx = canvasBg.getContext('2d');

let canvasWidth = canvasBg.width;
let canvasHeight = canvasBg.height;

const str = "ВІ ОШАТ Р2784 РН1Щ ЬЛФЩ0 ІФЦЛЩС Ь1 ОШПТЬГ КТ3НМИЕФЦЯ ФВДП 23Ш9Г8572 І18Р1ТЩО1Б9ЬВ АФ09 Т28Н 891О ФЩЖ2 1ОГ89З ВО1З ОЬІ ФХ01Ш9 1DK901 0 KE `, S1K0 E01K9 E091K E';PK[Q201K [QAXN DUIBN GF BH281J8JI9PSMIPAMIO O KSAIS;ML AOO,KS,OP1KM8902H 482N8 FN 23"
let matrixLetters = str.split("")
console.log(matrixLetters)

let font = 6
let col = canvasWidth / font
let arrayLetters = []

for(let i = 0; i < col; i++)
    arrayLetters[i] = 1;


ctx.fillStyle = "rgb(0,0,0)"


function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0, 0.07)"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    
    ctx.fillStyle = "#0F0"
    ctx.font = font + "px system-ui"

    for(let i=0; i < arrayLetters.length; i++) {
        let txt = matrixLetters[
            Math.floor(Math.random() * matrixLetters.length)
        ]

        ctx.fillText(txt, i * font, arrayLetters[i] * font)

        if(arrayLetters[i] * font > canvasHeight
            && Math.random() > 0.95)
            arrayLetters[i] = 0

        arrayLetters[i]++
    }
}

setInterval(drawMatrix, 100);