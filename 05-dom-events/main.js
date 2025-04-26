const cards = [
    {name:'bullbasaur', img:'bullbasaur.png'},
    {name:'charmander', img:'charmander.png'},
    {name:'eevee', img:'eevee.png'},
    {name:'pikachu', img:'pikachu.png'},
    {name:'psyduck', img:'psyduck.png'},
    {name:'squirtle', img:'squirtle.png'},
    
    {name:'bullbasaur', img:'bullbasaur.png'},
    {name:'charmander', img:'charmander.png'},
    {name:'eevee', img:'eevee.png'},
    {name:'pikachu', img:'pikachu.png'},
    {name:'psyduck', img:'psyduck.png'},
    {name:'squirtle', img:'squirtle.png'},
];

// Отримати вікно допомого - B1

let modalWindowHelp = document.getElementsByClassName('modal-help')[0];
console.log('modal-help=', modalWindowHelp);

let buttons = modalWindowHelp.getElementsByTagName('button');
console.log('button=', buttons);

for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function(e) {
        modalWindowHelp.style.display = 'none';
    }     
}

// отримати кнопку відкрити допомогу - B2
let btnOpenHelp = document.querySelector('main button')
console.log(btnOpenHelp)
btnOpenHelp.onclick = function(){
    modalWindowHelp.style.display = 'flex';
}

let board  = document.getElementById('board');
let cardsChosenId = []

function cardFlip() {
    let id = this.getAttribute('id');
    console.log(id)

    if (cardsChosenId.length <=2)
        cardsChosenId.push(id)

    this.setAttribute('src', 'images/' + cards[id].img)

    if (cardsChosenId.length == 2)
        setTimeout(checkCards, 300)
}

function createBoard(curentCards, backgroundImage='') {
    for (let i = 0; i < curentCards.length; i++) {
        let img = document.createElement('img')        
        
        if (backgroundImage)
            img.setAttribute('src', backgroundImage)
        else     
            img.setAttribute('src', 'images/' + curentCards[i].img)
        
        img.onclick = cardFlip;
        img.setAttribute('id', i);
        img.setAttribute('sasha', '№' + i)
        board.append(img);
    }
}

createBoard(cards, 'images/pokeball.jpg')


function checkCards() {
    let card1 = document.getElementById(cardsChosenId[0])
    let card2 = document.getElementById(cardsChosenId[1])

    if(card1.getAttribute('src') == card2.getAttribute('src')){
        card1.setAttribute('src', 'images/pokecoin.jpg')
        card2.setAttribute('src', 'images/pokecoin.jpg')
        card1.onclick = ''
        card1.onclick = ''
    } else {
        card1.setAttribute('src', 'images/pokeball.jpg')
        card2.setAttribute('src', 'images/pokeball.jpg')
    }

    cardsChosenId = []
}