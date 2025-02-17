document.addEventListener('DOMContentLoaded', () => {
  // Delay execution slightly to ensure full DOM load
  setTimeout(() => {
    const statusElement = document.getElementById('status');
    const checkButton = document.getElementById('checkQueue');

    // Verify that elements are present before proceeding
    if (!statusElement || !checkButton) {
      console.error("[Error] Missing 'status' or 'checkQueue' elements in popup.html");
      return;
    }

    // Send a message to background.js on popup load
    chrome.runtime.sendMessage({
      type: "popup_check",
      message: "Popup is ready"
    }, (response) => {
      statusElement.textContent = response?.status ?? "Status: Background not responding.";
    });

    // Add event listener for manual check button
    checkButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: "manual_check" }, (response) => {
        statusElement.textContent = response?.status ?? "Status: No manual check response.";
      });
    });

    console.log("[Info] Popup initialized successfully");
  }, 100); // Small delay to ensure HTML readiness
});
