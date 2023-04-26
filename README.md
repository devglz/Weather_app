# Weather App

This is a simple weather application that allows you to get the current weather information of a city by entering the city name.

Getting started

To get started with the app, clone the repository and open the index.html file in your browser.

## API key

This app uses the OpenWeatherMap API to fetch the weather data. To use this API, you need to get an API key by registering at OpenWeatherMap. After getting the API key, replace the existing key in the script.js file with your own API key.
```

const weatherApi = {
    key: 'your_api_key_here',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}
```
## Usage
To use the app, simply enter the name of the city whose weather information you want to get in the input box and press Enter. The app will fetch the weather information from the OpenWeatherMap API and display it on the screen.

## Technologies used

- HTML
- CSS
- JavaScript
## Credits

This app was created by Adam using the OpenWeatherMap API.
