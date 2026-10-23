// Jump buttons in the player's control bar, to move around without the progress bar
const JUMPS = [-10, -5, -3, -1, 1, 3, 5, 10];

function addButtons(controls) {
  const box = document.createElement("div");
  box.className = "yhp-jump";
  for (const minutes of JUMPS) {
    const button = document.createElement("button");
    button.textContent = (minutes < 0 ? "−" : "+") + Math.abs(minutes) + "m";
    button.title = (minutes < 0 ? "Back " : "Forward ") + Math.abs(minutes) + " min";
    button.addEventListener("click", event => {
      event.stopPropagation();
      const video = controls.closest(".html5-video-player").querySelector("video");
      // Stop just before the end so YouTube doesn't jump to the next video
      video.currentTime = Math.min(Math.max(video.currentTime + minutes * 60, 0), video.duration - 1);
    });
    box.append(button);
  }
  controls.append(box);
}

// YouTube builds its player late and rebuilds it between videos, so keep checking
setInterval(() => {
  for (const controls of document.querySelectorAll(".ytp-left-controls")) {
    if (!controls.querySelector(".yhp-jump")) addButtons(controls);
  }
}, 1000);
