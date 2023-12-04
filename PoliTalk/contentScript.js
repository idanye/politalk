function createLinkedInButton() {
  if (document.querySelector('.extension_button')) {
    return; // If the button exists, exit the function
  }
  const navItems = document.querySelector('#global-nav > div > nav > ul');
  if (navItems) {
    const extensionButton = document.createElement('li');
    extensionButton.className = 'extension_button';
    const icon = document.createElement('img');
    icon.src = chrome.runtime.getURL('images/PoliTalk.png');

    styleExtensionButton(extensionButton, icon);
    extensionButton.appendChild(icon);

    extensionButton.addEventListener('click', handleButtonClick);
    navItems.insertBefore(extensionButton, navItems.firstChild);
    injectCSS();
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

function handleButtonClick() {
  // Logic to generate 3 random students and give the option to look up for them
  // This logic should mirror what you have in your popup.js
}

function styleExtensionButton(button, icon) {
  button.style.cursor = 'pointer';
  button.style.padding = '0 10px';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';

  icon.style.width = '40px';
  icon.style.height = '40px';

  // Add hover effect
  const normalIconSrc = chrome.runtime.getURL('images/PoliTalk.png'); // Normal icon
  const hoverIconSrc = chrome.runtime.getURL('images/PoliTalkHover.png'); // Hover icon

  button.onmouseover = function() {
    icon.src = hoverIconSrc; // Change to hover icon
  };
  button.onmouseout = function() {
    icon.src = normalIconSrc; // Revert to normal icon
  };
}
