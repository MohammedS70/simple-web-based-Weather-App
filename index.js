const apikey = 'cda6dcdf8afd4428a31238724384ffda';
const btn = document.getElementById('btn');
const resultDiv = document.getElementById('result');

btn.addEventListener('click', () => {
  const city = document.getElementById('city').value.trim();
  if (!city) {
    resultDiv.innerHTML = '<p class="error">Please enter a city name.</p>';
    return;
  }
  fetchWeather(city);
});

async function fetchWeather(city) {
  resultDiv.innerHTML = '<p>Loading…</p>';
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apikey}`;
  try {
    const res = await fetch(apiurl);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    resultDiv.innerHTML = `<p class="error">${err.message}</p>`;
  }
}

function displayWeather(data) {
  const {
    name,
    sys: { country },
    weather,
    main: { temp, feels_like, humidity },
    wind: { speed }
  } = data;
  const { description, icon } = weather[0];

  resultDiv.innerHTML = `
    <h2>${name}, ${country}</h2>
     <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
    <p><strong> ${temp}°C</strong> (${description})</p>
    <p>Feels like: ${feels_like}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p> Wind: ${speed} m/s</p>
    <p>Weather: ${description}</p>
    <p>City: ${name}</p>
    <p>Country: ${country}</p>
    `;
  }
const defaultCity = localStorage.getItem('city') || '';
document.getElementById("city").addEventListener("input", (e) => {
  const city = e.target.value.trim();
  if (city) {
    localStorage.setItem("city", city);
  } else {
    localStorage.removeItem("city");
  }
});
window.addEventListener('load', () => {
  document.getElementById('city').value = defaultCity;
  fetchWeather(defaultCity);
});
//create a btn to clear the local storage when clicked and reload the page retaining the default city
document.getElementById('clear').addEventListener('click', () => {
  localStorage.removeItem('city');
  location.reload();
});
// const clearBtn = document.createElement('button');
// clearBtn.innerText = 'Clear City';
// clearBtn.addEventListener('click', () => {
//   localStorage.removeItem('city');
//   document.getElementById('city').value = '';
//   resultDiv.innerHTML = '<p>City cleared. Please enter a new city.</p>';
//   document.body.appendChild(clearBtn); 
// });



