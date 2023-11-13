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



setInitialRangeValues();
document.getElementById('num-characts').addEventListener('mousemove', () => {
    document.getElementById('number-characts-selected').textContent = document.getElementById('num-characts').value;
});

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
})
document.getElementById('generate-btn').addEventListener('click', () => {
    checkboxesChecked.forEach((checkbox) => {
        actions[checkbox]();
    })
})