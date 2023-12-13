let isLoggedIn = false;  // Tracks login status

// Function to check the login status
function checkLogin(callback) {
    chrome.identity.getAuthToken({ 'interactive': false }, function (token) {
        isLoggedIn = !!token;
        callback(isLoggedIn);
    });
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "checkLoginStatus") {
        checkLogin(function (loggedIn) {
            sendResponse({ isLoggedIn: loggedIn });
        });
        return true; // Indicates asynchronous response
    } else if (request.action === "updateLoginStatus") {
        // Update the login status based on user actions in popup
        isLoggedIn = request.isLoggedIn;
    }
});