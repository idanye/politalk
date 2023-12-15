// background.js

let isLoggedIn = false;

// Function to check the login status
function checkLogin(callback) {
    chrome.identity.getAuthToken({ 'interactive': false }, function (token) {
        isLoggedIn = !!token;
        callback(isLoggedIn);
    });
}

// Send a message to content scripts when the login status changes
function notifyContentScripts() {
    chrome.tabs.query({}, function(tabs) {
        for (let tab of tabs) {
            chrome.tabs.sendMessage(tab.id, { action: "loginStatusChanged", isLoggedIn: isLoggedIn });
        }
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
        isLoggedIn = request.isLoggedIn;
        notifyContentScripts();
    }
});
