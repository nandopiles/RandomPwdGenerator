let nameApplication = "";



/**
 * Gets the name of the application which has to filter the passwords.
 * @returns {String}
 */
const getNameApplicationToSearch = () => {
    const value = window.location.search
    const urlParams = new URLSearchParams(value);

    return urlParams.get('name');
};

/**
 * Deletes a password clicking on the delete button.
 * @param {Array} listBtn
 * @returns {void}
 */
const deletePassword = (listBtn) => {
    listBtn.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            Swal.fire({
                title: 'Are you sure?',
                html: 'This action deletes the password and all its information.<br><br><i>Deleted passwords can never be recovered</i>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#0d6efd',
                confirmButtonText: 'Delete'
            }).then((result) => {
                if (result.isConfirmed) {
                    const passwordList = JSON.parse(localStorage.getItem('passwordList')) || [];

                    passwordList.splice(index, 1);
                    localStorage.setItem('passwordList', JSON.stringify(passwordList));
                    loadPasswords(nameApplication);
                }
            });
        });
    });
};

/**
 * Displays all the saved passwords with all the information in a table format.
 * @param {String} nameApplication
 * @returns {void}
 */
const loadPasswords = (nameApplication) => {
    const passwordList = JSON.parse(localStorage.getItem('passwordList')) || [];
    const passwordListFiltered = passwordList.filter(element => element.linkValue.includes(nameApplication));

    document.getElementById('password-table-body').innerHTML = "";
    passwordListFiltered.forEach(element => {
        const row = `
        <tr>
            <td>${element.emailValue}</td>
            <td><a href="${element.linkValue}">${element.linkValue}</a></td>
            <td>${element.passwordValue}</td>
            <td><button type="button" class="btn btn-danger" name="delete-btn">X</button></td>
        </tr>`
        document.getElementById('password-table-body').innerHTML += row;
    });
    deletePassword(document.getElementsByName('delete-btn'));
};



document.getElementById('back-btn').addEventListener('click', () => window.location = 'Index.html');
// Redirects to the List Passwords Page to find all the passwords of the application specified in the search box.
document.getElementById('search-btn').addEventListener('click', () => window.location = `ListPasswords.html?name=${document.getElementById('password-to-find').value}`);
document.getElementById('password-to-find').addEventListener('keyup', (event) => {
    if (event.key === 'Enter')
        window.location = `ListPasswords.html?name=${document.getElementById('password-to-find').value}`
});

nameApplication = getNameApplicationToSearch();
loadPasswords(nameApplication);