// Отримуємо елемент canvas із HTML за його ID
const canvas = document.getElementById('canvas');
// Отримуємо 2D контекст для малювання на canvas
const ctx = canvas.getContext('2d');
// Зберігаємо ширину та висоту canvas для зручності використання
const cWidth = canvas.width;
// Зберігаємо висоту canvas
const cHeight = canvas.height;
// Визначаємо шлях до папки із зображеннями
const imgFolder = 'images/';
// Створюємо об’єкт зображення для фону
const back = new Image();
// Вказуємо джерело фонового зображення
back.src = imgFolder + 'map01_preview-01.png';
// Лічильник кадрів для керування анімацією
let gameFrame = 0;

// Клас Player представляє базового персонажа
class Player {
    // Конструктор приймає початкові координати x, y
    constructor(x, y) {
        // Позиція персонажа по осі X
        this.x = x;
        // Позиція персонажа по осі Y
        this.y = y;
        // Створюємо зображення для спокійного стану персонажа
        this.heroImg = new Image();
        // Джерело зображення для спокійного стану
        this.heroImg.src = imgFolder + 'idle_hero.png';
        // Максимальна кількість кадрів у спокійній анімації
        this.heroMaxFrame = 17;
        // Зображення для бігу вліво
        this.runLeftImg = new Image();
        // Джерело зображення для бігу вліво
        this.runLeftImg.src = imgFolder + 'run_left.png';
        // Максимальна кількість кадрів для анімації бігу
        this.runMaxFrame = 8;
        // Зображення для бігу вправо
        this.runRightImg = new Image();
        // Джерело зображення для бігу вправо
        this.runRightImg.src = imgFolder + 'run_right.png';
        // Поточний кадр анімації
        this.xFrame = 0;
        // Ширина одного кадру у спрайті
        this.sWidth = 43;
        // Висота одного кадру у спрайті
        this.sHeight = 50;
        // Частота зміни кадрів (чим менше, тим швидше анімація)
        this.takt = 6;
        // Швидкість персонажа (не використовується в цьому коді)
        this.speed = 50;
    }

    // Метод для відображення персонажа у спокійному стані
    stay() {
        // Малюємо кадр із спрайту спокійного стану, масштабуючи його в 1.5 рази
        ctx.drawImage(this.heroImg, this.sWidth * this.xFrame, 0, this.sWidth, this.sHeight, this.x, this.y, this.sWidth * 1.5, this.sHeight * 1.5);
        // Оновлюємо кадр кожні 6 ітерацій циклу анімації
        if (gameFrame % 6 === 0) {
            // Якщо досягнуто передостанній кадр, повертаємося до першого
            if (this.xFrame > this.heroMaxFrame - 2) {
                this.xFrame = 0;
            } else {
                // Переходимо до наступного кадру
                this.xFrame++;
            }
        }
    }

    // Метод для анімації бігу вліво
    runLeft() {
        // Малюємо кадр із спрайту бігу вліво, масштабуючи його в 1.5 рази
        ctx.drawImage(this.runLeftImg, this.sWidth * this.xFrame, 0, this.sWidth, this.sHeight, this.x, this.y, this.sWidth * 1.5, this.sHeight * 1.5);
        // Оновлюємо кадр кожні 8 ітерацій
        if (gameFrame % 8 === 0) {
            // Якщо досягнуто передостанній кадр, повертаємося до першого
            if (this.xFrame > this.runMaxFrame - 2) {
                this.xFrame = 0;
            } else {
                // Переходимо до наступного кадру
                this.xFrame++;
            }
        }
    }

    // Метод для анімації бігу вправо
    runRight() {
        // Малюємо кадр із спрайту бігу вправо, масштабуючи його в 1.5 рази
        ctx.drawImage(this.runRightImg, this.sWidth * this.xFrame, 0, this.sWidth, this.sHeight, this.x, this.y, this.sWidth * 1.5, this.sHeight * 1.5);
        // Оновлюємо кадр із частотою, заданою в this.takt
        if (gameFrame % this.takt === 0) {
            // Якщо досягнуто передостанній кадр, повертаємося до першого
            if (this.xFrame > this.runMaxFrame - 2) {
                this.xFrame = 0;
            } else {
                // Переходимо до наступного кадру
                this.xFrame++;
            }
        }
    }
}

