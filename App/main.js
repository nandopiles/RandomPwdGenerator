const minValueRange = 7;
const maxValueRange = 33;
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
            if (checkbox.checked) {
                checkboxesChecked.push(checkbox.id);
            }
        })
    })
});

document.getElementById('generate-btn').addEventListener('click', () => {
    dictionaryToUse = "";
    checkboxesChecked.forEach((checkbox) => {
        addDictionaries[checkbox]();
    })
    passwordGeneratedInput.value = generatePassword(dictionaryToUse, document.getElementById('num-characts').value);
});