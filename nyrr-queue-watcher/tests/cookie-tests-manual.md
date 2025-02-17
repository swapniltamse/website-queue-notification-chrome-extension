** Simulate Queue Cookies Manually: **
You can manually set cookies in your browser to test the extension’s behavior.

Open DevTools:
Right-click on the NYRR page (https://www.nyrr.org) and select Inspect.

Go to Application Tab:
Navigate to Application → Storage → Cookies → nyrr.org.

Add Test Cookies:
Right-click and select Add Cookie, then enter:
Name: queue-it-token
Value: test123
Domain: .nyrr.org
queue-position: 12345

Trigger the Extension:
Click the Check Now button in your extension popup.
You should see a notification with the simulated queue information.