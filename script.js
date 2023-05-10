

async function api() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json();
  const parent_data = document.querySelector('.weather');
  for (const country of countries) {
    try {
      const content = document.createElement('div');
      content.classList.add('country_data');
      content.classList.add('card');
      content.style.display = 'inline-block';

      const country_name = document.createElement('p');
      country_name.classList.add('Name');
      country_name.innerText = country.name.common;
      content.append(country_name);

      const flag = document.createElement('img');
      flag.classList.add('fl');
      flag.setAttribute('src', country.flags.png);
      content.append(flag);

      const capit = document.createElement('p');
      capit.innerText = country.capital && country.capital[0] ? country.capital[0] : 'N/A';
      content.append(capit);

      const reg = document.createElement('p');
      reg.innerText = country.region;
      content.append(reg);

      const button_weather = document.createElement('button');
      button_weather.classList.add('wea');
      button_weather.setAttribute('id', `btn-${country.cca2}`);
      button_weather.innerText = 'Click for Weather';
      button_weather.addEventListener('click', () => weatherapi(country.cca2));
      content.append(button_weather);

      parent_data.append(content);
    } catch {
      console.error('An error occurred while processing the country data');
    }
  }
}

async function weatherapi(countryCode) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    const countryData = await response.json();
    const latlng = countryData?.[0]?.latlng;
    if (!latlng) {
      throw new Error('Could not find latitude and longitude for the country');
    }
    const [lat, lon] = latlng;
    const API_KEY = 'YourAPIKey';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response2 = await fetch(url);
    const weatherData = await response2.json();
    const weatherDescription = weatherData?.weather?.[0]?.description;
    if (!weatherDescription) {
      throw new Error('Could not find weather information for the country');
    }
    alert(`The weather in ${countryData?.[0]?.name?.common} is ${weatherDescription}`);
  } catch (error) {
    console.error('An error occurred while processing the weather data:', error);
    alert('An error occurred while processing the weather data');
  }
}


api();




























































