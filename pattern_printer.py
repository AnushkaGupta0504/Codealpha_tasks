# Pattern Printer - Prints a 5x5 grid of squarewall

def print_pattern():
    """Prints a 5x5 pattern of squarewall with spaces between them"""
    for i in range(5):
        for j in range(5):
            print("squarewall", end=" ")
        print()  # New line after each row

if __name__ == "__main__":
    print_pattern()