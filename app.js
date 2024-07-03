const defaultTimeout = 3; // => seconds until button press (default = 3s)
const timeInterval = 1000;

let buttonConfigs = [
  {
    // SKIP BUTTON
    dataUia: "player-skip-intro",
    timeout: defaultTimeout,
  },
  {
    // NEXT EPISODE BUTTON
    dataUia: "next-episode-seamless-button",
    timeout: defaultTimeout,
  },
];

// Looks if the button is on-screen, then interacts with it.
function findAndClickButton(config) {
  const queryName = `button[data-uia="${config.dataUia}"]`;
  const button = document.querySelector(queryName);

  if (button) {
    config.timeout--;
    console.log(`${config.timeout}...`);

    if (config.timeout <= 0) {
      button.click();
      config.timeout = defaultTimeout;
      console.log(`${config.dataUia} button clicked!`);
    } else {
      if (config.timeout <= 3) {
        console.log(`${config.dataUia} button found!`);
        button.style.backgroundColor = "lightpink";
        button.style.transition = "background-color 500ms";
      } else if (config.timeout <= 2) {
        button.style.backgroundColor = "salmon";
      } else if (config.timeout <= 1) {
        button.style.backgroundColor = "crimson";
      }
    }
  } else if (config.timeout !== 4) {
    config.timeout = 4;
  }
}

// Checks if the user is on Netflix
function isWatchinOnNetflix() {
  return (
    window.location.hostname === "www.netflix.com" &&
    window.location.pathname.startsWith("/watch")
  );
}

// Main program
if (isWatchinOnNetflix()) {
  setInterval(() => {
    buttonConfigs.forEach((config) => findAndClickButton(config));
  }, timeInterval);
}
