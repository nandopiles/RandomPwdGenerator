const minValueRange = 7;
const maxValueRange = 33;



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
