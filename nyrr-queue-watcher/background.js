// Store last known cookie values
let lastQueueToken = null;
let lastQueuePosition = null;

// Check cookies every 6 seconds
chrome.alarms.create("checkQueueCookies", { periodInMinutes: 0.1 });

// Alarm listener to check cookies
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "checkQueueCookies") {
    checkQueueCookies();
  }
});

// Function to check cookies
function checkQueueCookies() {
  const url = "https://www.nyrr.org";

  chrome.cookies.getAll({ domain: "nyrr.org" }, (cookies) => {
    let queueToken = cookies.find(c => c.name === "queue-it-token")?.value;
    let queuePosition = cookies.find(c => c.name === "queue-position")?.value;

    // Compare with previous values
    if (queueToken && queueToken !== lastQueueToken) {
      notifyUser("Queue Session Updated", `New token: ${queueToken}`);
      lastQueueToken = queueToken;
    }

    if (queuePosition && queuePosition !== lastQueuePosition) {
      notifyUser("Queue Position Changed", `New position: ${queuePosition}`);
      lastQueuePosition = queuePosition;
    }
  });
}

// Function to show notifications
function notifyUser(title, message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: title,
    message: message
  });
}

// Mock function for queue cookies
function mockQueueCookies() {
  const timestamp = new Date().toLocaleString();
  notifyUser("Queue Session Mocked", `Mock token: test123 | Time: ${timestamp}`);
  notifyUser("Queue Position Mocked", `Position: 9999 | Time: ${timestamp}`);
  
  // Log cookie simulation for debugging
  console.log("[Mock Test] queue-it-token: test123");
  console.log("[Mock Test] queue-position: 1299");
}

mockQueueCookies();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "popup_check") {
    console.log("Popup is ready");
    sendResponse({ status: "Background connected" });
  }
});

