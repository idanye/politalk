chrome.runtime.onInstalled.addListener(function() {
    // Perform initialization, if needed
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Received message:', request);
    if (request.message === 'activity') {
        console.log('Sending activity to server:', request.data);
        // Send the activity data to the server
        fetch('http://localhost:5000/activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request.data),
        });
    }
});
