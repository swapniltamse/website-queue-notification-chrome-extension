// The 'QueueITAccepted' cookie contains details like EventId, QueueId, RedirectType, IssueTime, and Hash:
// - EventId: Identifies the event (e.g., '20250211tcsnycapp' for the TCS NYC Marathon)
// - QueueId: Unique identifier for your queue session
// - RedirectType: Indicates if the user was redirected from the waiting room
// - IssueTime: Epoch timestamp of when the cookie was issued
// - Hash: Security hash to prevent tampering


document.addEventListener('DOMContentLoaded', () => {
  const statusElement = document.getElementById('status');
  const cookieLogElement = document.createElement('pre');
  cookieLogElement.style.maxHeight = '150px';
  cookieLogElement.style.overflowY = 'auto';
  document.body.appendChild(cookieLogElement);

  const nyrrQueuePatterns = [/^QueueITAccepted-/, /^Queue-it-token$/];

  try {
    const messageTimeout = setTimeout(() => {
      console.error('[Error] Background script response timed out.');
      cookieLogElement.textContent = 'Error: No response from background script.';
    }, 3000);

    chrome.runtime.sendMessage({ type: 'get_nyrr_cookies' }, (cookies) => {
      clearTimeout(messageTimeout);
      if (chrome.runtime.lastError) {
        console.error('[Error] Message port closed:', chrome.runtime.lastError.message);
        cookieLogElement.textContent = 'Error: Background connection closed.';
        return;
      }
      
      if (cookies?.length) {
        cookieLogElement.textContent = cookies.map(cookie => {
          const isMatch = nyrrQueuePatterns.some(pattern => pattern.test(cookie.name));
          if (isMatch) {
            return `[MATCH] ${cookie.name} → EventId: ${extractParam(cookie.value, 'EventId')} | QueueId: ${extractParam(cookie.value, 'QueueId')}`;
          }
          return `[OTHER] ${cookie.name}: ${cookie.value}`;
        }).join('\n');
      } else {
        cookieLogElement.textContent = 'No NYRR cookies detected.';
      }
    });
  } catch (error) {
    console.error('[Exception] Error during message handling:', error);
    cookieLogElement.textContent = 'Error: Failed to connect to background script.';
  }

  function extractParam(cookieValue, key) {
    const match = cookieValue.match(new RegExp(`${key}%3D([^%&]+)`));
    return match ? decodeURIComponent(match[1]) : 'N/A';
  }

  console.log('[Info] NYRR queue cookie check with event and queue ID extraction initialized.');
});
