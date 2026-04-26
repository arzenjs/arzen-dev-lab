const main = document.querySelector("main");
const button = document.querySelector("button");
const codeContainer = document.querySelector(".code-container");
const codeText = document.querySelector(".code-text");

function GetRandomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    let rgb = `rgb(${r}, ${g}, ${b})`;
    return rgb;
}

button.addEventListener("click", () => {
    codeContainer.style.display = "block";
    codeText.style.display = "block";
    let color = GetRandomColor();
    main.style.backgroundColor = color;
    codeText.innerText = color;
})