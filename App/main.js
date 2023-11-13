const minValueRange = 7;
const maxValueRange = 33;
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
let checkboxesChecked = ['lowercase-check'];



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
 * Generates a random letter in upper case or lower case depending on the option passed by parameter.
 * 
 * This will say that you want to generate an upper case letter.
 * @example lettersDictionary(true)
 * 
 * @param {Boolean} isUpperCase if you passed 'true', the letter given will be uppercase.
 * @returns {String} a single random letter.
 */
const lettersDictionary = (isUpperCase) => {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (!isUpperCase)
        letters = letters.toLowerCase();

    return chooseRandomCharacter(letters);
}

/**
 * Generates a random number without decimals.
 * @returns {String} a random number
 */
const numbersDictionary = () => {
    const numbers = "1234567890";

    return chooseRandomCharacter(numbers);
}

/**
 * Generates a random symbol.
 * @returns {String} a single symbol.
 */
const symbolsDictionary = () => {
    const symbols = "~!@#$%^&*()_-=+[]{};:<>/?";

    return chooseRandomCharacter(symbols);
}



setInitialRangeValues();
document.getElementById('num-characts').addEventListener('mousemove', () =>
    document.getElementById('number-characts-selected').textContent = document.getElementById('num-characts').value);

const actions = {
    'lowercase-check': () => console.log('lower'),
    'uppercase-check': () => console.log('upper'),
    'numbers-check': () => console.log('numbers'),
    'symbols-check': () => console.log('symbols')
};



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
    checkboxesChecked.forEach((checkbox) => {
        actions[checkbox]();
    })
});