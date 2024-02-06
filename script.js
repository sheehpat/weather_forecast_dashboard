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

    let todaysDate = new Date(response.data.dt*1000);
            console.log(todaysDate);
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();
            $('#location').text = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            let iconPic = response.data.weather[0].icon;
            currentPicEl.prop("src","https://openweathermap.org/img/wn/" + iconPic + "@2x.png");
            currentPicEl.prop("alt",response.data.weather[0].description);
            $('#currentTemp').text = "Temperature: " + convertTemp(response.data.main.temp) + " &#176F";
            $('#currentHumidity').text = "Humidity: " + response.data.main.humidity + "%";
            $('#currentWindSpeed').text = "Wind Speed: " + response.data.wind.speed + " MPH";
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    forecastedWeather(lat, lon)

})
}

function forecastedWeather(lat, lon){
    var apiQuery = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(apiQuery).then(function (response) {
     return response.json();
 }).then(function (data) {

})
}

formEl.on('submit', function(){
    var searchCity = $('#citySearch').value;
    weather(searchCity);
    searchHistory = searchHistory.push(searchCity);
    localStorage.setItem('search', searchHistory);
}
)

function showHistory(){
    let history = localStorage.getItem('search');
    for (let i = 0; i < history.length; i++) {
        var buttonEl = '<button type="button" class="btn btn-primary w-100 my-2">'+ history[i] + '</button>';
        historyEl.append(buttonEl);
        }
        historyEl.on('click', function(){
            weather(buttonEl.value);
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