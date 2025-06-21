[&#8678; Класи](help.md)

---

## Синтаксис класів

Базовий синтаксис для оголошення класу в JavaScript:

```javascript
class ІмяКласу {
  constructor() {
    // код ініціалізації
  }
  
  метод1() {
    // код методу
  }
  
  метод2() {
    // код методу
  }
}
```

Наприклад, створимо простий клас `Person`:

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Привіт, мене звати ${this.name} і мені ${this.age} років.`;
  }
}

// Створення екземпляра класу
const person1 = new Person('Марія', 25);
console.log(person1.greet()); // "Привіт, мене звати Марія і мені 25 років."
```

## Конструктор

`constructor()` - це спеціальний метод класу, який викликається автоматично при створенні нового екземпляра класу (використанні оператора `new`). Він використовується для ініціалізації властивостей об'єкта.

```javascript
class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }
}

const book1 = new Book('1984', 'Джордж Орвелл', 1949);
console.log(book1.title); // "1984"
console.log(book1.author); // "Джордж Орвелл"
console.log(book1.year); // 1949
```

Особливості конструктора:
- Клас може мати лише один конструктор
- Якщо ви не визначили конструктор, створюється порожній конструктор за замовчуванням
- У конструкторі `this` посилається на створюваний екземпляр

## Методи класу

Методи класу - це функції, визначені в тілі класу, які можуть працювати з даними екземпляра.

```javascript
class Calculator {
  constructor() {
    this.result = 0;
  }
  
  add(num) {
    this.result += num;
    return this;
  }
  
  subtract(num) {
    this.result -= num;
    return this;
  }
  
  multiply(num) {
    this.result *= num;
    return this;
  }
  
  divide(num) {
    if (num === 0) {
      throw new Error('Ділення на нуль неможливе');
    }
    this.result /= num;
    return this;
  }
  
  getResult() {
    return this.result;
  }
}

const calc = new Calculator();
// Ланцюжок методів
const result = calc.add(10).subtract(2).multiply(3).divide(2).getResult();
console.log(result); // 12
```

У цьому прикладі ми використовуємо шаблон "ланцюжок методів" (method chaining), повертаючи `this` з кожного методу.

## Наслідування класів

JavaScript підтримує наслідування класів за допомогою ключового слова `extends`. Похідний клас отримує всі властивості та методи батьківського класу.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} видає звук.`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    // super() викликає конструктор батьківського класу
    super(name);
    this.breed = breed;
  }
  
  speak() {
    // Перевизначення методу батьківського класу
    return `${this.name} гавкає!`;
  }
  
  getInfo() {
    return `${this.name} - це ${this.breed}.`;
  }
}

const dog1 = new Dog('Рекс', 'німецька вівчарка');
console.log(dog1.speak()); // "Рекс гавкає!"
console.log(dog1.getInfo()); // "Рекс - це німецька вівчарка."
```

Важливі аспекти наслідування:
- Ключове слово `super()` викликає конструктор батьківського класу
- Виклик `super()` повинен бути перед будь-яким використанням `this` у конструкторі дочірнього класу
- За допомогою `super.метод()` можна викликати методи батьківського класу

## Приватні поля та методи

З ES2022 у JavaScript з'явилася офіційна підтримка приватних полів та методів, які позначаються префіксом `#`. Приватні поля доступні лише всередині класу, де вони визначені.

```javascript
class BankAccount {
  // Приватне поле
  #balance = 0;
  
  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this.#balance = initialBalance;
  }
  
  // Приватний метод
  #validateAmount(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Сума повинна бути додатнім числом');
    }
  }
  
  deposit(amount) {
    this.#validateAmount(amount);
    this.#balance += amount;
    return this.#balance;
  }
  
  withdraw(amount) {
    this.#validateAmount(amount);
    if (amount > this.#balance) {
      throw new Error('Недостатньо коштів');
    }
    this.#balance -= amount;
    return this.#balance;
  }
  
  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount('Олександр', 1000);
console.log(account.getBalance()); // 1000
account.deposit(500);
console.log(account.getBalance()); // 1500
account.withdraw(200);
console.log(account.getBalance()); // 1300

// Наступний код викине помилку, оскільки #balance є приватним
// console.log(account.#balance);
```

## Статичні методи та властивості

Статичні методи та властивості належать класу, а не його екземплярам. Вони визначаються з ключовим словом `static`.

```javascript
class MathUtils {
  static PI = 3.14159;
  
  static square(x) {
    return x * x;
  }
  
  static cube(x) {
    return x * x * x;
  }
  
  static circleArea(radius) {
    return this.PI * this.square(radius);
  }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.square(4)); // 16
console.log(MathUtils.cube(3)); // 27
console.log(MathUtils.circleArea(5)); // ~78.54

// Статичні методи не доступні екземплярам класу
const utils = new MathUtils();
// console.log(utils.square(4)); // TypeError: utils.square is not a function
```

Статичні методи часто використовуються для створення утилітарних функцій, фабричних методів або операцій, які не потребують стану екземпляра.

## Гетери та сетери

Гетери (getters) та сетери (setters) - це спеціальні методи, які дозволяють контролювати доступ до властивостей об'єкта. Вони визначаються за допомогою ключових слів `get` і `set`.

```javascript
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }
  
  get celsius() {
    return this._celsius;
  }
  
  set celsius(value) {
    if (value < -273.15) {
      throw new Error('Температура не може бути нижчою за абсолютний нуль');
    }
    this._celsius = value;
  }
  
  get fahrenheit() {
    return this._celsius * 9/5 + 32;
  }
  
  set fahrenheit(value) {
    this.celsius = (value - 32) * 5/9;
  }
}

const temp = new Temperature(25);
console.log(temp.celsius); // 25
console.log(temp.fahrenheit); // 77

temp.celsius = 30;
console.log(temp.celsius); // 30
console.log(temp.fahrenheit); // 86

temp.fahrenheit = 50;
console.log(temp.celsius); // 10
console.log(temp.fahrenheit); // 50

// Викине помилку: Температура не може бути нижчою за абсолютний нуль
// temp.celsius = -300;
```

Гетери та сетери дозволяють:
- Валідувати дані перед встановленням
- Обчислювати значення на льоту
- Керувати доступом до внутрішніх властивостей
- Реалізовувати взаємозалежні властивості

## Порівняння з функціями-конструкторами

До появи класів в ES6, об'єкти в JavaScript створювались за допомогою функцій-конструкторів та прототипів. Ось порівняння двох підходів:

```javascript
// Функція-конструктор
function PersonConstructor(name, age) {
  this.name = name;
  this.age = age;
}

PersonConstructor.prototype.greet = function() {
  return `Привіт, мене звати ${this.name} і мені ${this.age} років.`;
};

// Клас ES6
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Привіт, мене звати ${this.name} і мені ${this.age} років.`;
  }
}

// Використання обох підходів
const person1 = new PersonConstructor('Іван', 30);
const person2 = new PersonClass('Марія', 25);

console.log(person1.greet()); // "Привіт, мене звати Іван і мені 30 років."
console.log(person2.greet()); // "Привіт, мене звати Марія і мені 25 років."
```

Основні відмінності:
1. Синтаксис: класи мають більш чіткий та інтуїтивно зрозумілий синтаксис
2. Наслідування: з класами наслідування реалізується простіше через `extends`
3. Методи: в класах методи автоматично додаються до прототипу
4. Виклик без `new`: класи завжди вимагають оператор `new`, функції-конструктори можуть викликатись без нього (що приводить до помилок)

---

[&#8678; Класи](help.md)

