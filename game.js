// Need a function to randomly select between rock, paper or scissors for the computer move
// This generates random integers between min and max, INCLUSIVE OF BOTH
function randomInteger(min,max) {
    const minInterval = Math.ceil(min);
    const maxInterval = Math.floor(max);
    return Math.floor(Math.random() * (maxInterval - minInterval + 1) + minInterval);
}

function computerPlay() {
    return randomInteger(0,2); // Returns either 0:paper, 1:scissors, or 2:rock
}

// This function takes 0:paper, 1:scissors, or 2:rock, and determines who, if anyone, won the round
function whoWins(computerSelection, humanSelection) {
    if (computerSelection == humanSelection) {
        return "Tie";
    }
    else if ((computerSelection - humanSelection) == 1 ||  (computerSelection - humanSelection) == -2) {
        return "Computer"; // computer wins
    }
    else {
        return "Human"; // human wins
    }
}

function intToWeapon(selection) {
    switch (selection) {
        case 0:
            return "paper";
            break;
        case 1:
            return "scissors";
            break;
        case 2:
            return "rock";
            break;
    }
}

function playRound(e) {
    // Setting the round number limit here!
    const roundNoLimit = 5;

    // Taking computer and human plays
    const computerSelection = computerPlay();
    const humanSelectionWord = e.srcElement.innerText;
    let humanSelection;
    
    // Converting human selection from word 
    switch (humanSelectionWord.split(" ")[0]) {
        case "Rock":
            humanSelection = 2;
            break;
        case "Paper": {
            humanSelection = 0;
            break;
        }
        case "Scissors": {
            humanSelection = 1;
            break;
        }
    }
    const outputContainer = document.querySelector("#round-results");
    const roundNoElement = document.querySelector("#round-no");
    let roundNo = Number(roundNoElement.innerText.split(" ")[roundNoElement.innerText.split(" ").length - 1]);
    
    roundDOMResultDisplay(computerSelection, humanSelection, outputContainer);
    roundNoDisplay(roundNoElement, roundNo, roundNoLimit);
    
    const scoreTallyElement = document.querySelector("#score-tally");
    let humanScore = Number(scoreTallyElement.getAttribute("data-human-score"));
    let computerScore = Number(scoreTallyElement.getAttribute("data-computer-score"));
    scoreTallyDisplay(scoreTallyElement, computerScore, humanScore, whoWins(computerSelection, humanSelection));

    // Reassign roundNo now, since it was changed by roundNoDisplay(), in order to check for end of game
    // Same for each of the player scores, due to reassignment within scoreTallyDisplay
    roundNo = Number(roundNoElement.innerText.split(" ")[roundNoElement.innerText.split(" ").length - 1]);
    humanScore = Number(scoreTallyElement.getAttribute("data-human-score"));
    computerScore = Number(scoreTallyElement.getAttribute("data-computer-score"));
    if (roundNo == roundNoLimit) {
        endGameDisplay(computerScore, humanScore);
    }
}

function numSelectionToEmoji(numericalSelection) {
    switch (numericalSelection) {
        case 0:
            return "&#9995;";
            break;
        case 1:
            return "&#9996;";
            break;
        case 2:
            return "&#9994;";
            break;
    }
}

function roundDOMResultDisplay(computerSelection, humanSelection, outputContainer) {
    const humanEmoji = numSelectionToEmoji(humanSelection);
    const computerEmoji = numSelectionToEmoji(computerSelection);
    let resultString = `${humanEmoji}               ${computerEmoji}<br>You chose ${intToWeapon(humanSelection)}.<br>Computer chose ${intToWeapon(computerSelection)}.<br>`;
    if (whoWins(computerSelection, humanSelection) === "Tie") {
        resultString += "It's a tie!";
    }
    else {
        resultString += `${whoWins(computerSelection, humanSelection)} wins!`;
    }
    outputContainer.innerHTML = resultString;
}

function roundNoDisplay(roundNoElement, roundNo, roundNoLimit) {
    if (roundNo < roundNoLimit) {
        roundNoElement.innerText = `Current round: ${roundNo + 1}`;
    }
}

function scoreTallyDisplay(scoreTallyElement, computerScore, humanScore, roundWinner) {
    if (roundWinner == "Computer") {
        scoreTallyElement.innerHTML = `Current score:<br>Human: ${humanScore}<br>Computer: ${computerScore + 1}`;
        scoreTallyElement.setAttribute("data-computer-score", computerScore + 1);
    }
    else if (roundWinner == "Human") {
        scoreTallyElement.innerHTML = `Current score:<br>Human: ${humanScore + 1}<br>Computer: ${computerScore}`;
        scoreTallyElement.setAttribute("data-human-score", humanScore + 1);
    }
}

function endGameDisplay(computerScore, humanScore) {
    const endGameContainer = document.createElement("h3");
    if (computerScore > humanScore) {
        endGameContainer.innerText = "Computer wins the game!";
    }
    else if (computerScore < humanScore) {
        endGameContainer.innerText = "Human wins the game!";
    }
    else {
        endGameContainer.innerText = "Game is a tie!";
    }
    const documentBody = document.querySelector("body");
    documentBody.appendChild(endGameContainer);

    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.removeEventListener("click", playRound));
}


// Listen to clicks and react by playing rounds
const buttons = document.querySelectorAll("button");

buttons.forEach(button => button.addEventListener("click", playRound));