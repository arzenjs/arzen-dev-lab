const boxes = document.querySelectorAll(".box");
const restartBtn = document.querySelector("#restartBtn");
const result = document.querySelector(".result");

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
];

let isXTurn = true;

boxes.forEach(box => {
    box.addEventListener("click", () => {
        box.innerText = isXTurn ? "X" : "O";
        box.style.color = isXTurn ? "red" : "yellow";
        box.disabled = true;
        isXTurn = !isXTurn;
        restartBtn.style.visibility = "visible";
        checkWinner();
    });
});

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            result.textContent = `Winner: ${boxes[a].innerText}`;
            [boxes[a], boxes[b], boxes[c]].forEach(box => {
                box.style.backgroundColor = "grey";
            });
            disableAllBoxes();
            return;
        }
    }

    if ([...boxes].every(box => box.innerText)) {
        result.textContent = "It's a draw!";
    }
}


function disableAllBoxes() {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

restartBtn.addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.style.backgroundColor = "";
    });
    result.textContent = "";
    restartBtn.style.visibility = "hidden";
    isXTurn = true;
});

function createFloatingBackground() {
    const floating_bg = document.querySelector(".floating_bg");
    for (let i = 0; i < 30; i++) {
        const floatingText = document.createElement("div");
        floatingText.classList.add("floating_texts");
        floatingText.innerText = Math.random() > 0.5 ? "X" : "O";
        floatingText.style.top = `${Math.random() * 100}vh`;
        floatingText.style.left = `${Math.random() * 100}vw`;
        floating_bg.appendChild(floatingText);
    }
}

createFloatingBackground();