const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greeting');
const user = document.querySelector(".name");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

/* 사용자의 이름을 받아와서, local storage에 저장한다 */
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    //event가 default 못하게 한다
    event.preventDefault();

    const currentValue = input.value;
    console.log(currentValue);

    paintGreeting(currentValue);

    saveName(currentValue);
}

/* 사용자 데이터가 */

/* 없을 때 */
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener('submit', handleSubmit);
}

/* 있을 때 */
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    user.innerHTML = `Hello, ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();