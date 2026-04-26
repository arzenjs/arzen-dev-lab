// Function to change background color
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

// Add custom color to the panel
document.getElementById("addColorButton").addEventListener("click", function () {
    const colorPicker = document.getElementById("customColorPicker");
    const color = colorPicker.value;

    // Create a new button for the custom color
    const newButton = document.createElement("button");
    newButton.classList.add("color-button");
    newButton.style.backgroundColor = color;
    newButton.addEventListener("click", function () {
        let colorPanel = document.getElementById("colorPanel")
        changeBackgroundColor(color);
    });
    document.getElementById("colorPanel").appendChild(newButton);
});