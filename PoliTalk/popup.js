document.addEventListener('DOMContentLoaded', function () {
  loadContacts();
  document
    .getElementById('refreshButton')
    .addEventListener('click', loadContacts);
});

function loadContacts() {
  var contactList = document.getElementById('contactList');
  contactList.innerHTML = ''; // Clear existing contacts
  var contacts = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Davis",
    "Diana Reed",
    "Ethan Hall",
    "Fiona Clarke",
    "George Wright",
    "Hannah Scott",
    "Isaac Phillips",
    "Jack Roberts",
    "Katie Green",
    "Liam Edwards",
    "Mia Lewis",
    "Nathan Wood",
    "Olivia Harris",
    "Ran Zaaroor",
    "Sophie King"
  ]; // Your dummy contacts

  // Get three random contacts
  var randomContacts = getRandomContacts(contacts, 3);

  randomContacts.forEach(function (contact, index) {
    var div = document.createElement('div');
    div.className = 'contact-box';

    // Create contact button
    var button = document.createElement('button');
    button.className = 'contact-button';
    button.textContent = contact;
    button.onclick = function (event) {
      toggleDropdown(event, index);
    };
    div.appendChild(button);
    contactList.appendChild(div);

    // Create dropdown content
    var dropdownContent = document.createElement('div');
    dropdownContent.id = 'dropdown-' + index;
    dropdownContent.className = 'dropdown-content';
    var lookupLink = document.createElement('a');
    lookupLink.href = '#';
    lookupLink.textContent = 'Look up';
    lookupLink.addEventListener('click', function() {
      var searchQuery = contact.split(' ').join('%20'); // Replace spaces with URL-encoded spaces
      var linkedInSearchUrl = `https://www.linkedin.com/search/results/all/?keywords=${searchQuery}`;
      window.open(linkedInSearchUrl, '_blank'); // Open LinkedIn search in a new tab
    });
    dropdownContent.appendChild(lookupLink);

    var messageLink = document.createElement('a');
    messageLink.href = '#';
    messageLink.textContent = 'Generate message';
    // Add event listener for 'Send Message' functionality
    // Implement logic to generate a built-in message
    dropdownContent.appendChild(messageLink);

    document.body.appendChild(dropdownContent); // Append dropdowns directly to body
  });
}

function toggleDropdown(event, index) {
  // Close all open dropdowns first
  var dropdowns = document.getElementsByClassName('dropdown-content');
  for (var i = 0; i < dropdowns.length; i++) {
    if (i !== index) {
      // Exclude the current dropdown
      dropdowns[i].classList.remove('show');
    }
  }
  var dropdown = document.getElementById('dropdown-' + index);
  var buttonRect = event.target.getBoundingClientRect();
  dropdown.style.left = buttonRect.right + 'px'; // Position to the right of the button
  dropdown.style.top = buttonRect.top + 'px'; // Align to the top of the button
  dropdown.classList.toggle('show');
}

function getRandomContacts(contacts, num) {
  var randomContacts = [];
  var usedIndices = new Set(); // To keep track of used indices

  while(randomContacts.length < num) {
    var randomIndex = Math.floor(Math.random() * contacts.length);
    if (!usedIndices.has(randomIndex)) {
      randomContacts.push(contacts[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  return randomContacts;
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.contact-button')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
