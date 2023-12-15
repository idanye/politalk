// popup.js
const popupContainer = document.querySelector('.popup-container');

function showLoadingSection() {
    document.getElementById('loading-section').style.display = 'block';
    document.getElementById('content').style.display = 'none';
}

function hideLoadingSection() {
    document.getElementById('loading-section').style.display = 'none';
}

function showContent() {
    document.getElementById('content').style.display = 'block';
}

function clearPopupContent() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
}

function showLoggedOutUI() {
    clearPopupContent(); // Clear the popup content
    hideLoadingSection();
    showContent();
    const contentDiv = document.getElementById('content');
    const loginMessage = document.createElement('h2');
    loginMessage.textContent = 'Login with Google to start PoliTalking:';
    contentDiv.appendChild(loginMessage);

    const loginButton = document.createElement('button');
    loginButton.id = 'google-login-btn';
    loginButton.className = 'google-login-btn'; // Add a class for styling

    // Create an image element for the Google logo
    const googleLogo = document.createElement('img');
    googleLogo.src = 'https://www.svgrepo.com/show/475656/google-color.svg';
    googleLogo.alt = 'Google logo';
    googleLogo.className = 'google-logo'; // Add a class for styling

    // Append the Google logo and text to the button
    loginButton.appendChild(googleLogo);
    loginButton.appendChild(document.createTextNode(' Login with Google'));

    contentDiv.appendChild(loginButton);

    loginButton.addEventListener('click', handleGoogleLogin);
}

function showLoggedInUI(userinfo) {
    hideLoadingSection();
    showContent();
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    const loginMessage = document.createElement('p');
    loginMessage.textContent = "You're logged into your Google Account.";
    contentDiv.appendChild(loginMessage);

    // User profile image
    const userImage = document.createElement('img');
    userImage.src = userinfo.picture;
    userImage.className = 'user-profile-image'; // Added class for styling
    contentDiv.appendChild(userImage);

    // Logout button
    const logoutButton = document.createElement('button');
    logoutButton.id = 'logout-button';
    logoutButton.textContent = 'Logout';
    contentDiv.appendChild(logoutButton);

    // Attach event listener to logout button
    logoutButton.addEventListener('click', handleLogout);
}

function handleGoogleLogin() {
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            alert("Error logging into Google. Please try again.");
        } else if (token) {
            fetchUserProfile(token);
        }
    });
}

async function fetchUserProfile(token) {
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            headers: { Authorization: `Bearer ${token}` },
        });
        const userinfo = await response.json();
        console.log("Fetched user info:", userinfo); // Check user info

        // Prepare user data for the server
        const userData = {
            UUID: userinfo.id,
            Email: userinfo.email,
            FullName: userinfo.name,
            isGoogleVerified: userinfo.verified_email ? 1 : 0,
            isAdminApproved: 0
        };


        // Send user data to your server
        fetch('http://localhost:3000/api/add-extension-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(serverResponse => serverResponse.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error sending data to server:', error));

        // Set local storage and update UI
        chrome.storage.local.set({ isLoggedIn: true, UUID: userinfo.id }, function() {
            console.log("User is marked as logged in and UUID is stored.");
            showLoggedInUI(userinfo); // Ensure this is called
            chrome.runtime.sendMessage({ action: "updateLoginStatus", isLoggedIn: true });
            setTimeout(updateButtonVisibility, 500);
        });

    } catch (error) {
        console.error('Error fetching user profile:', error);
        alert("Failed to fetch user profile.");
        showLoggedOutUI();
        chrome.runtime.sendMessage({ action: "updateLoginStatus", isLoggedIn: false });
    }
}

function handleLogout() {
    chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
        if (token) {
            // Remove the cached token
            chrome.identity.removeCachedAuthToken({ 'token': token }, function() {
                // Clear user data from local storage or other storage mechanisms
                chrome.storage.local.remove(['UUID','userinfo', 'isLoggedIn'], function() {
                    console.log("User is marked as logged out. User info and login status cleared.");
                    // Update the UI to show the logged-out state
                    showLoggedOutUI();
                    chrome.runtime.sendMessage({ action: "updateLoginStatus", isLoggedIn: false });
                    updateButtonVisibility();
                });
            });
        } else {
            // In case there's no token, still clear the user data and update UI
            chrome.storage.local.remove(['userinfo', 'isLoggedIn'], function() {
                showLoggedOutUI();
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    showLoadingSection();
    chrome.storage.local.get(['isLoggedIn'], function(result) {
        if (result.isLoggedIn) {
            chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
                if (token) {
                    fetchUserProfile(token);
                } else {
                    showLoggedOutUI();
                }
            });
        } else {
            showLoggedOutUI();
        }
    });
});
