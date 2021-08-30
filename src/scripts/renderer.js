const sideBar = (data) => {
  const current = data.current;
  const all = data.total;
  console.log(all);

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

const mainBack = (data) => {
  console.log(data)
  document.querySelector(
    "main"
  ).style.backgroundImage = `url(${data.urls.full})`;
};

export default { sideBar, mainBack };
