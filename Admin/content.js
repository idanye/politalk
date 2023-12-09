console.log('Sending activity message from content script');
chrome.runtime.sendMessage({
    message: 'activity',
    data: {
        // Your activity data
    },
});