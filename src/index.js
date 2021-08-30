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

// cleanUp
const cleanUp = () => {
  loader.style.display = "none";
  loader.innerHTML = "";
  main.style.display = "block";
  aside.style.display = "block";
};

window.onload = () => {
  // get user coordinates
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    loader.style.backgroundColor = "#fff";
    loaderTitle.innerHTML = "Waiting for weather data";
    loaderTitle.style.color = "#000";
    loaderSpinner.style.color = "#000";

    request
      .getWeatherData(lat, lng)
      .then((data) => (weatherData.current = data));

    // request.getForeCast(lat, lng).then((data) => {});

    request.singleCallAPI(lat, lng).then((data) => {
      weatherData.total = data;
      request.getBackgroundImage(data.current.weather[0].main).then((data) => {
        mainImageData = data;
        renderer.sideBar(weatherData);
        renderer.mainBack(mainImageData);
      });
      cleanUp();
    });
  });
};
