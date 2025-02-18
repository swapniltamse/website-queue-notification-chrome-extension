# NYRR Queue Watcher Chrome Extension

This Chrome extension monitors queue cookies (e.g., `queue-it-token`, `queue-position`) on websites like NYRR and alerts you when the status changes.

- Automatically tracks queue session tokens and positions every 5 seconds.
- Sends browser notifications on changes.
- Provides a manual check button.

Update: More audio related feature are being added, the extension might not funtion properly in the meantime
![alt text](<mock gif.gif>)


# Installation
1. **Clone the repository:**  
   ```bash
   git clone https://github.com/swapniltamse/nyrr-queue-watcher.git
   ```
2. **Open Chrome Extensions:** Go to `chrome://extensions/`.
3. **Enable Developer Mode** (toggle on top-right).
4. **Load Unpacked Extension:** Select the cloned folder.

# Usage
- The extension runs automatically every 6 seconds.
- Click the extension icon to manually check the queue status.
- Notifications will pop up if your queue position or token changes.

# License
This project is licensed under the MIT License.
