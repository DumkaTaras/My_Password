import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

let arrSimbols = [`!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`,
    `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `\\`, `]`, `^`, `_`, `{`, `|`, `}`, `~`, '`']
let lowercase = 'abcdefghijklmnopqrstuvwxyz';
let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let numbers = '0123456789';
let symbols = arrSimbols.join('');
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
    }, 300);

        if (inp_Password.value !== '') {
        checkResult(value)
    }
    else {
        result.textContent = ``;
    }
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
    let hasUpper = password.some(char => char >= 'A' && char <= 'Z');
    let hasLower = password.some(char => char >= 'a' && char <= 'z');
    if (hasUpper && hasLower) {
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
        if (inp_Password.value != `` && firstcriteria && secondcriteria && thirdcriteria && fourthcriteria) {
            result.innerHTML = `Ваш пароль відповідає всім критеріям👍`
            result.style.color = 'rgba(18, 213, 18, 0.792)'
            value = true
        }
         else {
            result.innerHTML = `Ваш пароль не дуже надійний`
            result.style.color = '#ef4444'
            value = false
        }
    }, 100);
}


const generationPassword = document.getElementById('generation_Password')

let length_generationPasword = document.querySelector(".passwordLength");
let par_Length = document.querySelector(".N_length");
par_Length.textContent = length_generationPasword.value


console.log(length_generationPasword);

function generatePassword(length) {
    if (length < 8) length = 8;
    let password = '';
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    let allChars = lowercase + uppercase + numbers + symbols;
    for (let i = 4; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    return password;
}

length_generationPasword.addEventListener('input',(event)=>{
    par_Length.textContent = event.target.value;
})

generationPassword.addEventListener('click', () => {
    let newPassword = generatePassword(Number(length_generationPasword.value));
    inp_Password.value = newPassword;
    password = newPassword.split('');
    smole_Letters = newPassword.split('');
    big_Letters = newPassword.toUpperCase().split('');
    includesNums(password);
    processing_Password(password);
    upper_lowerLeters(password);
    includesSimbols(password);
    checkResult();
});
