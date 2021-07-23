const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const clockSecond = document.querySelector(".second");
const clockState = document.querySelector(".clock");

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerHTML = `${hours < 12 ? hours : `${hours - 12}`}:${minutes < 10 ? `0${minutes}` : minutes}`;
    clockSecond.innerHTML = `${seconds < 10 ? `0${seconds}` : seconds}`;
    clockState.innerHTML = hours < 12 ? "AM" : "PM";

}

function init() {
    setInterval(getTime, 1000);
}

init();