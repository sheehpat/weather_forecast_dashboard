var apiKey = 'a34c2b8d2c8d04d52a0bced017c36070';
var formEl = $('#form');
var todaysWeather = $('#currentWeather');
var forecast = $('#forecast');
var searchHistory = [];
var historyEl = $('#history');
var currentPicEl = $('#icon');


function weather(city){
   var apiQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

   fetch(apiQuery).then(function (response) {
    return response.json();
}).then(function (data) {
    console.log("Current Weather: ", data);
//Converts JSON data in usable formats for inputting into the DOM
    let todaysDate = new Date(data.dt*1000);
            console.log(todaysDate);
            let day = todaysDate.getDate();
            let month = todaysDate.getMonth() + 1;
            let year = todaysDate.getFullYear();
            $('#location').text(data.name + " (" + month + "/ " + day + "/ " + year + ") ");
            let iconPic = data.weather[0].icon;
            currentPicEl.prop("src","https://openweathermap.org/img/wn/" + iconPic + "@2x.png");
            currentPicEl.prop("alt", data.weather[0].description);
            currentPicEl.css("height", '200px');
            currentPicEl.css("width", '200px');
            $('#currentTemp').text("Temperature: " + Math.round(convertTemp(data.main.temp)) + " &#176F");
            $('#currentHumidity').text("Humidity: " + data.main.humidity + "%");
            $('#currentWindSpeed').text("Wind Speed: " + data.wind.speed + " MPH");
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    forecastedWeather(lat, lon)

})
}

function forecastedWeather(lat, lon){
    //Removes any previously created elements
    $('#forecast').empty();
    console.log(lat, lon);
    var apiQuery = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(apiQuery).then(function (response) {
     return response.json();
 }).then(function (data) {

    //Iterates through all of the forecasted time blocks and shows only 1 per day
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

        //Creating elements to include
        let divEl1 = document.createElement("div");
        divEl1.className = "card";
        console.log(divEl1);
        

        let imgEl = document.createElement("img");
        imgEl.src = iconPic;
        imgEl.alt = forecastAlt;
        imgEl.className = "card-img-top";
        imgEl.style.height = '200px';
        imgEl.style.width = '200px';
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
        //Appends elements to the DOM
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

//Event listener for accepting the search city, saving to localStorage
formEl.on('submit', function(e){
    e.preventDefault();
    let searchCity = $('#citySearch').val();
    searchHistory.push(searchCity);
    localStorage.setItem('search', searchHistory);
    //Removes historical search buttons and replaces them with new values from localStorage
    historyEl.empty();
    showHistory();
    weather(searchCity);
}
)

function showHistory(){
    let historyString = "";
    historyString = localStorage.getItem('search');
    //Turns returned string into an array for iteration
    let history = [];
    if (historyString.length != null){
     history = historyString.split(",");
     for (let i = 0; i < history.length; i++) {
        var buttonEl = '<button type="button" class="btn btn-primary w-100 my-2">'+ history[i] + '</button>';
        historyEl.append(buttonEl);
        }
        }
    else {
        return;
    }
        
    }
   
historyEl.on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        let historicalSearch = e.target.textContent;
        console.log(historicalSearch);
        weather(historicalSearch); 
})   
    
   
        
//Erases local storage
 $("#clearHistory").on("click",function() {
        searchHistory = [];
        historyEl.empty();
        localStorage.removeItem('search');
        return searchHistory;
    })

//Converts Kelvin to fahrenheit
function convertTemp(temp){
    let fahrenheit = (temp-273.15)*1.8 + 32
    return fahrenheit;
}
