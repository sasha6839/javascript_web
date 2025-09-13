const users = [
	{ login: '1', password: '1', type: 'VIP', sale: 15 },
	{ login: '2', password: '2', type: 'publick', sale: 5 }
]

const products = [{ name: 'Daenerys Sitting on Throne', price: 512, img: 'daenerys.jpeg', type: 'publick' },
	{ name: 'Fawkes Vinyl Figure', price: 312, img: 'fawkes.jpeg', type: 'VIP' },
	{ name: 'Flash Vinyl Figure', price: 645, img: 'flash.jpeg', type: 'publick' },
	{ name: 'Kakashi', price: 700, img: 'kakashi.jpeg', type: 'VIP' },
	{ name: 'The Mandalorian on Blurg', price: 400, img: 'mandalorian.jpeg', type: 'publick' },
	{ name: 'Naruto', price: 639, img: 'naruto.jpeg', type: 'VIP' },
	{ name: 'Rey Vinyl Figure', price: 138, img: 'rey.jpeg', type: 'publick' },
	{ name: 'Steve Trevor Vinyl Figure', price: 138, img: 'steve.jpeg', type: 'publick' },
	{ name: 'Moana Te Ka', price: 211, img: 'te_ka.jpeg', type: 'publick' }
]

let enteredLogin
let enterdPassword
let enterdUserSale
let enterdUserType

function userVerification(login, password, array) {
	for (let i = 0; i < array.length; i++) {
		if (array[i].login === login && array[i].password === password) {
			return i += 1
			console.log(i)
		}
	}
	console.log(0)
	return 0
}

function priceWithSale(price, sale) {
	return price - price * sale / 100
}

if (confirm('Ви зареєстрований користувач?')) {
	enteredLogin = prompt('Введіть ваш логін')
	enterdPassword = prompt('Введіть ваш пароль')
	let id = userVerification(enteredLogin, enterdPassword, users)
	console.log(id)
	if (id) {
		enterdUserSale = users[id - 1].sale
		enterdUserType = users[id - 1].type
	}
	else {
		alert('Такий користувач не знайдений!')
		enterdUserSale = 0
		enterdUserType = 'publick'
	}
} else {
	enterdUserSale = 0
	enterdUserType = 'publick'
}

let header = '<header><h1>Funko</h1></header>'
let productList = '<section><h2>Новинки</h2><ul class="productList">'

for (let i = 0; i < products.length; i++) {
	if (!(enterdUserType === 'publick' && products[i].type === 'VIP')) {
		productList += '<li><img src="' + products[i].img + '"><br>' + products[i].name +
			'<div class="price">' + priceWithSale(products[i].price, enterdUserSale) + ' грн</div></li>'
	}
}

productList += '</ul></section>'
document.body.innerHTML = header + productList
