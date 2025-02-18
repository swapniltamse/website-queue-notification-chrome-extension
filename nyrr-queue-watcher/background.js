// URL patterns for NYRR queues
const urlFilter = {
    urls: ["*://*.nyrr.org/*"]
  };
  
  // Function to play alert sound
  function playAlertSound() {
    console.log("[NYRR Queue Alert] Playing alert sound...");
    const audio = new Audio(chrome.runtime.getURL("alert.mp3"));
    audio.play().catch(err => console.error("[NYRR Queue Alert] Audio playback error:", err));
  }
  
  // Function to check for QueueId in the token
  function checkQueueToken(cookie) {
    console.log("[NYRR Queue Alert] Checking cookie:", cookie);
    if (cookie.name === "Queue-it-token" && cookie.value.includes("QueueId")) {
      console.log("[NYRR Queue Alert] Queue-it-token detected:", cookie.value);
      if (!cookie.value.includes("QueueId: N/A")) {
        console.log("[NYRR Queue Alert] Valid QueueId found. Triggering alert.");
        playAlertSound();
      } else {
        console.log("[NYRR Queue Alert] QueueId is N/A. Waiting for update.");
      }
    }
  }
  
  // Ensure service worker is listening and active
  chrome.runtime.onInstalled.addListener(() => {
    console.log("[NYRR Queue Alert] Extension installed and background script active.");
  });
  
  // Listen for cookie changes and check for queue updates
  chrome.cookies.onChanged.addListener((changeInfo) => {
    if (changeInfo.cookie?.domain.includes("nyrr.org")) {
      console.log("[NYRR Queue Alert] Cookie change detected:", changeInfo);
      checkQueueToken(changeInfo.cookie);
    }
  });
  
  // Check cookies on page load using webNavigation listener
  chrome.webNavigation.onCompleted.addListener(() => {
    console.log("[NYRR Queue Alert] Page load completed. Checking cookies...");
    chrome.cookies.getAll({ domain: "nyrr.org" }, (cookies) => {
      cookies.forEach(checkQueueToken);
    });
  }, urlFilter);
  
  // manifest.json Update:
  /*
  {
    "manifest_version": 3,
    "name": "NYRR Queue Alert",
    "version": "1.1",
    "permissions": ["cookies", "webNavigation"],
    "host_permissions": ["*://*.nyrr.org/*"],
    "background": {
      "service_worker": "background.js"
    },
    "web_accessible_resources": [{
      "resources": ["alert.mp3"],
      "matches": ["*://*.nyrr.org/*"]
    }]
  }
  */
  
 
  