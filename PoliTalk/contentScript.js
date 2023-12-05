function injectCSS() {
  const link = document.createElement('link');
  link.href = chrome.runtime.getURL('extensionButton.css');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

function addHoverEffect(button, icon) {
  const normalIconSrc = chrome.runtime.getURL('images/PoliTalk.png'); // Normal icon
  const hoverIconSrc = chrome.runtime.getURL('images/PoliTalkHover.png'); // Hover icon

  button.onmouseover = function () {
    icon.src = hoverIconSrc; // Change to hover icon
  };
  button.onmouseout = function () {
    icon.src = normalIconSrc; // Revert to normal icon
  };
}

function createLinkedInButton() {
  if (document.querySelector('.extension_button')) {
    return; // If the button exists, exit the function
  }
  const navItems = document.querySelector('#global-nav > div > nav > ul');
  if (navItems) {
    const extensionButton = document.createElement('li');
    extensionButton.className = 'extension_button';

    // Create a container for the icon and text
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon_container';

    // Create and add the icon
    const icon = document.createElement('img');
    icon.src = chrome.runtime.getURL('images/PoliTalk.png');
    iconContainer.appendChild(icon);

    // Create and add the text
    const text = document.createElement('span');
    text.textContent = 'PoliTalk';
    iconContainer.appendChild(text);

    // Add the icon container to the button
    extensionButton.appendChild(iconContainer);

    // Style the button and icon
    addHoverEffect(extensionButton, icon);

    extensionButton.addEventListener('click', handleButtonClick);
    navItems.insertBefore(extensionButton, navItems.firstChild);
  }
}

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (document.querySelector('#global-nav > div > nav > ul')) {
      createLinkedInButton();
      observer.disconnect(); // Stop observing after the button is added
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
injectCSS();

function handleButtonClick() {
  // Logic to generate 3 random students and give the option to look up for them
  // This logic should mirror what you have in your popup.js
}
