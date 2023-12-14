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
        window.location.reload()
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('userToken');
    
    // Check if token exists
    if (token) {
        // If token exists, verify it with the server
        fetch('http://localhost:3001/dashboardData', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Session invalid');
            }
            return response.json(); // Assuming dashboard data is returned
        })
        .then(data => {
            // Handle dashboard data
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('dashboardContainer').style.display = 'block';
            fetchUsers(); // Fetch users now that we're logged in
            // Process and display the dashboard data as needed
        })
        .catch(error => {
            console.error('Error:', error);
            localStorage.removeItem('userToken');
            document.getElementById('loginContainer').style.display = 'block';
            document.getElementById('dashboardContainer').style.display = 'none';
            // Optionally, redirect to the login page or show a login form
        });
    } else {
        // If no token, show the login form
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
