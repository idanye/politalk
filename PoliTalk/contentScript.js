function injectCSS(callback) {
  const link = document.createElement('link');
  link.href = chrome.runtime.getURL('extensionButton.css');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.onload = callback;
  document.head.appendChild(link);
}

function makeButtonVisible() {
  const extensionButton = document.querySelector('.extension_button');
  if (extensionButton) {
    extensionButton.style.visibility = 'visible';
  }
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
    extensionButton.style.visibility = 'hidden';

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

    // Create and add the line
    const line = document.createElement('div');
    line.className = 'underline';
    iconContainer.appendChild(line);

    // Add the icon container to the button
    extensionButton.appendChild(iconContainer);

    // Style the button and icon
    addHoverEffect(extensionButton, icon);

    // Create the popup
    createPopup();

    extensionButton.addEventListener('click', function() {
      this.classList.toggle('show-line');
      const popup = document.getElementById('politalk_popup');
      if (popup) {
        if (!popup.classList.contains('show-popup')) {
          const rect = this.getBoundingClientRect();
          popup.style.top = `${rect.bottom}px`; // Position below the button
          popup.style.left = `${rect.left}px`; // Align with the left edge of the button
        }
        popup.classList.toggle('show-popup');
      }
    });
    navItems.insertBefore(extensionButton, navItems.firstChild);
  }
}

function createPopup() {
  // Check if the popup already exists to avoid duplicates
  if (document.getElementById('politalk_popup')) {
    return;
  }

  // Create the popup container
  const popup = document.createElement('div');
  popup.id = 'politalk_popup';
  popup.className = 'politalk_popup';

  // Create and add the title
  const title = document.createElement('h2');
  title.textContent = 'Start PoliTalking With:';
  popup.appendChild(title);

  // Example data for the cards
  const exampleProfiles = [
    {
      name: 'Lia Opperman',
      image: 'https://media.licdn.com/dms/image/D4E03AQGWrT4EHIcWeA/profile-displayphoto-shrink_100_100/0/1700504577540?e=1706745600&v=beta&t=bLXgZZ4b_taqHccpD-SHR-mrQ2UvnxclmhJM1pV-ExY', // Replace with actual image path or URL
      description: 'Policy and Journalism Student at Princeton University',
      profileLink: 'https://www.linkedin.com/in/lia-opperman-56545a176'
    },
    {
      name: 'Christina Sorochinsky',
      image: 'https://media.licdn.com/dms/image/C4D03AQFVq0B02xqunA/profile-displayphoto-shrink_100_100/0/1662696016084?e=1706745600&v=beta&t=KBrSAM4aJkUCGUrCglpPERvYp2YahLzCAe9qwgWxNSA',
      description: 'Student at Harvard University',
      profileLink: 'https://www.linkedin.com/in/christina-sorochinsky-12796324b'

    },
    {
      name: 'Lily Zamora',
      image: 'https://media.licdn.com/dms/image/C4E03AQFT3SJpwRxBDA/profile-displayphoto-shrink_100_100/0/1660240894014?e=1707350400&v=beta&t=cE7YSEZFLMjSqILIJSk7ZDM1wQgyuiU0LNVcMVQIBAY',
      description: 'Student at Brown University',
      profileLink: 'https://www.linkedin.com/in/lily-zamora-679a9123a'
    }
  ];
  let currentIndex = 0;

  // Update the card with the profile data
  let lastDirection = 'right';
  const updateProfileCard = () => {
    if (popup.querySelector('.card')) {
      popup.removeChild(popup.querySelector('.card'));
    }

    const profile = exampleProfiles[currentIndex];

    const card = document.createElement('div');
    card.className = 'card';
  
    const img = document.createElement('img');
    img.src = profile.image;
    img.alt = profile.name;
    img.className = 'profile-image';
    card.appendChild(img);
  
    const name = document.createElement('h3');
    name.textContent = profile.name;
    card.appendChild(name);
  
    const description = document.createElement('p');
    description.textContent = profile.description;
    card.appendChild(description);

    // Set the animation based on the last direction
    card.style.animation = lastDirection === 'right' 
    ? 'slideInFromRight 0.5s ease' 
    : 'slideInFromLeft 0.5s ease';
    popup.appendChild(card);
    
    // 'Look Up' button
    const lookupButton = document.createElement('button');
    lookupButton.textContent = 'Look Up';
    lookupButton.className = 'lookup-button';
    lookupButton.onclick = () => {
      window.open(profile.profileLink, '_blank');
    };
    card.appendChild(lookupButton);

    // 'Contact' button
    const contactButton = document.createElement('button');
    contactButton.textContent = `Contact ${profile.name.split(' ')[0]}`; // Using first name for the button text
    contactButton.className = 'contact-button';
    contactButton.onclick = function(event) {
      event.stopPropagation(); // Prevent the document click from closing the menu immediately
      const dropdownMenu = this.nextElementSibling;
      dropdownMenu.classList.toggle('show-dropdown');
    };
    card.appendChild(contactButton);
    
    // Dropdown Menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu';

    const directMessageOption = document.createElement('div');
    directMessageOption.textContent = 'Send Direct Message';
    directMessageOption.className = 'dropdown-option';
    dropdownMenu.appendChild(directMessageOption);

    const copyTemplateOption = document.createElement('div');
    copyTemplateOption.textContent = 'Copy Template Message';
    copyTemplateOption.className = 'dropdown-option';
    dropdownMenu.appendChild(copyTemplateOption);

    card.appendChild(dropdownMenu);

    // Clearing the floats
    const clearDiv = document.createElement('div');
    clearDiv.className = 'clear-div';
    card.appendChild(clearDiv);
  };

  updateProfileCard(); // Initial profile card
  // Create and add navigation arrows
  const prevArrow = document.createElement('img');
  prevArrow.src = chrome.runtime.getURL('images/prevArrow.svg');
  prevArrow.className = 'arrow left';
  prevArrow.onclick = () => {
    lastDirection = 'left';
    currentIndex = (currentIndex - 1 + exampleProfiles.length) % exampleProfiles.length;
    updateProfileCard();
  };

  const nextArrow = document.createElement('img');
  nextArrow.src = chrome.runtime.getURL('images/nextArrow.svg');
  nextArrow.className = 'arrow right';
  nextArrow.onclick = () => {
    lastDirection = 'right';
    currentIndex = (currentIndex + 1) % exampleProfiles.length;
    updateProfileCard();
  };

  popup.appendChild(prevArrow);
  popup.appendChild(nextArrow);
  // Append the popup to the document body
  document.body.appendChild(popup);

  popup.addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent clicks within the popup from closing it
  });
}

document.addEventListener('click', function(event) {
  // Close all dropdown menus if the clicked target is not part of a dropdown menu
  document.querySelectorAll('.dropdown-menu').forEach(function(menu) {
    if (!menu.contains(event.target) && !event.target.classList.contains('contact-button')) {
      menu.classList.remove('show-dropdown');
    }
  });

  const popup = document.getElementById('politalk_popup');
  const extensionButton = document.querySelector('.extension_button');
  if (popup && !popup.contains(event.target) && !event.target.closest('.extension_button')) {
    popup.classList.remove('show-popup');
    extensionButton.classList.remove('show-line');
  }
});

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (document.querySelector('#global-nav > div > nav > ul')) {
      createLinkedInButton();
      observer.disconnect(); // Stop observing after the button is added
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
injectCSS(makeButtonVisible);

