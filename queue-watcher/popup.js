document.getElementById('refresh').addEventListener('click', () => {
    chrome.runtime.sendMessage({ command: "manualCheck" });
  });
  
  chrome.runtime.onMessage.addListener((message) => {
    if (message.log) {
      const logDiv = document.getElementById('log');
      logDiv.innerHTML = `<p>${message.log}</p>`;
    }
  });
  