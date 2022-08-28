const sunEmoji = "🌞";
const moonEmoji = "🌚";
const htmlElement = document.getElementsByTagName("html")[0];
const button = document.getElementById("theme-toggle");

const setDarkTheme = () => {
  htmlElement.classList.add("dark");
  htmlElement.classList.remove("light");
  button.innerHTML = sunEmoji;
};

const setLightTheme = () => {
  htmlElement.classList.add("light");
  htmlElement.classList.remove("dark");
  button.innerHTML = moonEmoji;
};

const setInitialTheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
};

const toggleTheme = () => {
  if (htmlElement.classList.contains("dark")) {
    setLightTheme();
  } else {
    setDarkTheme();
  }
};

button.addEventListener("click", toggleTheme);
setInitialTheme();
