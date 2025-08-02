# Pattern Printer - Prints a 5x5 grid of asterisks

def print_pattern():
    """Prints a 5x5 pattern of asterisks with spaces between them"""
    for i in range(5):
        for j in range(5):
            print("*", end=" ")
        print()  # New line after each row

if __name__ == "__main__":
    print_pattern()