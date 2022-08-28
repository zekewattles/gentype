const sunEmoji = "🌞";
const moonEmoji = "🌚";
const htmlElement = document.getElementsByTagName("html")[0];
const button = document.getElementById("theme-toggle");

const setButtonText = () => {
  if (htmlElement.classList.contains("light")) {
    button.innerHTML = moonEmoji;
  } else {
    button.innerHTML = sunEmoji;
  }
};

const setInitialTheme = () => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    htmlElement.classList.remove("light");
  } else {
    htmlElement.classList.add("light");
  }
};

const toggleTheme = () => {
  htmlElement.classList.toggle("light");
  setButtonText();
};

button.addEventListener("click", toggleTheme);
setInitialTheme();
setButtonText();
