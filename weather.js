const weather = document.querySelector(".js-weather .info");
const icon = document.querySelector(".js-weather .icon");

const API_KEY = "192879c0c04e03cc3c1bf6c3eda9476d";
const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(
        // API를 가져온다.
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function(response) {
            // JSON 파일을 가져온다.
            return response.json()
        }).then(function(json) {
            // JSON 파일에서 필요한 data를 사용한다.
            const temperature = json.main.temp;
            const place = json.name;
            const icon_url = "http://openweathermap.org/img/wn/" + json.weather[0].icon + ".png"
            weather.innerText = `${temperature}℃ ${place}`;
            icon.src = icon_url;
        })
} 

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,   //latitude = latitude
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {    //getWeather
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();