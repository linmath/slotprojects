import random

MAX_LINES = 3
MAX_BET = 100
MIN_BET = 1

ROWS = 3
COLS = 3

symbol_count = {
    "A": 50,
    "B": 4,
    "C": 6,
    "D": 8
}

symbol_value = {
    "A": 5,
    "B": 3,
    "C": 2,
    "D": 1
}

def check_winnings(columns, lines, bet, values):
    winnings = 0
    winning_lines = []
    for line in range(lines):
        symbol = columns[0][line]
        for column in columns:
            symbol_to_check = column[line]
            if symbol != symbol_to_check:
                break
        else:
            winnings += values[symbol] * bet
            winning_lines.append(line +1)
    return winnings, winning_lines



def get_slot_machine_spin(rows, cols, symbols):
    all_symbols = []
    for symbol, symbol_count in symbols.items():
        for _ in range(symbol_count):
            all_symbols.append(symbol)
    columns = []
    for _ in range(cols):
        column = []
        current_symbols = all_symbols[:] #um eine Liste zu kopieren, wird [:] benötigt, sonst wird alles was man mit den Listen macht auf beide angewandt.
        for _ in range(rows):
            value = random.choice(current_symbols)
            current_symbols.remove(value)
            column.append(value)
        columns.append(column)
    return columns

def print_slot_machine(columns):
    for row in range(len(columns[0])):
        for i, column in enumerate(columns):
            if i != len(columns) -1:
                print(column[row], end=" | ")
            else:
                print(column[row])

def deposit():
    while True:
        amount = input("What would you like to deposit? $")
        if amount.isdigit():
            amount = int(amount)
            if amount > 0:
                break
            else:
                print("Amount must be greater than 0.")
        else:
            print("Please enter a number.")
    return amount

def get_number_of_lines():
    while True:
        lines = input("How many lines do you want to bet on? 1 - " + str(MAX_LINES) + "? ")
        if lines.isdigit():
            lines = int(lines)
            if 0 < lines <= MAX_LINES:
                break
            else:
                if 0 >= lines:
                    print("You have to bet on one line at least.")
                else:
                    print("You can bet on " + str(MAX_LINES) + " lines at most.")
        else:
            print("Please enter a digit between 1 and " + str(MAX_LINES)+ ".")
    return lines

def get_bet():
    while True:
        amount = input("How much would you like to bet? $")
        if amount.isdigit():
            amount = int(amount)
            if MIN_BET <= amount  <= MAX_BET:
                break
            else:
                print("You bet has to be between $" + str(MIN_BET) + " and $" + str(MAX_BET) + ".")
        else:
            print(f"Please enter a value between ${MIN_BET} and ${MAX_BET}.")
    return amount

def spin(balance):
    lines = get_number_of_lines()
    bet = get_bet()
    while True:
        total_bet = bet * lines
        if total_bet < balance:
            break
        else:
            print(f"You don't have enough money in stock. Your current balance is ${balance}. Please edit your bet.")
            lines = get_number_of_lines()
            bet = get_bet()
    print(f"You are betting ${bet} on {lines} lines. Your total bet is ${total_bet}.")

    slots = get_slot_machine_spin(ROWS, COLS, symbol_count)
    print_slot_machine(slots)
    winnings, winning_lines = check_winnings(slots, lines, bet, symbol_value)
    print(f"You won ${winnings}.")
    print(f"You won on lines", *winning_lines)
    return winnings - total_bet


def main():
    balance = deposit()
    while True:
        print(f"Current balance is ${balance}")
        answer = input("Press enter to play or q to quit.")
        if answer == "q":
            break
        balance += spin(balance)
    print(f"You are left with ${balance}")

main()