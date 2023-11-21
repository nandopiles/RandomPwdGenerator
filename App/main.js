const minValueRange = 10;
const maxValueRange = 50;
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const passwordGeneratedInput = document.getElementById('password-generated');
let checkboxesChecked = ['lowercase-check'];
let dictionaryToUse = "";



/**
 * Sets up all the info and properties related to the range element.
 * @returns {void}
 */
const setInitialRangeValues = () => {
    document.getElementById('number-characts-selected').textContent = minValueRange;
    document.getElementById('num-characts').setAttribute('min', minValueRange);
    document.getElementById('num-characts').setAttribute('max', maxValueRange);
};

/**
 * Copies to the clipboard the password generated.
 * @returns {void}
 */
const copyPasswordGenerated = () => {
    const initialIconElement = document.getElementById('copy-btn').innerHTML;
    const copyCheckIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="16" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"></path>
    </svg>`;

    navigator.clipboard.writeText(passwordGeneratedInput.value); // copy

    document.getElementById('copy-btn').innerHTML = copyCheckIcon;
    setTimeout(() => {
        document.getElementById('copy-btn').innerHTML = "";
        document.getElementById('copy-btn').innerHTML = initialIconElement;
    }, 700);
};

/**
 * Saves the password with the name of the app where it's use.
 * @returns {void}
 */
const savePassword = () => {
    const initialIconElement = document.getElementById('save-btn').innerHTML;
    const saveCheckIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="16" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
    </svg>`

    document.getElementById('save-btn').innerHTML = saveCheckIcon;
    setTimeout(() => {
        document.getElementById('save-btn').innerHTML = "";
        document.getElementById('save-btn').innerHTML = initialIconElement;
    }, 700);
};

/**
 * Generates a random character depending on the dictionary passed by parameter.
 * @param {String} dictionary the dictionary that contains all the possible values.
 * @returns {String} the random character
 */
const chooseRandomCharacter = (dictionary) => { return dictionary[Math.floor(Math.random() * dictionary.length)] };

/**
 * Contains a letter's dictionary in upper case or lower case depending on the option passed by parameter.
 * 
 * This will say that you want to have an upper case dictionary.
 * @example lettersDictionary(true)
 * 
 * @param {Boolean} isUpperCase if you passed 'true', the dictionary given will be in uppercase.
 * @returns {String} the dictionary.
 */
const lettersDictionary = (isUpperCase) => {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (!isUpperCase)
        return letters.toLowerCase();
    return letters;
};

/**
 * Contains a number's integer dictionary.
 * @returns {String} the dictionary.
 */
const numbersDictionary = () => { return "1234567890"; };

/**
 * Contains a symbol's dictionary.
 * @returns {String} the dictionary.
 */
const symbolsDictionary = () => { return "~!@#$%^&*()_-=+[]{};:<>/?" };

/**
 * Generates a random password with th dictionary 
 * @param {any} length
 * @returns {any}
 */
const generatePassword = (dictionary, length) => {
    let password = "";

    for (let i = 0; i < length; i++) {
        password += chooseRandomCharacter(dictionary);
    }
    return password;
};

/**
 * Adds the info of the new password into the password's list saved.
 * @param {String} linkValue
 * @param {String} emailValue
 * @param {String} passwordValue
 * @returns {void}
 */
const saveInfo = (linkValue, emailValue, passwordValue) => {
    const savedPasswords = JSON.parse(localStorage.getItem('passwordList')) || [];
    const insertInfoNewPassword = { linkValue, emailValue, passwordValue };

    savedPasswords.push(insertInfoNewPassword);
    window.localStorage.setItem('passwordList', JSON.stringify(savedPasswords));
};

/**
 * Validates if the email has the correct format.
 * @param {String} email
 * @returns {Boolean}
 */
const emailValidator = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(pattern.test(email));
    return !pattern.test(email);
};



setInitialRangeValues();
document.getElementById('num-characts').addEventListener('mousemove', () =>
    document.getElementById('number-characts-selected').textContent = document.getElementById('num-characts').value);

// fills the dictionary that will be used with the dictionaries selected.
const addDictionaries = {
    'lowercase-check': () => dictionaryToUse += lettersDictionary(false),
    'uppercase-check': () => dictionaryToUse += lettersDictionary(true),
    'numbers-check': () => dictionaryToUse += numbersDictionary(),
    'symbols-check': () => dictionaryToUse += symbolsDictionary(false)
};

/**
 * Push the checked checkboxes into a list.
 * @param {String} checkbox id of the current checkbox.
 * @returns {void}
 */
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        checkboxesChecked = [];
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked)
                checkboxesChecked.push(checkbox.id);
        })
    })
});

document.getElementById('generate-btn').addEventListener('click', () => {
    dictionaryToUse = "";

    checkboxesChecked.forEach((checkbox) => addDictionaries[checkbox]());
    passwordGeneratedInput.value = generatePassword(dictionaryToUse, document.getElementById('num-characts').value);
});

document.getElementById('copy-btn').addEventListener('click', copyPasswordGenerated);
document.getElementById('save-btn').addEventListener('click', savePassword);

// Displays the modal.
document.getElementById('modalId').addEventListener('show.bs.modal', (event) => {
    event.relatedTarget.getAttribute('data-bs-whatever'); // Displays the save's password modal.
    document.getElementById('modal-password').value = document.getElementById('password-generated').value;
});

// When the modal is hidden all the camps will be reset.
document.getElementById('modalId').addEventListener('hidden.bs.modal', () => {
    document.getElementById('modal-input-email').value = "";
    document.getElementById('modal-input-link').value = "";
});

// Shows the password in a text's format and not with the typical password's format.
document.getElementById('modal-show-password').addEventListener('click', () => {
    let type = "password";

    (document.getElementById('modal-password').type === type) ?
        type = "text" :
        type = "password";

    document.getElementById('modal-password').setAttribute('type', type);
});

// Saves the info of the password.
document.getElementById('modal-form').addEventListener('submit', (event) => {
    event.preventDefault();

    if (document.getElementById('modal-password').value === "" ||
        document.getElementById('modal-input-email').value === "" ||
        document.getElementById('modal-input-link').value === "" ||
        emailValidator(document.getElementById('modal-input-email').value)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            html: 'You must fill all the camps before saving the password.<br><br><br><strong>info: </strong><i>If there\'s any password in the camp is because you have to generated it before.</i><br><br><strong>Email Format: </strong>user@example.com<br><i>You can use letters, numbers, and the following special characters: . _ % + -</i>',
        });
    } else {
        console.log(document.getElementById('modal-input-email').value);
        saveInfo(document.getElementById('modal-input-link').value, document.getElementById('modal-input-email').value, document.getElementById('modal-password').value);
        Swal.fire({
            icon: 'success',
            title: 'Saved',
            html: 'The password has been saved successfully'
        });
    }
});

// Displays the copie's toast.
document.getElementById('copy-btn').addEventListener('click', () => {
    const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));

    toast.show();
    setTimeout(() => {
        toast.hide();
    }, 3000);
});

// Redirects to the List Passwords Page to find all the passwords of the application specified in the search box.
document.getElementById('search-btn').addEventListener('click', () => window.location = `ListPasswords.html?name=${document.getElementById('password-to-find').value}`);
document.getElementById('password-to-find').addEventListener('keyup', (event) => {
    if (event.key === 'Enter')
        window.location = `ListPasswords.html?name=${document.getElementById('password-to-find').value}`
});