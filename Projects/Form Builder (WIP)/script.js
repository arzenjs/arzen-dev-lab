const inputTypeSelect = document.getElementById('input-type');
const addInputBtn = document.getElementById('add-input-btn');
const previewArea = document.getElementById('preview-area');

let radioGroupCount = 0;  // To manage radio button groups

// Event listener for adding inputs
addInputBtn.addEventListener('click', function () {
    const selectedInputType = inputTypeSelect.value;
    addInputField(selectedInputType);
});

// Function to add input field to the preview area
function addInputField(type) {
    const formField = document.createElement('div');
    formField.classList.add('form-field');

    let labelText = prompt('Enter a label for the field:', type);

    if (labelText === null || labelText.trim() === '') {
        labelText = type;
    }

    switch (type) {
        case 'text':
            formField.innerHTML = `<label>${labelText}: <input type="text" name="dynamic-text"></label>`;
            break;

        case 'checkbox':
            formField.innerHTML = `<label><input type="checkbox" name="dynamic-checkbox"> ${labelText}</label>`;
            break;

        case 'radio':
            radioGroupCount++;
            formField.innerHTML = `<label><input type="radio" name="dynamic-radio-group-${radioGroupCount}"> ${labelText}</label>`;
            break;

        default:
            alert('Invalid input type selected');
            return;
    }

    // Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = function () {
        previewArea.removeChild(formField);
    };
    formField.appendChild(removeBtn);

    // Append to the preview area
    previewArea.appendChild(formField);
}