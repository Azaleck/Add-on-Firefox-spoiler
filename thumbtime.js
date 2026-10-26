// Hides any "12:34" / "1:02:03" text in thumbnails and hover previews, whatever YouTube names the element
const TIME = /^\s*-?\d{1,2}(:\d{2}){1,2}\s*$/;
const SCOPE = "ytd-video-preview, #video-preview, .ytp-inline-preview-mode, ytd-thumbnail, yt-thumbnail-view-model";

function hideIfTime(text) {
  const element = text.parentElement;
  if (!element || !TIME.test(text.data) || !element.closest(SCOPE)) return;
  // Hide the whole badge when there is one, so its dark box goes too
  (element.closest("badge-shape") || element).classList.add("yhp-time");
}

function scan(node) {
  if (node.nodeType === Node.TEXT_NODE) return hideIfTime(node);
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) hideIfTime(walker.currentNode);
}

// The preview's countdown is created and updated on the fly, so watch every change
new MutationObserver(mutations => {
  for (const mutation of mutations) {
    if (mutation.type === "characterData") hideIfTime(mutation.target);
    else mutation.addedNodes.forEach(scan);
  }
}).observe(document.documentElement, { childList: true, characterData: true, subtree: true });
