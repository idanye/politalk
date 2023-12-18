document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                // If the status code is 401, it's an incorrect username or password
                throw new Error('Incorrect username or password');
            } 
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            localStorage.setItem('userToken', data.token);
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('dashboardContainer').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message); // Show the error message

        if (error.message.includes('Failed to fetch')) {
            alert('Unable to connect to the server. Please try again later.');
        } else {
            alert(error.message);
        }
        // window.location.reload()
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('userToken');

    if (token) {
        // Verify the token with the server
        fetch('http://localhost:3001/dashboardData', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Session invalid');
            }
            return response.json();
        })
        .then(data => {
            // Token is valid - show dashboard and hide login
            document.getElementById('dashboardContainer').style.display = 'block';
            document.getElementById('loginContainer').style.display = 'none';
            fetchUsers();  // Assuming this function fetches and displays dashboard data
        })
        .catch(error => {
            console.error('Error:', error);
            localStorage.removeItem('userToken');
            document.getElementById('loginContainer').style.display = 'block';
            document.getElementById('dashboardContainer').style.display = 'none';
        });
    } else {
        // No token or token invalid - show login form
        document.getElementById('loginContainer').style.display = 'block';
        document.getElementById('dashboardContainer').style.display = 'none';
    }
});


function logout() {
    localStorage.removeItem('userToken');
    // Redirect to login page or show login form
}

function fetchUsers() {
    // Here, make an API call to fetch users
    // Mock data
    const users = [
        { id: 1, email: 'pendinguser@example.com', isApproved: false, linkedInContacts: []},
        { id: 2,
            email: 'approveduser@example.com',
            fullName: 'Jane Doe',
            isApproved: true,
            linkedInContacts: [
                { name: 'John Smith', url: 'https://www.linkedin.com/in/john-smith/' },
                { name: 'Emily White', url: 'https://www.linkedin.com/in/emily-white/' }
            ]
        },
        {
            id: 3,
            email: 'user1@example.com',
            fullName: 'User user',
            isApproved: false,
            linkedInContacts: []
        },
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
    fetch('http://localhost:3001/updateUserStatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('userToken') // Include the auth token if needed
        },
        body: JSON.stringify({ userId, isApproved })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update user status');
        }
        return response.json();
    })
    .then(data => {
        if (isApproved) {
            alert('User status updated successfully');
            moveUserToApproved(userId);
        } else {
            alert('User has been rejected');
            removeUserFromPending(userId);
        }
        fetchUsers();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating user status');
    });
}

function moveUserToApproved(userId) {
    // Find the user in the pending list and move them to the approved list
    // This would involve manipulating the DOM elements
    // Example:
    let userRow = document.getElementById('pendingUser_' + userId);
    document.getElementById('approvedUsersSection').appendChild(userRow);

    // // Refresh or update both sections as needed
    // fetchUsers();
}

function removeUserFromPending(userId) {
    // Remove the user row from the pending list
    // Example:
    let userRow = document.getElementById('pendingUser_' + userId);
    userRow.remove();

    // // Refresh or update the section as needed
    // fetchUsers();
}
