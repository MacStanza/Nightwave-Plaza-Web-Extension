document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('play');
  const stopButton = document.getElementById('stop');
  const qualitySelect = document.getElementById('quality');

  playButton.addEventListener('click', () => {
    const selectedQuality = qualitySelect.value;
    console.log('Play button clicked with quality:', selectedQuality);
    chrome.runtime.sendMessage({ action: 'play', quality: selectedQuality }, (response) => {
      console.log('Response from background script:', response);
      if (response.status === 'playing') {
        playButton.disabled = true;
        stopButton.disabled = false;
      }
    });
  });

  stopButton.addEventListener('click', () => {
    console.log('Stop button clicked');
    chrome.runtime.sendMessage({ action: 'stop' }, (response) => {
      console.log('Response from background script:', response);
      if (response.status === 'stopped') {
        playButton.disabled = false;
        stopButton.disabled = true;
      }
    });
  });
});