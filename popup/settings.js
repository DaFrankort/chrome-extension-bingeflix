document.addEventListener("DOMContentLoaded", () => {
  /*
    ### CHECKBOXES ###
  */
  const settingsForm = document.getElementById("settingsForm");
  const autoSkipIntroCheckbox = document.getElementById("autoSkipIntro");
  const autoNextEpisodeCheckbox = document.getElementById("autoNextEpisode");

  // Load
  chrome.storage.sync.get(["autoSkipIntro", "autoNextEpisode"], (result) => {
    autoSkipIntroCheckbox.checked = result.autoSkipIntro || false;
    autoNextEpisodeCheckbox.checked = result.autoNextEpisode || false;
  });

  function saveSettings() {
    chrome.storage.sync.set({
      autoSkipIntro: autoSkipIntroCheckbox.checked,
      autoNextEpisode: autoNextEpisodeCheckbox.checked,
    });
  }

  settingsForm.addEventListener("click", () => {
    saveSettings();
  });

  /*
    ### DISABLE ALL ###
  */
  const disableAllButton = document.getElementById("disableAllButton");
  function disableAll() {
    autoSkipIntroCheckbox.checked = false;
    autoNextEpisodeCheckbox.checked = false;
    saveSettings();
  }

  disableAllButton.addEventListener("click", () => {
    disableAll();
  });
});
