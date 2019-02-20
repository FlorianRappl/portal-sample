// define the weather API appid either via environment (used during
// build process) or directly inline as the default fallback!
const appId = process.env.WEATHER_APPID || "";

const defaultWeather = {
  main: {
    temp: 300
  },
  name: "Munich",
  wind: {
    speed: 5
  },
  weather: [
    {
      main: "sunny"
    }
  ]
};

export function setup(portal) {
  console.log("Hi from weather");
  portal.data.temperature = undefined;

  portal.registerTile("weather", node => {
    node.innerHTML = "<h3>Weather</h3><div>Loading Weather ...</div>";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Munich&appid=${appId}`
    )
      .then(res => {
        if (res.status !== 200) {
          throw res;
        }
        return res.json();
      })
      .catch(err => {
        console.error(
          "Problem with weather API - are you missing a valid API key?",
          err
        );
        return defaultWeather;
      })
      .then(data => {
        const temperature = data.main.temp - 273.15;
        portal.data.temperature = temperature;
        portal.emit("temperature-changed", {
          value: temperature
        });
        node.innerHTML = `<h3>Weather</h3><div><b>${
          data.weather[0].main
        }</b> in ${data.name}</div><div>${temperature} °C</div><div>${
          data.wind.speed
        } m/s</div>`;
      });
  });
}
