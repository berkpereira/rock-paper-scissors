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

function humanPlay() {
    let humanSelection = prompt("Choose your weapon, rock, paper, or scissors?");
    while (!isValid(humanSelection)) {
        humanSelection = prompt("Invalid input! Choose between rock, paper, or scissors:");
    }
    switch (humanSelection) {
        case "paper":
            return 0;
            break;
        case "scissors":
            return 1;
            break;
        case "rock":
            return 2;
            break;
    }
}

function isValid(humanInput) {
    if (humanInput == "rock" || humanInput == "paper" || humanInput == "scissors") {
        return true;
    }
    else {
        return false;
    }
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
    const computerSelection = computerPlay();
    const humanSelectionWord = e.srcElement.innerText;
    let humanSelection;
    switch (humanSelectionWord) {
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
    console.log([whoWins(computerSelection, humanSelection), computerSelection, humanSelection]); // Return array [round outcome, computer weapon, human weapon]);
    //return [whoWins(computerSelection, humanSelection), computerSelection, humanSelection]; // Return array [round outcome, computer weapon, human weapon]
}

function roundResultDisplay(outcome, roundNo, computerSelection, humanSelection, computerScore, humanScore) {
    let alertString = `This round: ${roundNo}\n\nYou chose ${intToWeapon(humanSelection)}. Computer chose ${intToWeapon(computerSelection)}.\n`
    if (outcome == "Tie") {
        alertString += "It's a tie!";
    }
    else {
        alertString += `${outcome} wins the round!`;
    }
    alertString += `\n\nCurrent score:\nHuman: ${humanScore}\nComputer: ${computerScore}`;
    alert(alertString);
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