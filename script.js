var apiKey = 'a34c2b8d2c8d04d52a0bced017c36070';
var formEl = $('#form');
var todaysWeather = $('#currentWeather');
var forcast = $('#5day');
var searchHistory = [];
var historyEl = $('#history');
var currentPicEl = $('#icon');


function weather(city){
   var apiQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

   fetch(apiQuery).then(function (response) {
    return response.json();
}).then(function (data) {
    console.log("Current Weather: ", data);

    let todaysDate = new Date(data.dt*1000);
            console.log(todaysDate);
            let day = todaysDate.getDate();
            let month = todaysDate.getMonth() + 1;
            let year = todaysDate.getFullYear();
            $('#location').text(data.name + " (" + month + "/ " + day + "/ " + year + ") ");
            let iconPic = data.weather[0].icon;
            currentPicEl.prop("src","https://openweathermap.org/img/wn/" + iconPic + "@2x.png");
            currentPicEl.prop("alt", data.weather[0].description);
            $('#currentTemp').text("Temperature: " + Math.round(convertTemp(data.main.temp)) + " &#176F");
            $('#currentHumidity').text("Humidity: " + data.main.humidity + "%");
            $('#currentWindSpeed').text("Wind Speed: " + data.wind.speed + " MPH");
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    forecastedWeather(lat, lon)

})
}

function forecastedWeather(lat, lon){
    console.log(lat, lon);
    var apiQuery = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(apiQuery).then(function (response) {
     return response.json();
 }).then(function (data) {

    for (let i= 0; i < 5; i++) {
        console.log(i);
        let j = i + (i*7);
        let dayData = data.list[j];
        console.log(dayData);
        let todaysDate = new Date(dayData.dt*1000)
        let day = todaysDate.getDate();
        let month = todaysDate.getMonth() + 1;
        let year = todaysDate.getFullYear();
        let theTemp = Math.round(convertTemp(dayData.main.temp));
        let iconPic = "https://openweathermap.org/img/wn/" + dayData.weather[0].icon + "@2x.png";
        let dayTime = month + '/ ' + day + '/ ' + year;
        let dayWind = dayData.wind.speed;
        let dayHumid = dayData.main.humidity;
        let forecastAlt = dayData.weather[0].description;

        let divEl1 = document.createElement("div");
        divEl1.className = "card";
        console.log(divEl1);
        

        let imgEl = document.createElement("img");
        imgEl.src = iconPic;
        imgEl.alt = forecastAlt;
        imgEl.className = "card-img-top";
        console.log(imgEl);

        let divEl2 = document.createElement("div");
        divEl2.className = "card-body";
        console.log(divEl2);

        let titleEl = document.createElement("h5");
        titleEl.textContent = dayTime;
        console.log(titleEl)

        let tempEl = document.createElement("p");
        tempEl.textContent = 'Temperature: ' + theTemp + 'F';
        console.log(tempEl);

        let windEl = document.createElement("p");
        windEl.textContent = 'Wind Speed: ' + dayData.wind.speed + 'MPH';
        console.log(windEl);

        let humidEl = document.createElement("p");
        humidEl.textContent = 'Humidity: ' + dayData.main.humidity + '%';
        console.log(humidEl);

        console.log($('.forecast'));

        document.getElementById('forecast').appendChild(divEl1);
        divEl1.append(imgEl);
        divEl1.append(divEl2);
        divEl2.append(titleEl);
        divEl2.append(tempEl);
        divEl2.append(windEl);
        divEl2.append(humidEl);         
        
    }
      
        
    })

}

/** 
let divEl1 = '<div class="card"></div>';
let imgEl = '<img src="' + iconPic + '" class="card-img-top" alt="' + dayData.weather[0].description +  '"></img>';
let divEl2 = '<div class="card-body"></div>';
let titleEl = '<h5> ' + month + '/ ' + day + '/ ' + year + ' </h5>';
let tempEl = '<p>Temperature: ' + theTemp + 'F</p>';
let windEl = '<p>Wind Speed: ' + dayData.wind.speed + 'MPH' + '</p>';
let humidEl = '<p>Humidity: ' + dayData.main.humidity + '%'+ '</p>';

$('#5day').append(divEl1);
divEl1.append(imgEl);
divEl1.append(divEl2);
divEl2.append(titleEl);
divEl2.append(tempEl);
divEl2.append(windEl);
divEl2.append(humidEl);
/** 
<div>
<img class="photo" src="" class="card-img-top" alt="">
<div class="card-body">
  <h5 class="today">Today's Weather</h5>
  <p class="temperature">Temperature</p>
  <p class="windSpeed">Wind Speed</p>
  <p class="humidity">Humidity</p>
</div>
</div>
*/

 /** 
        todayEl[i].text(month + "/ " + day + "/ " + year);
        photoEl[i].prop("src","https://openweathermap.org/img/wn/" + iconPic + "@2x.png");
        photoEl[i].prop("alt", dayData.weather[0].description);
        temperatureEl[i].text("Temperature: " + theTemp + "F");
        humidityEl[i].text("Humidity: " + dayData.main.humidity + "%");
        windSpeedEl[i].text("Wind Speed: " + dayData.wind.speed + " MPH"); 
        */


 
formEl.on('submit', function(e){
    e.preventDefault();
    let searchCity = $('#citySearch').val();
    console.log(searchCity);
    searchHistory.push(searchCity);
    console.log(searchHistory);
    localStorage.setItem('search', searchHistory);
    weather(searchCity);
}
)

function showHistory(){
    let history = localStorage.getItem('search');
    for (let i = 0; i < history.length; i++) {
        var buttonEl = '<button type="button" class="btn btn-primary w-100 my-2">'+ history[i] + '</button>';
        historyEl.append(buttonEl);
        }
        historyEl.on('click', function(){
            weather(buttonEl.val());
        }
        )
        
    }

 $("#clearHistory").on("click",function() {
        searchHistory = [];
        localStorage.removeItem('search');
        showHistory();
        return searchHistory;
    })


function convertTemp(temp){
    let farenheit = (temp-273.15)*1.8 + 32
    return farenheit;
}
