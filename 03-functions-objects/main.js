const users = [
    {login: "1", password: "1", type: 'VIP', sale: 20}
    {login: "sanya", password: "123", type: 'registerd', sale: 5}
    {login: "2", password: "2", type: 'VIP', sale: 20}
    {login: "3", password: "3", type: 'VIP', sale: 20}
];

const products = [
    { name: 'Daenerys Sitting on Throne', price: 512, img: 'daenerys.jpeg',    type: 'public' },
    { name: 'Fawkes Vinyl Figure',        price: 312, img: 'fawkes.jpeg',      type: 'VIP' },
    { name: 'Flash Vinyl Figure',         price: 645, img: 'flash.jpeg',       type: 'public' },
    { name: 'Kakashi',                    price: 700, img: 'kakashi.jpeg',     type: 'VIP' },
    { name: 'The Mandalorian on Blurg',   price: 400, img: 'mandalorian.jpeg', type: 'public' },
    { name: 'Naruto',                     price: 639, img: 'naruto.jpeg',      type: 'VIP' },
    { name: 'Rey Vinyl Figure',           price: 138, img: 'rey.jpeg',         type: 'public' },
    { name: 'Steve Trevor Vinyl Figure',  price: 138, img: 'steve.jpeg',       type: 'public' },
    { name: 'Moana Te Ka',                price: 211, img: 'te_ka.jpeg',       type: 'public' }
];

function userVerification(login,password) {
    for (let i = 0; i < users.length; i++){
        if(login === users[i].login && password === users[i].password)
            return users[i]
    }
    return {}
}

let userRegistered = 'public';
let yuserLogin;
let userPassword;
let user = {}

if (confirm("Ви зареєстрований користувач?")) {
    userLogin = promt("Введіть логін:")
    userPassword = promt("Введіть пароль:")
    user = userVerification(userLogin, userPassword)
}

console.log(user);