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
 * Saves the password in the Local Storage with the key passed by parameter.
 * @param {String} password
 * @param {String} key
 * @returns {void}
 */
const saveInLocalStorage = (password, key) => {

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

// Displays the save's password modal.
document.getElementById('modalId').addEventListener('show.bs.modal', (event) => event.relatedTarget.getAttribute('data-bs-whatever'));

// Displays the copie's toast.
document.getElementById('copy-btn').addEventListener('click', () => {
    const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));

    toast.show();
    setTimeout(() => {
        toast.hide();
    }, 3000);
})
