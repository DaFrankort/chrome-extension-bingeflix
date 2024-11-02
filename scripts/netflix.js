// Init & Config
console.log("BingeFlix --- Detected Netflix");
const defaultTimeout = 2; // => seconds until button press (default = 3s)

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

new Detector(buttonConfigs, defaultTimeout);
