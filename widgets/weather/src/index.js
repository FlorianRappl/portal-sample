export function setup(portal) {
  console.log('Hi from weather');

  portal.registerTile('weather', (node) => {
    node.innerHTML = '<h3>Weather</h3><div>Loading Weather ...</div>';

    fetch('http://api.openweathermap.org/data/2.5/weather?q=Munich&appid=bd5e378503939ddaee76f12ad7a97608')
      .then(res => res.json())
      .then(data => {
         node.innerHTML = `<h3>Weather</h3><div><b>${data.weather[0].main}</b> in ${data.name}</div><div>${data.main.temp - 273.15} °C</div><div>${data.wind.speed} m/s</div>`;
      });
  });
}
