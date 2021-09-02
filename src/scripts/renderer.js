const sideBar = (data) => {
  const current = data.current;
  const all = data.total;

  document.querySelector("#location").innerHTML = current.name;
  document.querySelector(
    "#city"
  ).innerHTML = `${current.coord.lon} Long // ${current.coord.lat} Lat`;
  document.querySelector(
    ".flag > img"
  ).src = `https://www.countryflags.io/${current.sys.country.toLowerCase()}/flat/64.png`;

  document.querySelector("#wind").innerHTML = `${current.wind.speed}Kmph`;
  document.querySelector("#humidity").innerHTML = `${all.current.humidity}%`;
  document.querySelector("#pressure").innerHTML = `${all.current.pressure}hPa`;
  document.querySelector("#clouds").innerHTML = `${current.clouds.all}`;
  let sunrise = new Date(all.current.sunrise * 1000)
    .toLocaleString()
    .split(",")[1];
  let sunset = new Date(all.current.sunset * 1000)
    .toLocaleString()
    .split(",")[1];
  document.querySelector("#sunrise").innerHTML = `${sunrise}`;
  document.querySelector("#sunset").innerHTML = `${sunset}`;
};

const mainBack = (weatherData, imageData, quoteData) => {

  // Setting the main background
  imageRender(imageData);

  // Processing the weather data
  document.querySelector("#temp").innerHTML = `${Number(weatherData.current.main.temp).toFixed(0)}&deg;`;
  document.querySelector("#feels_like").innerHTML = `${Number(weatherData.current.main.feels_like).toFixed(0)}&deg;C`;
  document.querySelector("#temp_min").innerHTML = `${Number(weatherData.current.main.temp_min).toFixed(0)}&deg;C`;
  document.querySelector("#temp_max").innerHTML = `${Number(weatherData.current.main.temp_max).toFixed(0)}&deg;C`;
  document.querySelector("#weather").innerHTML = `${weatherData.total.current.weather[0].main}`;

  // Processing the quote data
  document.querySelector("#quote").innerHTML = `"${quoteData.content}"<br><span>~${quoteData.author}</span>`;

  // Adding date in bottom right corner
  document.querySelector("#date").innerHTML = `${new Date().toLocaleDateString()}`;
};

const format = text => {
  return text[0].toUpperCase() + text.slice(1).replace('_', ' ');
}

const imageRender = (imageData) => {
  // Processing image data -> setting background and the camera values
  document.querySelector(
    "main"
  ).style.backgroundImage = `url(${imageData.urls.full})`;
  let ul = document.querySelector("#popover > ul")
  ul.innerHTML = ""
  let shutter = document.querySelector("#shutter")
  ul.style.listStyle = 'none';
  Object.keys(imageData.exif).forEach(key => {
    let node = document.createElement('LI')
    node.innerHTML = `<b> ${format(key)}</b>:&nbsp; ${imageData.exif[key]}`
    ul.appendChild(node)
  })
  document.querySelector('#imgLocation').innerHTML = imageData.location.name;
}

export default { sideBar, mainBack, imageRender };
