// Toolbar button: flips the setting and swaps the icon (gray map + red "!" = on, green = off)
function showIcon(enabled) {
  browser.action.setIcon({ path: enabled ? "icons/icon-on.svg" : "icons/icon-off.svg" });
}

browser.storage.local.get({ enabled: true }).then(s => showIcon(s.enabled));

browser.action.onClicked.addListener(async () => {
  const { enabled } = await browser.storage.local.get({ enabled: true });
  await browser.storage.local.set({ enabled: !enabled });
  showIcon(!enabled);
});
