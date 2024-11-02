class ButtonConfig {
  constructor(className = null, timeout = 3, description, syncStorageName) {
    this.className = className;
    this.timeout = timeout;
    this.description = description;
    this.syncStorageName = syncStorageName;
    this.enabled = true;
  }
}
