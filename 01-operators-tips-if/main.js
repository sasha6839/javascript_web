const LABEL_NAME = [
    "Як звати тебе?", 
    "Тебе то як звати?", 
    "Ім'я твоє яке, юний падаван?",
    "Хто ти такий, малий?",
    "Як назвали тебе батьки твої?",
    "Ім'я твоє, скажи мені, юний учню Сили?"
];

const LABEL_AGE = [
    "Готовий чи ти, юний падаване? І скільки літ минуло з твого народження?",
    "Готовий до випробувань? Скільки циклів обернулося навколо сонця з часу твого появлення?",
    "Готовий чи ти до шляху? Скільки років просипалося через пісочний годинник твого життя?",
    "Чи готовий ти до завдання? Скільки зим і літ бачив ти?" ,
    "Чи готовий ти до випробувань? Скільки років згасло з часу твого народження?",
    "Чи готовий ти до подорожі? Скільки зустріло твоє око років з моменту зявлення?",
    "Чи готовий ти до бою? Скільки років бачив ти на небі?",
    "Чи готовий ти до знань? Скільки років прочикав ти?",
    "Чи готовий ти до відповідальності? Скільки років прийняв ти самостійно?",    
    'Чи готовий ти? Маєш років скільки?'
];



// отримати дані від користувача - prompt
let randomLabelName = Math.floor(Math.random() * LABEL_NAME.length)
let userName = prompt(LABEL_NAME[randomLabelName]);

let randomLabelAge = Math.floor(Math.random() * LABEL_AGE.length)
let userAge = prompt(LABEL_AGE[randomLabelAge]);


const MESSAGE_TRUE = [
    "Падаван "+userName+", Істинно прекрасним розум дитини є! Не вистачає "+userAge+" років, рости тобі ще.",
    "О, "+userName+", падаване, розум твій сяє, як зірка ясна. Але шлях "+userAge+" років довгий попереду, вчитися ще багато треба тобі.",
    "Мозок твій, юний учню "+userName+", гострий як меч. Але мудрість приходить з досвідом "+userAge+" років, а не лише з розумом.",
    "Далеко зайшов ти, "+userName+", але вершини ще не досяг. Терпіння та наполегливість "+userAge+" років - ось ключ до успіху.",
    "Світло розуму твого сяє, юний падаване. Але, ще "+userAge+" років "+userName+" Сила не тільки в знаннях, а й у серці."
];
const MESSAGE_FALSE = [
    "Рахувти ти не вмієш, далеко тобі до сили Джедая",
    "Що за нерозумне, математики тут не знаєш, не бачити тобі сили",
    "О..оо, ти зявився чого сюди, науки іди вчитися людської. Цифри зрозумій!."
];


let r, message = '';

if (isNaN(userAge)) {
    r = Math.floor(Math.random() * MESSAGE_FALSE.length);
    message = MESSAGE_FALSE[r]
} else {
    r = Math.floor(Math.random() * MESSAGE_TRUE.length);
    message = MESSAGE_TRUE[r]
};

let jedi = document.getElementById('jedi')
jedi.innerHTML = message