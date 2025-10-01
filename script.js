const API_KEY = "c68c0ab0a8f97cd3e338a5605856e5a5";
const city = "Taghazout";

const tempEl = document.getElementById("temp-value");
const descriptionEl = document.getElementById("temp-description");
const feelsLikeEl = document.getElementById("feels-like");
const windEl = document.getElementById("wind-speed");
const humidityEl = document.getElementById("humidity");
const pressureEl = document.getElementById("pressure");
const surfMessage = document.getElementById("surf-message");

function updateWeather(data) {
  tempEl.textContent = `${data.main.temp.toFixed(1)} °C`;
  descriptionEl.textContent = data.weather[0].description;
  feelsLikeEl.textContent = `${data.main.feels_like.toFixed(1)} °C`;
  windEl.textContent = `${data.wind.speed} km/h`;
  humidityEl.textContent = `${data.main.humidity} %`;
  pressureEl.textContent = `${data.main.pressure} hPa`;

  const wind = data.wind.speed;
  const weather = data.weather[0].main.toLowerCase();

  if (wind < 5 && (weather.includes("clear") || weather.includes("cloud"))) {
    surfMessage.textContent =
      "🌊 Excellentes conditions ! Vent léger, parfait pour le surf !";
    surfMessage.style.color = "green";
  } else if (wind < 10) {
    surfMessage.textContent = "👌 Bonnes conditions, profitez des vagues !";
    surfMessage.style.color = "orange";
  } else {
    surfMessage.textContent = "⚠️ Conditions difficiles, soyez prudents.";
    surfMessage.style.color = "red";
  }
}

async function getWeather() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
    );
    const data = await res.json();
    console.log(data);
    updateWeather(data);
  } catch (error) {
    console.error("Erreur météo:", error);
    descriptionEl.innerText = "Impossible de charger la météo";
  }
}

getWeather();

document.getElementById("contact-hero").addEventListener("click", function () {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});
const burger = document.getElementById("burger");
const nav = document.querySelector(".navigation");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

document.querySelectorAll(".navigation a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});
