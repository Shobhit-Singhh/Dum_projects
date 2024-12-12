document.getElementById('weather-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const cityName = document.getElementById('city').value;

    // Fetch the weather data from the API (replace the API URL with your actual API endpoint)
    const apiKey = '452cf6f271be3a284a72da2c11c2e133';  // Use your actual API key here
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log('Weather data:', data);

        if (data.cod === 200) {
            // Extract data from the API response
            const { name, coord, weather, main, wind, clouds, sys, visibility } = data;
            const temp = Math.round(main.temp - 273.15);
            const {pressure, humidity, sea_level, grnd_level } = main;
            const { speed, deg, gust } = wind;
            const { all } = clouds;
            const { sunrise, sunset } = sys;

            // Update the UI with the fetched data
            document.getElementById('city-name').textContent = name;
            document.getElementById('coordinates').textContent = `${coord.lon}° E, ${coord.lat}° N`;
            document.getElementById('weather-description').textContent = weather[0].description;
            document.getElementById('temperature').textContent = `🌡️ ${temp}°C`;

            // Display other weather details
            document.getElementById('sea-level-pressure').textContent = `${sea_level} hPa`;
            document.getElementById('ground-level-pressure').textContent = `${grnd_level} hPa`;

            document.getElementById('humidity').textContent = `${humidity}%`;
            document.getElementById('wind-speed').textContent = `${speed} m/s`;
            document.getElementById('wind-direction').textContent = `${deg}°`;
            document.getElementById('wind-gust').textContent = `${gust} m/s`;
            document.getElementById('visibility').textContent = `${visibility / 1000} km`;
            document.getElementById('cloudiness').textContent = `${all}%`;

            // Format sunrise and sunset times
            const sunriseDate = new Date(sunrise * 1000);
            const sunsetDate = new Date(sunset * 1000);
            document.getElementById('sunrise').textContent = sunriseDate.toLocaleTimeString();
            document.getElementById('sunset').textContent = sunsetDate.toLocaleTimeString();

            // Update the weather icon (using Font Awesome or custom icons)
            const iconCode = weather[0].icon;
            document.getElementById('weather-icon').classList.add(`fas`, `fa-${iconCode}`);
        } else {
            alert('City not found!');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
});