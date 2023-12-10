document.addEventListener('DOMContentLoaded', function () {
    fetchUsers();
  });
  
  function fetchUsers() {
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            users.forEach(user => {
                const approvalStatus = user.is_approved ? 'Yes' : 'No';
                const userDiv = document.createElement('div');
                userDiv.className = 'user';
                userDiv.innerHTML = `
                    <div class="user-info">Name: ${user.name}</div>
                    <div class="user-info">Email: ${user.email}</div>
                    <div class="user-info approval-status ${user.is_approved ? 'approved' : 'not-approved'}">Approved: ${approvalStatus}</div>
                    <button class="approve-btn" onclick="updateApproval('${user.google_id}', true)">Approve</button>
                    <button class="disapprove-btn" onclick="updateApproval('${user.google_id}', false)">Disapprove</button>
                `;
                userList.appendChild(userDiv);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
  }
  
  
  function updateApproval(googleId, isApproved) {
    fetch('/approve-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ googleId, isApproved })
    })
        .then(response => {
            if (response.ok) {
                fetchUsers(); // Refresh the user list
            } else {
                console.error('Error updating user approval status');
            }
        })
        .catch(error => console.error('Error:', error));
  }
  
  function updateDailyClickLimit() {
    const dailyLimit = document.getElementById('dailyClickLimitInput').value;
    if (dailyLimit) {
        fetch('/set-daily-click-limit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dailyLimit: parseInt(dailyLimit, 10) })
        })
            .then(response => {
                if (response.ok) {
                    alert('Daily click limit updated');
                } else {
                    alert('Error updating daily click limit');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error updating daily click limit');
            });
    }
  }