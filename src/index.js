import request from "./scripts/request";
import renderer from "./scripts/renderer";

// Importing styles
import "./styles";

const loader = document.querySelector(".loader");
const loaderTitle = document.querySelector(".loader > .loader-content-tile");
const loaderSpinner = document.querySelector(".loader > .bars-3");

const main = document.querySelector("main");
const aside = document.querySelector("aside");
let lat, lng, weatherData, mainImageData;
weatherData = {
  current: null,
  total: null,
};

document.querySelector("button").addEventListener("click", () => {
  request
    .getBackgroundImage(weatherData.current.weather[0].main)
    .then((data) => {
      renderer.imageRender(data);
    });
});

// cleanUp
const cleanUp = () => {
  loader.style.display = "none";
  loader.innerHTML = "";
  main.style.display = "block";
  aside.style.display = "block";
};

shutter.addEventListener("click", () => {
  document.querySelector("#popover").classList.toggle("show");
});

window.onload = () => {
  // get user coordinates
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    loader.style.backgroundColor = "#fff";
    loaderTitle.innerHTML = "Waiting for weather data";
    loaderTitle.style.color = "#000";
    loaderSpinner.style.color = "#000";

    // request.getForeCast(lat, lng).then((data) => {});

    Promise.all([
      request.getWeatherData(lat, lng),
      request.singleCallAPI(lat, lng),
      request.getRandomQuote(),
    ])
      .then((data) => {
        console.log(data);
        weatherData.current = data[0];
        weatherData.total = data[1];
        let quoteData = data[2];
        request
          .getBackgroundImage(data[1].current.weather[0].main)
          .then((data) => {
            mainImageData = data;
            renderer.sideBar(weatherData);
            renderer.mainBack(weatherData, mainImageData, quoteData);
            cleanUp();
          });
      })
      .catch((err) => {});
  });
};
