const loadPasswords = () => {
    const passwordList = JSON.parse(localStorage.getItem('passwordList')) || [];

    document.getElementById('password-table-body').innerHTML = "";
    passwordList.forEach(element => {
        const row = `
        <tr>
            <td>${element.emailValue}</td>
            <td>${element.linkValue}</td>
            <td>${element.passwordValue}</td>
        </tr>`
        document.getElementById('password-table-body').innerHTML += row;
    });
};



document.getElementById('back-btn').addEventListener('click', () => window.location = 'Index.html');
loadPasswords();