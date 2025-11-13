import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

let arrSimbols = [`!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`,
    `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, ' \ ', `]`, `^`, `_`, `{`, `|`, `}`, `~`, '`',]
let randomPassword;


let value;
let password
let big_Letters
let smole_Letters
const inp_Password = document.getElementById('password')




inp_Password.addEventListener('input', () => {
    setTimeout(() => {
        big_Letters = inp_Password.value.toUpperCase().split('')
        smole_Letters = inp_Password.value.split('')
        password = inp_Password.value.split('')
        includesNums(password)
        processing_Password(password)
        upper_lowerLeters(password)
        includesSimbols(password)
        if (inp_Password.value !== '') {
            checkResult(value)
        }
    }, 100);
})

let arrNums = []
function filterArray() {
    setTimeout(() => {
    }, 5000);
    for (let i = 0; i < 10; i++) {
        arrNums.push(String(i))
    }


}
filterArray()


let firstcriteria, secondcriteria, thirdcriteria, fourthcriteria
let arrRules = [document.getElementById('minSimbols'),
document.getElementById('big_Letters'),
document.getElementById('nums'),
document.getElementById('special_Characters')]
let minSimbols = 8

function processing_Password(password) {

    if (password.length >= minSimbols) {
        arrRules[0].classList.add('true')
        firstcriteria = true
    }
    else {
        arrRules[0].classList.remove('true')
        firstcriteria = false
    }
}

function upper_lowerLeters(password) {
    let big = false
    let smole = false

    for (let i = 0; i < password.length; i++) {
        if (big_Letters.includes(arrNums[i]) || smole_Letters.includes(arrNums[i])) {
            big_Letters = big_Letters.filter(a => a !== arrNums[i])
            smole_Letters = smole_Letters.filter(a => a !== arrNums[i])
        }
    }
    for (let i = 0; i < password.length + 1; i++) {
        if (password.includes(big_Letters[i])) {
            big = true
        }
        else if (password.includes(smole_Letters[i])) {
            smole = true
        }
    }
    if (big === true && smole === true) {
        arrRules[1].classList.add('true')
        secondcriteria = true
    } else {
        arrRules[1].classList.remove('true')
        secondcriteria = false
    }
}

function includesNums(password) {
    let numIncl = false
    for (let i = 0; i < password.length; i++) {
        if (arrNums.includes(password[i])) {
            numIncl = true;
        }
    }
    if (numIncl === true) {
        arrRules[2].classList.add('true')
        thirdcriteria = true
    } else {
        arrRules[2].classList.remove('true')
        thirdcriteria = false
    }
}

function includesSimbols(password) {
    let simbol = false;
    for (let i = 0; i < password.length; i++) {
        if (arrSimbols.includes(password[i])) {
            simbol = true;
        }
    }

    if (simbol === true) {
        arrRules[3].classList.add('true')
        fourthcriteria = true
    } else {
        arrRules[3].classList.remove('true')
        fourthcriteria = false
    }
}

const btnShow = document.getElementById('show_close')
let show = false;
btnShow.addEventListener('click', () => {
    setTimeout(() => {
        if (show !== true) {
            btnShow.innerHTML = 'Приховати пароль'
            inp_Password.type = 'text'
            show = true;
        } else {
            btnShow.innerHTML = 'Показати пароль'
            inp_Password.type = 'password'
            show = false;
        }
        console.log(inp_Password.type)
    }, 500);

})

let result = document.getElementById('result')

function checkResult() {
    setTimeout(() => {
        if (firstcriteria && secondcriteria && thirdcriteria && fourthcriteria) {
            result.innerHTML = `Ваш пароль відповідає всім критеріям👍`
            result.style.color = 'rgba(18, 213, 18, 0.792)'
            value = true
        } else {
            result.innerHTML = `Ваш пароль не дуже надійний`
            result.style.color = '#ef4444'
            value = false
        }
    }, 1000);
}


const generationPassword = document.getElementById('generation_Password')

let arrRandom_passwords = []
function generationRandom() {
    let arrPassword;

    for (let i = 0; i < 100; i++) {
        randomPassword = nanoid(9)
        arrPassword = randomPassword.split('')

        let simbol = arrPassword.filter(a => arrSimbols.includes(a))
        let nums = arrPassword.filter(a => arrNums.includes(a))

        if (simbol.length > 0 && nums.length > 0) {
            arrRandom_passwords.push(arrPassword)
        }
        console.log(simbol, arrPassword)
    }
    console.log(arrRandom_passwords)

    let randomRealible = Math.floor(Math.random(arrRandom_passwords) * arrRandom_passwords.length)
    let reliableRandom_password = arrRandom_passwords[randomRealible].join('')

    console.log(`Рандомний надійний пароль- ${reliableRandom_password}`)
    generationPassword.addEventListener('click', () => {
        inp_Password.value =``;
        setTimeout(() => {
            inp_Password.value = reliableRandom_password
            password = reliableRandom_password.split('')
            smole_Letters = reliableRandom_password.split('')
            big_Letters = reliableRandom_password.toUpperCase().split('')
            includesNums(password)
            processing_Password(password)
            upper_lowerLeters(password)
            includesSimbols(password)

            checkResult(value)
        }, 500);
    })
}

generationRandom()
