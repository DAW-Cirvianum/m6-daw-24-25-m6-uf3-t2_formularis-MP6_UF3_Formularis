document
  .getElementById('weatherForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postalCode').value;
    const country = document.getElementById('country').value;

    // Validacions dels camps del formulari

    // Validar que el camp carrer no estigui buit
    if (city === '') {
      alert('El camp carrer és obligatori');
      return;
    }

    try {
      // Petició a l'API de www.weatherapi.com utilitzant async/await
      const apiKey = ' f50e2d4c94d4418c821115338230512';
      const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&country=${country}&aqi=no`;
      const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&country=${country}&days=2`;

      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl),
      ]);

      const [currentData, forecastData] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json(),
      ]);

      const weatherData = {
        current: {
          temperature: `${currentData.current.temp_c}°C`,
          weatherDescription: currentData.current.condition.text,
          weatherIcon: currentData.current.condition.icon,
          region: currentData.location.region,
          city: currentData.location.name,
          country: currentData.location.country,
        },
        forecast: {
          temperature: `${forecastData.forecast.forecastday[1].day.avgtemp_c}°C`,
          weatherDescription:
            forecastData.forecast.forecastday[1].day.condition.text,
          weatherIcon: forecastData.forecast.forecastday[1].day.condition.icon,
          region: currentData.location.region,
          city: currentData.location.name,
          country: currentData.location.country,
        },
      };

      displayWeatherResults(weatherData);
    } catch (error) {
      console.error("Error en la petició a l'API:", error);
      // Gestionar errors aquí (mostrar missatge a l'usuari, etc.)
    }
  });

function displayWeatherResults(weatherData) {
  const resultsContainer = document.getElementById('weatherResults');
  const currentTemperatureElement = document.getElementById('temperature');
  const currentWeatherDescriptionElement =
    document.getElementById('weatherDescription');
  const currentWeatherIconElement = document.getElementById('weatherIcon');
  const currentLocationElement = document.getElementById('location');
  const forecastTemperatureElement = document.getElementById(
    'forecastTemperature'
  );
  const forecastWeatherDescriptionElement = document.getElementById(
    'forecastWeatherDescription'
  );
  const forecastWeatherIconElement = document.getElementById(
    'forecastWeatherIcon'
  );

  console.log(weatherData);

  // Informació de la localització
  currentLocationElement.textContent = `${weatherData.current.region} - ${weatherData.current.city} (${weatherData.current.country})`;

  // Mostrar informació actual
  currentTemperatureElement.textContent = `Temperatura Actual: ${weatherData.current.temperature}`;
  currentWeatherDescriptionElement.textContent = `Condicions Actuals: ${weatherData.current.weatherDescription}`;
  currentWeatherIconElement.src = `https:${weatherData.current.weatherIcon}`;
  // Mostrar informació de la previsió per demà
  forecastTemperatureElement.textContent = `Temperatura per Demà: ${weatherData.forecast.temperature}`;
  forecastWeatherDescriptionElement.textContent = `Condicions per Demà: ${weatherData.forecast.weatherDescription}`;
  forecastWeatherIconElement.src = `https:${weatherData.forecast.weatherIcon}`;

  // Mostrar la secció de resultats
  resultsContainer.classList.remove('hidden');
}
