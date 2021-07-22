const form = document.querySelector('.js-form');
// form이 interface라면, formData가 맞는 것 아닌가 ?
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greeting');

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

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener('submit', handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello ${text}`;
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