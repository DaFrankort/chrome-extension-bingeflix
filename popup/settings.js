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

    switchEnableDisableButton();
  }

  settingsForm.addEventListener("click", () => {
    saveSettings();
  });

  /*
    ### DISABLE/ENABLE ALL ###
  */
  const disableAllButton = document.getElementById("disableAllButton");
  const enableAllButton = document.getElementById("enableAllButton");
  switchEnableDisableButton();

  function setAllTo(value) {
    if (typeof value === "boolean") {
      autoSkipIntroCheckbox.checked = value;
      autoNextEpisodeCheckbox.checked = value;
      saveSettings();
    }
  }

  disableAllButton.addEventListener("click", () => {
    setAllTo(false);
  });

  enableAllButton.addEventListener("click", () => {
    setAllTo(true);
  });

  function switchEnableDisableButton() {
    if (!autoSkipIntroCheckbox.checked && !autoNextEpisodeCheckbox.checked) {
      disableAllButton.hidden = true;
      enableAllButton.hidden = false;
    } else {
      disableAllButton.hidden = false;
      enableAllButton.hidden = true;
    }
  }
});
