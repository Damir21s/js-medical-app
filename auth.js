
document.querySelector('#modalSubmit').onclick = async function () {
    await fetch('data/db.json')
        .then(response => response.json())
        .then(data => auth(data));
}

const setItemQuery = async function (dataAuth, name) {
    //Вообще, localStorage синхронен, но привычности ради, использую метод fetch
    await Promise.all([
        fetch(localStorage.setItem(Object.keys(dataAuth), JSON.stringify(Object.values(dataAuth)))),
        fetch(localStorage.setItem(Object.keys(name), Object.values(name)))
    ]);
}

function auth(data) {
    const enteredlogin = document.getElementById('login').value;
    const enteredPassword = document.getElementById('password').value;
    const auth = data.find(item => item.login === enteredlogin && item.password === enteredPassword);

    if (auth) {
        const authDataPerson = {
            'login': enteredlogin,
            'password': enteredPassword
        }
        try {
            setItemQuery({ 'dataAuth': authDataPerson }, { 'name': auth.name });
            const modalOverlay = document.querySelector('.modal-overlay ');
            modalOverlay.classList.remove('modal-overlay--visible');
            modals.forEach((el) => el.classList.remove('modal--visible'));
            window.location.href = 'profile.html';

        } catch (error) {
            document.getElementsByTagName('body')[0].innerHTML = 'Ошибка';
        }
    }
    else {
        if (validateForm(enteredlogin, enteredPassword) === true) {
            document.querySelector('.modal-find_user').innerHTML = 'Пользователь не существует';
        }
    }
}

function closeModalError() {
    const validateClassArr = ['.modal-find_user', '.modal-validate_login', '.modal-validate_password'];

    validateClassArr.forEach((el) => {
        if (document.querySelector(el).innerHTML !== '') {
            document.querySelector(el).innerHTML = '';
        }
    })
}

function validateForm(login, password) {

    if (login === '') {
        document.querySelector('.modal-validate_login').innerHTML = 'Введите логин';
        return false;
    } else if (password.length < 6) {
        document.querySelector('.modal-validate_password').innerHTML = 'Пароль должен быть не менее 6 символов';
        return false;
    }
    return true;
}

