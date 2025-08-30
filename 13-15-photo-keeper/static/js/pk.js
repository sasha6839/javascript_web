console.log('start');


class MainMenu {
    constructor() {
        this.numbers = [];
    }

    addNumber(num) {
        if (typeof num === 'number') {
            this.numbers.push(num);
        }
    }

    removeNumber(num) {
        this.numbers = this.numbers.filter(n => n !== num);
    }

    countTagCharacters(tagName) {
        const element = document.querySelector(tagName);
        if (element && element.textContent) {
            return element.textContent.length;
        }
        return 0;
    }
    multiplyNumbers(a, b) {
       return a * b;
    }
    divideNumbers(a, b) {
       if (b === 0) {
           return null; // Avoid division by zero
       }
       return a / b;
    }   


}