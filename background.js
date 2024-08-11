let audio = null;
let isPlaying = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in background script:', request);
  if (request.action === 'play') {
    if (!isPlaying) {
      if (audio) {
        audio.pause();
      }
      audio = new Audio(request.quality);
      audio.play();
      isPlaying = true;
    }
    sendResponse({ status: 'playing' });
  } else if (request.action === 'stop') {
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      isPlaying = false;
    }
    sendResponse({ status: 'stopped' });
  }
});