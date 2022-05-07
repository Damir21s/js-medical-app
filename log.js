
const userName = localStorage.getItem('name');

if (userName != null) {
    const btns = document.querySelectorAll('.login-btn');
    btns.forEach((el) => {el.innerHTML = 'Выйти'});
    if (document.getElementById('profile_title') != null) {
        document.getElementById('profile_title').innerHTML += userName;
    }
}
else {
    if (window.location.pathname == '/profile.html') {
        window.location.href = 'index.html';
    }
}
