
//creating object for weatherapi
const weatherApi = {
    key: '9f23b56e8dcad8299bf4e5a2a3fc932b',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
    }
    
    //creating anonymous function for key press of enter event
    document.getElementById('input-box').addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
    //console.log(event.target.value);
    getWeatherReport(event.target.value);
    }
    });
    
//get waether report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)  // fetch method fetching the data from  base url ...metric is used for unit in celcius......here i am appending the base url to get data by city name .  
        .then(weather => {   //weather is from api
            return weather.json(); // return data from api in JSON
        }).then(showWeaterReport);  // calling showweatherreport function
}
//show weather report
function showWeaterReport(weather) {
    let city_code=weather.cod;
    if(city_code==='400'){ 
        swal("Empty Input", "Please enter any city", "error");
        reset();
    }else if(city_code==='404'){
        swal("Bad Input", "entered city didn't matched", "warning");
        reset();
    }
    else{
    // console.log(weather.cod);
    // console.log(weather);  
    let op = document.getElementById('weather-body');
    op.style.display = 'block';
    let todayDate = new Date();
    let parent=document.getElementById('parent');
    let weather_body = document.getElementById('weather-body');
    weather_body.innerHTML =
        `
    <div class="location-deatils">
        <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
        <div class="date" id="date"> ${dateManage(todayDate)}</div>
    </div>
    <div class="weather-status">
        <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C </div>
        <div class="weather" id="weather"> ${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i>  </div>
        <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
        <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
    </div>
    <hr>
    <div class="day-details">
        <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%  <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
    </div>
    `;
    parent.append(weather_body);
    changeBg(weather.weather[0].main);
    reset();
    }
}


//making a function for the  last update current time 
function getTime(todayDate) {
    let hour =addZero(todayDate.getHours());
    let minute =addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}
//date manage for return  current date
function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    // console.log(year+" "+date+" "+day+" "+month);
    return `${date} ${month} (${day}) , ${year}`
}
// function for dynamically changing the background image based on the weather status
function changeBg(status) {
    const bgMap = {
      Clouds: "clouds.jpg",
      Rain: "rainy.jpg",
      Clear: "clear.jpg",
      Snow: "snow.jpg",
      Sunny: "sunny.jpg",
      Thunderstorm: "thunderstorm.jpg",
      Drizzle: "drizzle.jpg",
      Mist: "mist.jpg",
      Haze: "mist.jpg",
      Fog: "mist.jpg",
    };
    const bgImage = bgMap[status] || "bg.jpg";
    document.body.style.backgroundImage = `url(img/${bgImage})`;
  }
  
  // function for determining the icon class name
  function getIconClass(status) {
    const iconMap = {
      Clouds: "fas fa-cloud",
      Rain: "fas fa-cloud-showers-heavy",
      Clear: "fas fa-sun",
      Snow: "fas fa-snowman",
      Sunny: "fas fa-sun",
      Thunderstorm: "fas fa-thunderstorm",
      Drizzle: "fas fa-thunderstorm",
      Mist: "fas fa-smog",
      Haze: "fas fa-smog",
      Fog: "fas fa-smog",
    };
    return iconMap[status] || "fas fa-sun";
  }
  
  // function for resetting the input field
  function reset() {
    const input = document.getElementById("input-box");
    input.value = "";
  }
  
  // function for adding a leading zero to a number less than 10
  function addZero(i) {
    return i < 10 ? "0" + i : i;
  }