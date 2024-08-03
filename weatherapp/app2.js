function magic(){
    function getUserLocation() {
        return new Promise((resolve, reject) => {
            
            if (navigator.geolocation) {
                
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // Success callback
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        resolve({ latitude, longitude });
                    },
                    
                );
            } else {
                // Geolocation is not supported by this browser
                reject("Geolocation is not supported by this browser.");
            }
        });
    }

    // Function to get weather data using the coordinates
    async function getWeather(lat, lon) {
        const apiKey = 'a36ba90c9896322eef1905c612c3068b'; 
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        return data;
    }

    // Function to display weather data
    function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp ); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}
function jadu(city){
    const apiKey = "a36ba90c9896322eef1905c612c3068b"
    const c=city
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${c}&APPID=${apiKey}`;
    fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                displayHourlyForecast(data.list);
            })
            .catch(error => {
                console.error('Error fetching hourly forecast data:', error);
                alert('Error fetching hourly forecast data. Please try again.');
            });
    
            function displayHourlyForecast(hourlyData) {
        
                const hourlyForecastDiv = document.getElementById('hourly-forecast');
            
                const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)
            
                next24Hours.forEach(item => {
                    const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
                    const hour = dateTime.getHours();
                    const temperature = Math.round(item.main.temp - 273.15); 
                    const iconCode = item.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            
                    const hourlyItemHtml = `
                        <div class="hourly-item">
                            <span>${hour}:00</span>
                            <img src="${iconUrl}" alt="Hourly Weather Icon">
                            <span>${temperature}°C</span>
                        </div>
                    `;
            
                    hourlyForecastDiv.innerHTML += hourlyItemHtml;
                });
            }
        }

    // Async function to handle the whole process
    async function showWeather() {
        try {
            // Get user location
            const { latitude, longitude } = await getUserLocation();
            
            
            

            // Get weather data
            const weatherData = await getWeather(latitude, longitude);
            const a = await getWeather(latitude, longitude);
            
            const city = a.name;
            jadu(city);

            
            // Display weather data
            displayWeather(weatherData);
        } catch (error) {
            document.getElementById('location').innerText = error;
            
        }
    }

    // Call the async function to show the weather
    showWeather();
};

