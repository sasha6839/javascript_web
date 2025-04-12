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
]

let modalWindowHelp = document.getElementsByClassName('modal-help')[0];
console.log('modal-help=', modalWindowHelp)

let buttons = modalWindowHelp.getElementsByTagName('button');
console.log('button=', buttons)

for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function(e) {
        modalWindowHelp.style.display = 'none';
    }
}
// let r
// let a = [

// ]

// for (let i = 0; i < 12; i++) {
//     r = Math.floor(Math.random());
//     a[i] = cards[r];
//     console.log(a)
// }