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
    const outputContainer = document.querySelector(".results");
    const roundNoElement = document.querySelector("#round-no");
    const roundNo = Number(roundNoElement.innerText.split(" ")[roundNoElement.innerText.split(" ").length - 1]);
    console.log(roundNo);
    
    roundDOMResultDisplay(computerSelection, humanSelection, outputContainer);
    roundNoDisplay(roundNoElement, roundNo, roundNoLimit);
}

function roundDOMResultDisplay(computerSelection, humanSelection, outputContainer) {
    let resultString = `You chose ${intToWeapon(humanSelection)}.<br>Computer chose ${intToWeapon(computerSelection)}.<br>`;
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

function gameResultDisplay(computerScore, humanScore) {
    let alertString = `Final score:\nHuman: ${humanScore}\nComputer: ${computerScore}`;
    const scoreDifference = computerScore - humanScore;
    if (scoreDifference == 0) {
        alertString += "\n\nGame is a tie!"
    }
    else if (scoreDifference > 0) {
        alertString += "\n\nComputer wins the game!"
    }
    else {
        alertString += "\n\nHuman wins the game!"
    }
    alert(alertString);
}

function game(noRounds = 5) {
    let humanScore = 0;
    let computerScore = 0;
    let roundNo;
    
    for (roundNo = 1; roundNo <= noRounds; roundNo++) {
        let roundOutcomeArray = playRound();
        let roundOutcome = roundOutcomeArray[0];
        let computerSelection = roundOutcomeArray[1];
        let humanSelection = roundOutcomeArray[2];

        if (roundOutcome == "Computer") {
            computerScore++;
        }
        else if (roundOutcome == "Human") {
            humanScore++;
        }

        roundResultDisplay(roundOutcome, roundNo, computerSelection, humanSelection, computerScore, humanScore);
    }
    gameResultDisplay(computerScore, humanScore);
}

// Listen to clicks and react by playing rounds
const buttons = document.querySelectorAll("button");

buttons.forEach(button => button.addEventListener("click", playRound));