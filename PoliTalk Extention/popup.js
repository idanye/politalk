// popup.js
const loginButton = document.getElementById('google-login-btn');
const loginSection = document.getElementById('login-section');

// Check if the user is already authenticated
chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
    if (token) {
        // User is already authenticated; fetch user profile
        fetchUserProfile(token, loginSection);
    }
});

loginButton.addEventListener('click', function() {
    handleGoogleLogin(loginSection);
});

function handleGoogleLogin(loginSection) {
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            alert("Error logging into Google. Please try again.");
            // Handle errors here
        } else if (token) {
            fetchUserProfile(token, loginSection);
        }
    });
}

function fetchUserProfile(token, loginSection) {
    fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => response.json())
    .then((userinfo) => {
        console.log("Fetched user info:", userinfo);
        updateUserInterface(userinfo, loginSection);
    })
    .catch((error) => {
        console.error(error);
        // Handle fetch errors here
    });
}

function updateUserInterface(userinfo, loginSection) {
    // Add PoliTalk logo at the top
    const logo = document.createElement('img');
    logo.src = 'path_to_politalk_logo.png'; // Path to your PoliTalk logo image
    logo.style.width = '100px'; // Adjust size as needed
    logo.style.display = 'block';
    logo.style.margin = '0 auto'; // Center the logo
    loginSection.innerHTML = ''; // Clear the previous content
    loginSection.appendChild(logo);

    // Add text message
    const loginMessage = document.createElement('p');
    loginMessage.textContent = "Logged into Google successfully. Waiting for admin approval...";
    loginSection.appendChild(loginMessage);

    // Add Google profile picture
    const userImage = document.createElement('img');
    userImage.src = userinfo.picture; // Google profile picture
    userImage.style.borderRadius = '50%'; // Make it circular
    userImage.style.width = '50px'; // Set image size
    userImage.style.position = 'absolute';
    userImage.style.bottom = '10px';
    userImage.style.right = '10px';
    loginSection.appendChild(userImage);
}
