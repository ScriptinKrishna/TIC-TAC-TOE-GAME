// Selecting elements
let boxes = document.querySelectorAll(".box");
let msg = document.querySelector(".msg");
let winnerContainer = document.querySelector(".msg-container");
let newGame = document.querySelector(".new-game");

// Initializing variables
let turnO = true;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to check if there's a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos1Val === pos3Val) {
            return pos1Val; // Return the winner (X or O)
        }
    }
    return null; // Return null if no winner is found
}

// Function to check if it's a draw
const checkDraw = () => {
    const allBoxesFilled = [...boxes].every(box => box.textContent !== "");
    if (allBoxesFilled && !checkWinner()) {
        return true; // Return true if it's a draw
    }
    return false; // Return false otherwise
}

// Function to show the winner or declare a draw
const showWinner = (winner) => {
    if (winner === 'draw') {
        msg.textContent = `It's a draw!`;
    } else if (winner) {
        msg.textContent = `Congratulations! The winner is ${winner}`;
    }
    winnerContainer.classList.remove("hide");

    // Disable all boxes to prevent further clicks
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

// Event listener for box clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked!")
        if (turnO) {
            box.innerHTML = "X";
            turnO = false;
        }
        else {
            box.innerHTML = "O";
            turnO = true;
        }
        box.disabled = true;

        // Check for winner
        const winner = checkWinner();
        if (winner) {
            showWinner(winner);
        } else if (checkDraw()) {
            showWinner('draw');
        }
    })
});

// Event listener for new game button
newGame.addEventListener("click", () => {
    // Clear the content of all boxes
    boxes.forEach((box) => {
        box.textContent = "";
    });

    // Enable all boxes for further clicks
    boxes.forEach((box) => {
        box.disabled = false;
    });

    // Reset message and hide the winner container
    msg.textContent = "";
    winnerContainer.classList.add("hide");

    // Reset the turn
    turnO = true;
});
