const COORDS = 'coords';
const weather = document.querySelector('.js-weather');

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${config.weather}&units=metric`)
        .then(response=>{
            return response.json();
        })
        .then(json=>{
            console.log(json);
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature}℃ @ ${place}`;
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const coordsObj ={
        lat:lat,
        lng:lng
    };
    saveCoords(coordsObj);
    getWeather(lat,lng);
}

function handleGeoError(){
    alert('Error, Would you change the URL to "https"://www.han.codes/Momentum_clone/');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const Coords = localStorage.getItem(COORDS);
    if(Coords === null){
        askForCoords();
    }
    else{
        const parsedCoords = JSON.parse(Coords);
        getWeather(parsedCoords.lat, parsedCoords.lng);
    }
}

function init(){
    loadCoords();
}

init();