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
        const linesBet = prompt("On how many lines do you want to bet on? Enter a number between 1 and " + maxLines + ". ");
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
function playersBet(balance, lines) {
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

//time to rooooooooll the Slots; Beachte: die Listen in rolledWheels stehen jeweils für eine Spalte am Ende des gespielten Spiels.
function rollTheLines(wheel) {
    const listOfElements = [];
    for (element in wheel) {
        for (let i = 0; i < wheel[element]; i++) {
            listOfElements.push(element);
        }
    }
    const rolledWheels = [];
    for (let line = 0; line < maxLines; line++) {
        rolledWheels.push([])
    }
    for (let column = 0; column < maxColumns; column++) {
        const elements = [...listOfElements];
        for (let line = 0; line < maxLines; line++) {
            const randomIndex = getRandomIndex(elements);
            rolledWheels[line].push(elements[randomIndex]);
            elements.splice(randomIndex, 1);
        }
    }
    return rolledWheels;
}

//wir wollen dem User auch anzeigen was die SlotMachine am Ende anzeigt
//Die Einträge aus rolledWheels sind ja Listen, in denen jeweils die Spalten der SlotMachine angezeigt werden. Diese müssen jetzt auch als sloche angezeigt werden, d.h. die Einträge sollten untereinander und nicht nebeneinander stehen.
function showSlotMachine(wheelsRoll) {
    let result = "| ";
    for (let lines = 0; lines < maxLines; lines++) {
        for (let column = 0; column < maxColumns; column++) {
            result += `${wheelsRoll[lines][column]} | `
        }
        if (lines != maxLines-1) {
            result += "\n| ";
        }
    }
    return result;
}

//Jetzt müssen wir schauen ob der Spieler etwas gewonnen hat, bzw. ob es zeilen gibt, die übereistimmen.
function winningLines(wheelsRoll) {
    let winnedLines = 0;
    for (let lines = 0; lines < maxLines; lines++) {
        const firstElement = wheelsRoll[lines][0];
        let check = 0;
        for (let column = 1; column < maxColumns; column++) {
            if (wheelsRoll[lines][column] === firstElement) {
                check = check +1;
            }
        }
        if (check === maxColumns-1) {
            winnedLines = winnedLines + 1;
        }
    }
    return winnedLines;
}

// jetzt müssen wir nur noch schauen, ob der Spieler gewonnen hat oder nicht:
function estimateWin(winnedLines, bettedLines, bet, balance) {
    let newBalance = 0
    if (bettedLines <= winnedLines) {
        newBalance = balance + bet;
        console.log("You betted on " + bettedLines +" line(s). Thus you won $" + bet +". Your new balance is " + newBalance + ".")
        
    }
    else {
        newBalance = balance - bet;
        console.log("You lost $" + bet + ", since you betted on " + bettedLines +" line(s). Your new balance is " + newBalance + ".")
    }
    return newBalance;
}

const prompt = require("prompt-sync")();
const maxColumns = 3
const maxLines = 4
const depositAmount = playersDeposit();
const numberOfLines = betOnLines();
const totalBet = playersBet(depositAmount, numberOfLines)
const slotMachine = { "A": 50, "B": 4, "C": 6, "D": 8 }

const rolled = rollTheLines(slotMachine);
const correctLines = winningLines(rolled);

console.log(showSlotMachine(rolled));
console.log(estimateWin(correctLines, numberOfLines, totalBet, depositAmount))

