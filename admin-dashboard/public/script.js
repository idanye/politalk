document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
});

function fetchUsers() {
    // Here, make an API call to fetch users
    // Mock data
    const users = [
        { id: 1, email: 'pendinguser@example.com', isApproved: false },
        { id: 2,
            email: 'approveduser@example.com',
            fullName: 'Jane Doe',
            isApproved: true,
            linkedInContacts: [
                { name: 'John Smith', url: 'https://www.linkedin.com/in/john-smith/' },
                { name: 'Emily White', url: 'https://www.linkedin.com/in/emily-white/' }
            ]
        },
            // ...
    ];

    displayPendingUsers(users.filter(user => !user.isApproved));
    displayApprovedUsers(users.filter(user => user.isApproved));
}

function displayPendingUsers(users) {
    const section = document.getElementById('pendingUsersSection');
    let html = '<table><tr><th>Email</th><th>Status</th><th>Actions</th></tr>';

    users.forEach(user => {
        html += `
            <tr>
                <td>${user.email}</td>
                <td>${user.isApproved ? 'Approved' : 'Pending'}</td>
                <td>
                    <button onclick="updateUserStatus(${user.id}, true)">Approve</button>
                    <button onclick="updateUserStatus(${user.id}, false)">Reject</button>
                </td>
            </tr>
        `;
    });

    html += '</table>';
    section.innerHTML = html;
}

function displayApprovedUsers(users) {
    const section = document.getElementById('approvedUsersSection');
    let html = '<table><tr><th>Email</th><th>Full Name</th><th>Status</th><th>LinkedIn Contacts Contacted</th></tr>';

    users.forEach(user => {
        // Generate HTML for LinkedIn contacts
        let linkedInContactsHtml = user.linkedInContacts.map(contact => {
            // Assuming each contact has a 'name' and 'url' property
            return `<a href="${contact.url}" target="_blank">${contact.name}</a>`;
        }).join('<br>'); // Separate contacts with a line break

        html += `
            <tr>
                <td>${user.email}</td>
                <td>${user.fullName}</td>
                <td>${user.isApproved ? 'Approved' : 'Pending'}</td>
                <td>${linkedInContactsHtml}</td>
            </tr>
        `;
    });

    html += '</table>';
    section.innerHTML = html;
}


function showPendingUsers() {
    document.getElementById('pendingUsersSection').style.display = 'block';
    document.getElementById('approvedUsersSection').style.display = 'none';
}

function showApprovedUsers() {
    document.getElementById('pendingUsersSection').style.display = 'none';
    document.getElementById('approvedUsersSection').style.display = 'block';
}

function updateUserStatus(userId, isApproved) {
    // ... update user status logic
}
