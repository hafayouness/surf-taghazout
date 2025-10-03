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

const emailInput = document.querySelector(".contact-input");
const messageTextarea = document.querySelector(".contact-textarea");
const submitButton = document.querySelector(".submit-button");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(element, message) {
  const existingError = element.parentElement.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.color = "#ff4444";
  errorDiv.style.fontSize = "14px";
  errorDiv.style.marginTop = "5px";
  errorDiv.textContent = message;

  element.style.borderColor = "#ff4444";
  element.parentElement.insertBefore(errorDiv, element.nextSibling);
}

function removeError(element) {
  const errorMessage = element.parentElement.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
  element.style.borderColor = "";
}

function showSuccessMessage() {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #4CAF50;
    color: white;
    padding: 15px 25px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  `;
  successDiv.textContent = "✓ Message envoyé avec succès !";

  document.body.appendChild(successDiv);

  setTimeout(() => {
    successDiv.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => successDiv.remove(), 300);
  }, 3000);
}

emailInput.addEventListener("input", function () {
  if (this.value.trim() === "") {
    removeError(this);
  } else if (!isValidEmail(this.value)) {
    showError(this, "Veuillez entrer une adresse email valide");
  } else {
    removeError(this);
  }
});

messageTextarea.addEventListener("input", function () {
  if (this.value.trim() === "") {
    removeError(this);
  } else if (this.value.trim().length < 10) {
    showError(this, "Le message doit contenir au moins 10 caractères");
  } else {
    removeError(this);
  }
});

submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  let isValid = true;

  if (emailInput.value.trim() === "") {
    showError(emailInput, "L'adresse email est requise");
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, "Veuillez entrer une adresse email valide");
    isValid = false;
  } else {
    removeError(emailInput);
  }

  if (messageTextarea.value.trim() === "") {
    showError(messageTextarea, "Le message est requis");
    isValid = false;
  } else if (messageTextarea.value.trim().length < 10) {
    showError(
      messageTextarea,
      "Le message doit contenir au moins 10 caractères"
    );
    isValid = false;
  } else {
    removeError(messageTextarea);
  }

  if (isValid) {
    console.log("Message:", messageTextarea.value);

    showSuccessMessage();

    emailInput.value = "";
    messageTextarea.value = "";
  }
});

const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
