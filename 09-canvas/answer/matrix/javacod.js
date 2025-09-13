// Отримуємо елемент <canvas> з id="canvas1"
const canvasFon = document.querySelector("#canvas1")

// Створюємо 2D-контекст для малювання
let ctx1 = canvasFon.getContext("2d")

// Визначаємо ширину та висоту канвасу
let canwasWidth = canvasFon.width
let canwasHeight = canvasFon.height

// Виводимо ширину канвасу в консоль для перевірки
console.log(canwasWidth)

// Створюємо рядок символів, які будуть використовуватися в анімації "Матриці"
const str = "А+Б0В-Г1Д=Е2Ё Ж3З И4Й К5Л М6Н О7П Р8С Т9У Ф!Х Ц?Ч Ш.ЩЪ,Ы Ь:ЭЮ;Я"

// Перетворюємо рядок у масив символів
let matrix = str.split("")

// Виводимо масив символів у консоль
console.log(matrix)

// Визначаємо розмір шрифту для символів
let font = 11

// Розраховуємо кількість колонок символів залежно від ширини канвасу
let col = canwasWidth / font

// Створюємо масив для позицій кожного символу у вертикальному русі
let arr = []

// Заповнюємо масив початковими значеннями (1) для кожної колонки
for (let i = 0; i < col; i++) arr[i] = 1;

// Виводимо масив позицій у консоль для перевірки
console.log(arr)

// Функція для малювання матричного ефекту
function draw() {
  // Малюємо напівпрозорий чорний прямокутник для створення ефекту поступового зникнення символів
  ctx1.fillStyle = "rgba(0, 0, 0, 0.05)"
  ctx1.fillRect(0, 0, canwasWidth, canwasHeight)

  // Встановлюємо зелений колір тексту, як у фільмі "Матриця"
  ctx1.fillStyle = "#0f0"

  // Встановлюємо розмір та тип шрифту для символів
  ctx1.font = font + "px system-ui";

  // Малюємо випадкові символи у кожній колонці
  for (let i = 0; i < arr.length; i++){
    // Вибираємо випадковий символ з масиву matrix
    let txt = matrix[Math.floor(Math.random() * matrix.length)];    
    
    // Малюємо символ у колонці i на відповідній висоті
    ctx1.fillText(txt, i * font, arr[i] * font);
    
    // Якщо символ досяг нижнього краю, перезапускаємо його випадковим чином
    if (arr[i] * font > canwasHeight && Math.random() > 0.96) 
        arr[i] = 0;
    
    // Зсуваємо символи вниз
    arr[i]++;
  }
}

// Запускаємо функцію draw() кожні 100 мс для створення анімації
setInterval(draw, 100);


// Масив з іменами файлів зображень для слайдера
const slideArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.png"]

// Отримуємо другий <canvas> і налаштовуємо його 2D-контекст
const canvasSlider = document.querySelector("#canvas2")
let ctx2 = canvasSlider.getContext("2d")

// Створюємо змінну для зображення та початкову позицію слайду
let slide = new Image()
let slidePosition = 0

// Встановлюємо початкове зображення у canvas2
slide.src = slideArr[slidePosition]

// Малюємо зображення у canvas2 після його завантаження
slide.onload = function(){
    ctx2.drawImage(slide, 0, 0)    
}

// Отримуємо кнопки для перемикання слайдів
const buttonLeft = document.querySelector(".leftButtom")
const buttonRight = document.querySelector(".rightButtom")

// Функція для перемикання слайдів вліво
function scrollLeft(){
    // Зменшуємо позицію слайду
    slidePosition--
    // Якщо позиція менше 0, залишаємо її на 0
    if(slidePosition < 0){
        slidePosition = 0
    }
    // Завантажуємо нове зображення та малюємо його у canvas2
    slide.src = slideArr[slidePosition]
    slide.onload = function(){
        ctx2.drawImage(slide,0,0)
    }
}

// Додаємо обробник події для натискання лівої кнопки
buttonLeft.addEventListener('click', scrollLeft)

// Функція для перемикання слайдів вправо
function scrollRight(){
    // Збільшуємо позицію слайду
    slidePosition++
    // Якщо позиція більша за довжину масиву, залишаємо її на останньому слайді
    if(slidePosition >= slideArr.length){
        slidePosition = slideArr.length - 1
    }
    // Завантажуємо нове зображення та малюємо його у canvas2
    slide.src = slideArr[slidePosition]
    slide.onload = function(){
        ctx2.drawImage(slide,0,0)
    }
}

// Додаємо обробник події для натискання правої кнопки
buttonRight.addEventListener('click', scrollRight)
