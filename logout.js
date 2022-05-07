
function logout() {
    const btn = document.querySelector('.login-btn');

    if (btn.innerHTML == 'Выйти') {
        localStorage.clear();
        if (window.location.pathname == '/profile.html') {
            window.location.href = 'index.html';
        }
        else {
            window.location.reload();
        }
    }
}