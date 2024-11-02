// Init & Config
console.log("BingeFlix --- Detected Netflix");
const defaultTimeout = 2; // => seconds until button press (default = 3s)
const timeInterval = 500;

let buttonConfigs = [
  new ButtonConfig(
    "player-skip-intro",
    defaultTimeout,
    "Skip Intro",
    "autoSkipIntro"
  ),
  new ButtonConfig(
    "next-episode-seamless-button",
    defaultTimeout,
    "Next Episode",
    "autoNextEpisode"
  ),
  new ButtonConfig(
    "next-episode-seamless-button-draining",
    defaultTimeout,
    "Next Episode",
    "autoNextEpisode"
  ),
  new ButtonConfig(
    "interrupt-autoplay-continue",
    defaultTimeout,
    "Continue Playing",
    "autoNextEpisode" // No custom setting yet
  ),
];

console.log(buttonConfigs);

// Functions
function initButtonConfig() {
  for (let config of buttonConfigs) {
    loadButtonSettings(config, true);
  }
}

async function loadButtonSettings(config, withLogging = false) {
  config.enabled = await _loadEnabled(config.syncStorageName);

  if (config.enabled === undefined || typeof config.enabled !== "boolean") {
    if (withLogging) {
      console.warn(
        `BingeFlix --- ${config.syncStorageName} - Unknown value \'${config.enabled}\', defaulting to TRUE`
      );
    }
    config.enabled = true;
  } else if (withLogging) {
    console.log(`BingeFlix --- ${config.syncStorageName} - ${config.enabled}`);
  }
}

function _loadEnabled(storageName) {
  const promise = new Promise((resolve, reject) => {
    chrome.storage.sync.get([storageName], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        const setting = Object.values(result)[0];
        resolve(setting);
      }
    });
  });

  return promise.then((response) => {
    return response;
  });
}

function findAndClickButton(config) {
  const queryName = `button[data-uia="${config.className}"]`;
  const button = document.querySelector(queryName);

  if (button) {
    loadButtonSettings(config);
    if (config.enabled) {
      if (config.timeout <= 0) {
        button.click();
        console.log(`BingeFlix --- Pressed ${config.description} button`);
      } else {
        button.classList.add("bingeflix-target");
        button.classList.add("bingeflix-explode");
      }
      config.timeout--;
    } else {
      button.classList.remove("bingeflix-target");
      button.classList.remove("bingeflix-explode");
    }
  } else {
    config.timeout = defaultTimeout;
  }
}

// Main loop
initButtonConfig();

setInterval(() => {
  buttonConfigs.forEach((config) => findAndClickButton(config));
}, timeInterval);

setInterval(() => {
  buttonConfigs.forEach((config) => loadButtonSettings(config));
}, 1000 * 60 * 15); // 15 minutes
