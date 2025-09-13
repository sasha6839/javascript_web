const cardsArray = [{ name: 'bullbasaur', img: 'bullbasaur.png' },
	{ name: 'charmander', img: 'charmander.png' },
	{ name: 'eevee', img: 'eevee.png' },
	{ name: 'pikachu', img: 'pikachu.png' },
	{ name: 'psyduck', img: 'psyduck.png' },
	{ name: 'squirtle', img: 'squirtle.png' },
	{ name: 'bullbasaur', img: 'bullbasaur.png' },
	{ name: 'charmander', img: 'charmander.png' },
	{ name: 'eevee', img: 'eevee.png' },
	{ name: 'pikachu', img: 'pikachu.png' },
	{ name: 'psyduck', img: 'psyduck.png' },
	{ name: 'squirtle', img: 'squirtle.png' }
]

cardsArray.sort(() => Math.random() - 0.5)

const backImg = 'pokeball.jpg'
const winImg = 'pokecoin.jpg'
const grid = document.querySelector('.grid')
let countResult = 0
const result = document.querySelector('#result')


function createBoard(number, backImg, board) {
	for (let i = 0; i < number; i++) {
		let card = document.createElement('img')
		card.setAttribute('src', backImg)
		card.setAttribute('id', i)
		card.onclick = flipCard
		board.append(card)
	}
}

let cardsChosenId = []
function flipCard() {
	id = this.getAttribute('id')
	cardsChosenId.push(id)
	this.setAttribute('src', cardsArray[id].img)
	if (cardsChosenId.length === 2) {
		setTimeout(checkCards, 200)
	}
}

function checkCards() {
	let cardChosenFirst = document.getElementById(cardsChosenId[0])
	let cardChosenSecond = document.getElementById(cardsChosenId[1])
	if (cardChosenFirst.getAttribute('src') === cardChosenSecond.getAttribute('src') && cardsChosenId[0] != cardsChosenId[1]) {
		alert('Вітаю! Є пара!')
		cardChosenFirst.setAttribute('src', winImg)
		cardChosenSecond.setAttribute('src', winImg)
		cardChosenFirst.onclick = ''
		cardChosenSecond.onclick = ''
		countResult++
		result.textContent = countResult
		if (countResult === cardsArray.length / 2) {
			alert('Дякую, гру закінчено!')
		}

	} else {
		alert('Потрібно шукати далі')
		cardChosenFirst.setAttribute('src', backImg)
		cardChosenSecond.setAttribute('src', backImg)
	}
	cardsChosenId = []
}

createBoard(cardsArray.length, backImg, grid)