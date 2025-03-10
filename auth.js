// Predefined users (in real application, this would be stored securely on a server)
const VALID_USERS = {
    'admin': 'hp2024admin',
    'voditelj': 'hp2024voditelj'
};

// Check if user is already logged in
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('authenticated');
    const currentPage = window.location.pathname.split('/').pop();
    
    // If on ranglista.html and not authenticated, redirect to login
    if (currentPage === 'ranglista.html' && !isAuthenticated) {
        window.location.href = 'login.html';
    }
    
    // If on login page and already authenticated, redirect to ranglista
    if (currentPage === 'login.html' && isAuthenticated) {
        window.location.href = 'ranglista.html';
    }
}

// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (VALID_USERS[username] === password) {
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('username', username);
        window.location.href = 'ranglista.html';
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
});

// Add logout functionality
function logout() {
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Check authentication on page load
checkAuth(); 