const LABEL_NAME = [
    "Як звати тебе?", 
    "Тебе то як звати?", 
    "Ім'я твоє яке, юний падаван?",
    "Хто ти такий, малий?",
    "Як назвали тебе батьки твої?",
    "Ім'я твоє, скажи мені, юний учню Сили?"
];

// отримати дані від користувача - prompt
let randomLabelName = Math.floor(Math.random() * LABEL_NAME.length)
let userName = prompt(LABEL_NAME[randomLabelName]);