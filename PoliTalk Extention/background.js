
chrome.runtime.onInstalled.addListener(function () {
    // Set up OAuth client ID obtained from the Google Cloud Console
    const clientId = 'YOUR_CLIENT_ID'; //Need to change
    const scopes = ['openid', 'email', 'profile'];
  
    // Add an event listener for the browser action
    chrome.browserAction.onClicked.addListener(function () {
      // Use chrome.identity to authenticate user
      chrome.identity.getAuthToken({ interactive: true, scopes: scopes }, function (token) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
  
        // Use the token to make authenticated requests
        console.log('Authentication successful. Token:', token);
      });
    });
  });
  