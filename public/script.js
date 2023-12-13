document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
});

function fetchUsers() {
    // Mock data - replace with API call
    const users = [
        { id: 1, email: 'user1@example.com', isApproved: false },
        { id: 2, email: 'user2@example.com', isApproved: true },
        // Add more mock users or fetch from your API
    ];

    const contentDiv = document.getElementById('dashboardContent');
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
    contentDiv.innerHTML = html;
}

function updateUserStatus(userId, isApproved) {
    console.log(`Updating user ${userId} to ${isApproved}`);
    // Here you would make an API call to update the user status
    // After updating, you might want to re-fetch the user list:
    // fetchUsers();
}
