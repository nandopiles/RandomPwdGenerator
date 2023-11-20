const deletePassword = (listBtn) => {
    listBtn.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const passwordList = JSON.parse(localStorage.getItem('passwordList')) || [];

            passwordList.splice(index, 1);
            localStorage.setItem('passwordList', JSON.stringify(passwordList));
            loadPasswords();
        });
    });
};

const loadPasswords = () => {
    const passwordList = JSON.parse(localStorage.getItem('passwordList')) || [];

    document.getElementById('password-table-body').innerHTML = "";
    passwordList.forEach(element => {
        const row = `
        <tr>
            <td>${element.emailValue}</td>
            <td>${element.linkValue}</td>
            <td>${element.passwordValue}</td>
            <td><button type="button" class="btn btn-danger" name="delete-btn">X</button></td>
        </tr>`
        document.getElementById('password-table-body').innerHTML += row;
    });
    deletePassword(document.getElementsByName('delete-btn'));
};



document.getElementById('back-btn').addEventListener('click', () => window.location = 'Index.html');
loadPasswords();