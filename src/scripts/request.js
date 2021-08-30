import axios from "axios";

const getWeatherData = (lat, long) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ffe8f234e7d1e07de86b9ddf5e70658b&units=metric`;
    axios
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const getForeCast = (lat, long) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast/hourly??lat=${lat}&lon=${long}&appid=ffe8f234e7d1e07de86b9ddf5e70658b&units=metric`;
    axios
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const singleCallAPI = (lat, long) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=ffe8f234e7d1e07de86b9ddf5e70658b&units=metric`;
    axios
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getBackgroundImage = (weather) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.unsplash.com/photos/random?query=${weather}&client_id=4j3NCVWHWBF6uM9LlfrF_NQvO8J5AFOpvHd9lT6ZnzI`;
    axios
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {
  getWeatherData,
  getForeCast,
  singleCallAPI,
  getBackgroundImage,
};
