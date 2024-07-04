document.addEventListener("DOMContentLoaded", () => {
  const settingsForm = document.getElementById("settingsForm");
  const autoSkipIntroCheckbox = document.getElementById("autoSkipIntro");
  const autoNextEpisodeCheckbox = document.getElementById("autoNextEpisode");

  // Load settings
  chrome.storage.sync.get(["autoSkipIntro", "autoNextEpisode"], (result) => {
    autoSkipIntroCheckbox.checked = result.autoSkipIntro || false;
    autoNextEpisodeCheckbox.checked = result.autoNextEpisode || false;
  });

  // Save settings
  function saveSettings() {
    chrome.storage.sync.set({
      autoSkipIntro: autoSkipIntroCheckbox.checked,
      autoNextEpisode: autoNextEpisodeCheckbox.checked,
    });
  }

  settingsForm.addEventListener("click", () => {
    saveSettings();
  });
});