// Клас SuperHero наслідує клас Player, додаючи функціонал атаки
class SuperHero extends Player {
    // Конструктор із початковими координатами
    constructor(x, y) {
        // Викликаємо конструктор батьківського класу
        super(x, y);
        // Перевизначаємо зображення для спокійного стану супергероя
        this.heroImg.src = imgFolder + 'idle_super_hero.png';
        // Перевизначаємо зображення для бігу вліво
        this.runLeftImg.src = imgFolder + 'run_left_superhero.png';
        // Перевизначаємо зображення для бігу вправо
        this.runRightImg.src = imgFolder + 'run_right_super_hero.png';
        // Ширина кадру для супергероя
        this.sWidth = 60;
        // Висота кадру для супергероя
        this.sHeight = 75;
        // Зображення для анімації атаки
        this.attackRightImg = new Image();
        // Джерело зображення для атаки
        this.attackRightImg.src = imgFolder + 'attack_superhero.png';
        // Ширина кадру для анімації атаки
        this.sAttackWidth = 77;
        // Висота кадру для анімації атаки
        this.sAttackHeight = 75;
        // Максимальна кількість кадрів для анімації атаки
        this.attackMaxFrame = 5;
    }

    // Метод для анімації атаки
    attack() {
        // Малюємо кадр із спрайту атаки, масштабуючи його в 1.5 рази
        ctx.drawImage(this.attackRightImg, this.sAttackWidth * this.xFrame, 0, this.sAttackWidth, this.sAttackHeight, this.x, this.y, this.sAttackWidth * 1.5, this.sAttackHeight * 1.5);
        // Оновлюємо кадр кожні 6 ітерацій
        if (gameFrame % 6 === 0) {
            // Якщо досягнуто передостанній кадр, повертаємося до першого
            if (this.xFrame > this.attackMaxFrame - 2) {
                this.xFrame = 0;
            } else {
                // Переходимо до наступного кадру
                this.xFrame++;
            }
        }
    }
}

// Клас Ghost представляє привида (ворога або NPC)
class Ghost {
    // Конструктор із фіксованими початковими координатами
    constructor() {
        // Позиція привида по осі X
        this.x = 200;
        // Позиція привида по осі Y
        this.y = 100;
        // Створюємо зображення для привида
        this.idleGhost = new Image();
        // Джерело зображення для привида
        this.idleGhost.src = imgFolder + "ghostRight.png";
        // Ширина одного кадру у спрайті
        this.sWidth = 43;
        // Висота одного кадру у спрайті
        this.sHeight = 50;
        // Поточний кадр анімації
        this.xFrame = 0;
        // Максимальна кількість кадрів у анімації
        this.maxFrame = 11;
    }

    // Метод для анімації руху привида
    move() {
        // Малюємо кадр із спрайту привида, масштабуючи його в 1.5 рази
        ctx.drawImage(this.idleGhost, this.sWidth * this.xFrame, 0, this.sWidth, this.sHeight, this.x, this.y, this.sWidth * 1.5, this.sHeight * 1.5);
        // Оновлюємо кадр кожні 6 ітерацій
        if (gameFrame % 6 === 0) {
            // Якщо досягнуто передостанній кадр, повертаємося до першого
            if (this.xFrame > this.maxFrame - 2) {
                this.xFrame = 0;
            } else {
                // Переходимо до наступного кадру
                this.xFrame++;
            }
        }
    }
}

// Створюємо екземпляр класу Player із початковою позицією (100, 100)
let player = new Player(100, 100);
// Створюємо екземпляр класу SuperHero із початковою позицією (100, 200)
let superHero = new SuperHero(100, 200);
// Створюємо екземпляр класу Ghost із початковою позицією (200, 100)
let ghost = new Ghost();

// Функція анімації, яка викликається для кожного кадру
function animate() {
    // Очищаємо canvas перед малюванням нового кадру
    ctx.clearRect(0, 0, cWidth, cHeight);
    // Викликаємо метод бігу вправо для гравця
    player.runRight();
    // Викликаємо метод атаки для супергероя
    superHero.attack();
    // Викликаємо метод руху для привида
    ghost.move();
    // Збільшуємо лічильник кадрів
    gameFrame++;
    // Запускаємо наступний кадр анімації
    requestAnimationFrame(animate);
}

// Запускаємо цикл анімації
animate();
