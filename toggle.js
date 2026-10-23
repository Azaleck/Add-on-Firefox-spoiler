// Adds or removes .yhp-off on <html> to follow the on/off setting
function apply(enabled) {
  document.documentElement.classList.toggle("yhp-off", !enabled);
}

browser.storage.local.get({ enabled: true }).then(s => apply(s.enabled));

browser.storage.onChanged.addListener(changes => {
  if (changes.enabled) apply(changes.enabled.newValue);
});
