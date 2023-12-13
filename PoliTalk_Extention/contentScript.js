let fetchedStudents = null;
let currentIndex = 0;
let lastDirection = 'right';

// Check login status and show/hide the button accordingly
function updateButtonVisibility() {
    chrome.runtime.sendMessage({ action: "checkLoginStatus" }, function (response) {
        if (response.isLoggedIn) {
            makeButtonVisible();
        } else {
            hideButton();
        }
    });
}

function hideButton() {
    const extensionButton = document.querySelector('.extension_button');
    if (extensionButton) {
        extensionButton.style.display = 'none';
    }
}

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
    updateButtonVisibility();

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

    extensionButton.addEventListener('click', async function () {
      this.classList.toggle('show-line');
      let popup = document.getElementById('politalk_popup');
      // Create the popup if it doesn't exist
      if (!popup) {
        createPopup();
        popup = document.getElementById('politalk_popup'); //assign the new popup
      }
      const rect = this.getBoundingClientRect();
      popup.style.top = `${rect.bottom}px`;
      popup.style.left = `${rect.left}px`;

      if (!fetchedStudents) {
        await fetchRandomStudents();
      }
      updateProfileCard();
      popup.classList.toggle('show-popup');
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

  const templateMessage = `Hi, \n My name is...`; //Created a python function for this
  // Function to copy text to clipboard
  const copyToClipboard = text => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Message copied to clipboard!"); // Alert or any other notification
    });
  };
  
  // Create and add navigation arrows
  const prevArrow = document.createElement('img');
  prevArrow.src = chrome.runtime.getURL('images/prevArrow.svg');
  prevArrow.className = 'arrow left';
  prevArrow.onclick = () => {
    lastDirection = 'left';
    currentIndex = (currentIndex - 1 + fetchedStudents.length) % fetchedStudents.length;
    updateProfileCard();
  };

  const nextArrow = document.createElement('img');
  nextArrow.src = chrome.runtime.getURL('images/nextArrow.svg');
  nextArrow.className = 'arrow right';
  nextArrow.onclick = () => {
    lastDirection = 'right';
    currentIndex = (currentIndex + 1) % fetchedStudents.length;
    updateProfileCard();
  };

  updateProfileCard();
  popup.appendChild(prevArrow);
  popup.appendChild(nextArrow);

  popup.addEventListener('click', function (event) {
    // Close any open dropdown menus when clicking inside the popup but outside the menus
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(function (menu) {
      const contactButton = menu.previousElementSibling;
      if (
        !menu.contains(event.target) &&
        !contactButton.contains(event.target)
      ) {
        menu.classList.remove('show-dropdown');
      }
    });

    event.stopPropagation(); // Prevent clicks within the popup from closing it
  });
  // Append the popup to the document body
  document.body.appendChild(popup);

  popup.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent clicks within the popup from closing it
  });
}

const updateProfileCard = () => {
  if(document.getElementById('card')) {
    document.getElementById('card').remove();
  }
  const popup = document.getElementById('politalk_popup');
  if (fetchedStudents && fetchedStudents.length > 0) {
    const student = fetchedStudents[currentIndex];

    const card = document.createElement('div');
    card.className = 'card';
    card.id = 'card';

    // Profile Image
    const img = document.createElement('img');
    img.src = student.PictureURL;
    img.alt = `${student.FirstName} ${student.LastName}`;
    img.className = 'profile-image';
    card.appendChild(img);

    // Student Name
    const name = document.createElement('h3');
    name.textContent = `${student.FirstName} ${student.LastName}`;
    card.appendChild(name);

    // Student Description (Headline)
    const description = document.createElement('p');
    description.textContent = student.Headline;
    card.appendChild(description);

    // Set the animation based on the last direction
    card.style.animation =
      lastDirection === 'right'
        ? 'slideInFromRight 0.5s ease'
        : 'slideInFromLeft 0.5s ease';

    popup.appendChild(card);

    // 'Contact' button
    const contactButton = document.createElement('button');
    contactButton.textContent = `Contact ${student.FirstName}`;
    contactButton.className = 'contact-button';
    contactButton.onclick = function (event) {
      event.stopPropagation(); // Prevent the document click from closing the menu immediately
      this.nextElementSibling.classList.toggle('show-dropdown');
    };
    card.appendChild(contactButton);

    // Dropdown Menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu';

    // View Profile option
    const viewProfileOption = document.createElement('div');
    viewProfileOption.textContent = 'View Profile';
    viewProfileOption.className = 'dropdown-option';
    viewProfileOption.onclick = () => window.open(student.ProfileURL, '_blank');
    dropdownMenu.appendChild(viewProfileOption);

    // Copy Template Message option
    const copyTemplateOption = document.createElement('div');
    copyTemplateOption.textContent = 'Copy Template Message';
    copyTemplateOption.className = 'dropdown-option';
    copyTemplateOption.onclick = () => copyToClipboard(templateMessage);
    dropdownMenu.appendChild(copyTemplateOption);

    card.appendChild(dropdownMenu);

    // Clearing the floats
    const clearDiv = document.createElement('div');
    clearDiv.className = 'clear-div';
    card.appendChild(clearDiv);
  }
};

async function fetchRandomStudents() {
  try {
    const response = await fetch('http://localhost:3000/random-students');
    const data = await response.json();
    if (data && data.data) {
      fetchedStudents = data.data;
      currentIndex = 0;
    }
  } catch (error) {
    console.error('Error fetching random students:', error);
  }
}

document.addEventListener('click', function (event) {
  // Close any open dropdown menus if the click is outside the menu
  document.querySelectorAll('.dropdown-menu').forEach(function (menu) {
    const contactButton = menu.previousElementSibling;
    if (!menu.contains(event.target) && !contactButton.contains(event.target)) {
      menu.classList.remove('show-dropdown');
    }
  });

  // Handle clicks outside the popup
  const popup = document.getElementById('politalk_popup');
  const extensionButton = document.querySelector('.extension_button');
  if (
    popup &&
    !popup.contains(event.target) &&
    !event.target.closest('.extension_button')
  ) {
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
