//Versuchen wir einfach mal auch hier ne Slot-Machine zu programmieren. 

//Hier paar Lemmata:
function isInteger(number) {
    return Math.round(number) === number;
}

function getRandomIndex(list) {
    let randomIndex = Math.floor(Math.random() * list.length);
    return randomIndex;
}

//Erstmal müssen wir den Nutzer fragen mit wie viel Geld er gerne spielen möchte
function playersDeposit() {
    while (true) {
        const deposit = prompt("Enter a deposit amount: ");
        const inputOfPlayer = parseFloat(deposit);
        if (isNaN(inputOfPlayer) || inputOfPlayer < 0) {
            console.log("Please enter a vaild amount.");
        } else {
            return inputOfPlayer;
        }
    }
}

// und auf wie viele Zeilen er gerne bieten möchte
function betOnLines() {
    while (true) {
        const linesBet = prompt("On how many lines do you want to bet on? Enter a number between 1 and " + maxLines +". ");
        const linesOfPlayer = parseFloat(linesBet);
        if (isNaN(linesOfPlayer) || !isInteger(linesOfPlayer) || linesOfPlayer < 1 || maxLines < linesOfPlayer) {
            console.log("Please enter a valid amount of lines. (1-" + maxLines + ")");
        }
        else {
            return linesOfPlayer;
        }
    }
}

// und wie viel er gerne bieten möchte
function playersBet(balance, lines){
    while (true) {
        const yourBet = prompt("How much do you want to bet on each line? ");
        const betOfPlayer = parseFloat(yourBet);
        if (isNaN(betOfPlayer) || betOfPlayer < 0) {
            console.log("Please enter a valid bet.")
        }
        else if (betOfPlayer * lines > balance) {
            console.log("You have not enough money in your deposit for your bet. Your balance is " + balance + ". Please adjust your bet.");
        }
        else {
            console.log("Your total bet is " + betOfPlayer * lines + ".");
            return betOfPlayer * lines;
        }
    }
}

//time to rooooooooll the Slots
function rollTheLines(wheel) {
    let listOfElements = [];
    for (element in wheel) {
        for (let i = 0; i < wheel[element]; i++) {
            listOfElements.push(element);
        }
    }
    let rolledWheels = [];
    console.log(listOfElements);
    for (let line = 0; line < maxLines; line++) {
        rolledWheels.push([]);
        for (let row = 0; row < maxRows; row++) {
            const randomIndex = getRandomIndex(listOfElements);
            rolledWheels[line].push(listOfElements[randomIndex]);
            listOfElements.splice(randomIndex, 1);
        }
        // rausgenommene Elemente müssen wieder zum wheel hinzugefügt werden, um die zweite Spalte zu spielen
        for (let element = 0; element < maxRows; element++) {
            listOfElements.push(rolledWheels[line][element]);
        }
    }
    return rolledWheels;
}

const prompt = require("prompt-sync")();
const maxRows = 3
const maxLines = 4
const depositAmount = playersDeposit();
const numberOfLines = betOnLines();
const totalBet = playersBet(depositAmount, numberOfLines)
const slotMachine = {"A":2, "B":4, "C":6, "D":8}

console.log(rollTheLines(slotMachine))