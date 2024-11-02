class Detector {
  constructor(buttonConfigs, defaultTimeout, queryFormat) {
    this.defaultTimeout = defaultTimeout;
    this.buttonConfigs = buttonConfigs;
    this.queryFormat = queryFormat; // Requires ${className} inside string, will be replaced with correct value

    // Initialise settings
    this.initButtonConfig();

    // Attempt to find button every x seconds
    setInterval(() => {
      this.buttonConfigs.forEach((buttonConfig) =>
        this.findAndClickButton(buttonConfig)
      );
    }, 500); // 0.5s

    // Reload config every x seconds
    setInterval(() => {
      this.buttonConfigs.forEach((config) => this.loadButtonSettings(config));
    }, 1000 * 60 * 15); // 15 minutes
  }

  /*
   * SETTINGS LOADING LOGIC
   */
  initButtonConfig() {
    for (let config of this.buttonConfigs) {
      this.loadButtonSettings(config, true);
    }
  }

  async loadButtonSettings(config, withLogging = false) {
    config.enabled = await this._loadEnabled(config.syncStorageName);

    if (config.enabled === undefined || typeof config.enabled !== "boolean") {
      if (withLogging) {
        console.warn(
          `BingeFlix --- ${config.syncStorageName} - Unknown value \'${config.enabled}\', defaulting to TRUE`
        );
      }
      config.enabled = true;
    } else if (withLogging) {
      console.log(
        `BingeFlix --- ${config.syncStorageName} - ${config.enabled}`
      );
    }
  }

  _loadEnabled(storageName) {
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

  /*
   * BUTTON CLICKING LOGIC
   */
  findAndClickButton(buttonConfig) {
    const queryName = this.buildQuery(buttonConfig.className);
    const button = document.querySelector(queryName);

    if (!button) {
      buttonConfig.timeout = this.defaultTimeout;
      return;
    }

    this.loadButtonSettings(buttonConfig);
    if (!buttonConfig.enabled) {
      button.classList.remove("bingeflix-target");
      button.classList.remove("bingeflix-explode");
      return;
    }

    if (buttonConfig.timeout > 0) {
      button.classList.add("bingeflix-target");
      button.classList.add("bingeflix-explode");
      buttonConfig.timeout--;
      return;
    }

    this.focusAndClickButton(button);

    console.log(`BingeFlix --- Pressed ${buttonConfig.description} button`);
  }

  buildQuery(className) {
    return this.queryFormat.replace("${className}", className);
  }

  focusAndClickButton(button) {
    button.focus();
    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    button.dispatchEvent(clickEvent);
  }
}
