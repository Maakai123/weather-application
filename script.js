const inputEl = document.querySelector('.input')
const inputBtn = document.querySelector('.search-icon');
const time = document.querySelector('.time');
const parentDiv = document.querySelector('.section-hero')
const selectElement = document.querySelector('.select-id');
let temperatureUnit = 'C'





let currentDate = new Date();
console.log(currentDate)


let hour = currentDate.getHours();
let minute = currentDate.getMinutes();
let second = currentDate.getSeconds();




 
//when i click on button, show value
inputBtn.addEventListener('click', function(){
   const input = inputEl.value;
    

   //Clear wather 

   parentDiv.innerHTML = ''

    //call weather with input values

    weather(input)
})

//get weather api
const weather  = async function(country) {
    try {
     const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=7375b017c171402c9b8111917230112&q=${country}`)
     const data = await response.json()
     console.log(data)
     console.log(data.current.condition.text)
     console.log(data.current.feelslike_c)
     

     if(!response.ok) throw new Error(`${data.message}  (${response.status})`)

     let limitTemperature = 25;


     //handle change in C and F
     let temperatureValue = temperatureUnit ? data.current.feelslike_c : data.current.feelslike_f;
     
     let imageSource = temperatureValue >= limitTemperature
     // let imageSource = data.current.feelslike_c >= limitTemperature
            ? 'img/SunnyDayV3.svg'
            : 'img/PartlyCloudyNightV2.svg';


            selectElement.addEventListener('change', function () {
                // Update the temperature unit based on the selected option
                temperatureUnit = this.value === '°C' ? 'C' : 'F';
                console.log(temperatureUnit)
            
                // Re-fetch weather data with the updated temperature unit
                const input = inputEl.value;
                weather(input);
            });
    
     const html = `
     <h1 class="location-name"> ${data.location.name}, ${data.location.region} ${data.location.country}<span class="time"><h1>${hour} : ${minute} : ${second}</h1></span></h1>
    <div class="hero">
        <div class="weather-div">
        
            <h1 class="current-weather">Current Weather</h1>
            <ul class="list">
                <li class="list-item">
                    <img src="${imageSource}">
                    <span class="span">${data.current.condition.text}, ${temperatureValue}<span>°${temperatureUnit}</span>
                </li>

                <li class="list-item">
                   <h5>${data.current.condition.text}, <span>Feels like ${temperatureValue} °${temperatureUnit}</span></h5>
                    
                </li>
            </ul>
            <p>There will be mostly ${data.current.condition.text}. The high will be ${temperatureValue} °${temperatureUnit}.</p>
        </div>


        <div class="weather-div">
        
            <h1 class="current-weather">Location Map</h1>
            
            <div id="map"></div>
        </div>
    </div>
     `

     parentDiv.insertAdjacentHTML('afterbegin', html)

     const latitude = data.location.lat;
     const longitude = data.location.lon;
     getCoordinates(latitude, longitude)
    } catch (error) {
        alert(`${error.message}`);
    }
}
    

const  getCoordinates = function( latitude, longitude) {


    const coords = [latitude, longitude]

        const map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(coords).addTo(map)
        .bindPopup('CAPITAL')
        .openPopup();


    }

/*
if(navigator.geolocation)
 navigator.geolocation.getCurrentPosition(
    function(position){
     
    const {latitude} = position.coords;
    const {longitude} = position.coords;
    console.log(latitude, longitude)

    const coords = [latitude, longitude]

        const map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(coords).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
    },

   

 function(){
    alert('Could not get your position')
 })
*/