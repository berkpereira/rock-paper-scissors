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
    else if ((computerSelection - humanSelection) == 1 || (computerSelection - humanSelection) == -2) {
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

function playRound() {
    let computerSelection = computerPlay();
    let humanSelection = humanPlay();
    let alertString = `You chose ${intToWeapon(humanSelection)}. Computer chose ${intToWeapon(computerSelection)}.\n`
    
    if (whoWins(computerSelection, humanSelection) == "Tie") {
        alertString += "It's a tie!";
    }
    else {
        alertString += `${whoWins(computerSelection, humanSelection)} wins!`;
    }
    alert(alertString);
}


// Call function and play an actual round
playRound();