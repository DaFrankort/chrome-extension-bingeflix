console.log("BingeFlix --- Detected Youtube");
const defaultTimeout = 3;

let buttonConfigs = [
  new ButtonConfig(
    "ytp-ad-skip-button-modern",
    defaultTimeout,
    "Skip Ad",
    "autoSkipIntro"
  ),
];

new Detector(buttonConfigs, defaultTimeout, "button.${className}");
