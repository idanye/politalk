document.addEventListener('DOMContentLoaded', function() {
    // Fetch user data from the backend and display it on the admin dashboard
    fetch('http://localhost:5000/usersinfo.db')
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('userList');
            userList.innerHTML = '<h2>User List</h2>';
            users.forEach(user => {
                userList.innerHTML += `<p>${user.username} - ${user.is_approved ? 'Approved' : 'Pending Approval'}</p>`;
            });
        });
});
