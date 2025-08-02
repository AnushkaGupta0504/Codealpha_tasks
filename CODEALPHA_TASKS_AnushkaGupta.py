import random

# List of predefined words
word_list = ['python', 'code', 'alpha', 'intern', 'project']

# Randomly choose a word
chosen_word = random.choice(word_list)

# Initialize variables
word_display = ['_'] * len(chosen_word)
guessed_letters = []
attempts = 6

print("🔤 Welcome to Hangman!")
print("Guess the word, one letter at a time.")
print("You have", attempts, "incorrect attempts allowed.\n")

# Game loop
while attempts > 0 and '_' in word_display:
    print("Word:", ' '.join(word_display))
    print("Guessed letters:", ' '.join(guessed_letters))
    
    guess = input("Enter a letter: ").lower()

    # Input validation
    if not guess.isalpha() or len(guess) != 1:
        print("❌ Please enter a single alphabetic letter.\n")
        continue
    if guess in guessed_letters:
        print("⚠️ You've already guessed that letter. Try another one.\n")
        continue

    guessed_letters.append(guess)

    if guess in chosen_word:
        print("✅ Good guess!\n")
        for idx, char in enumerate(chosen_word):
            if char == guess:
                word_display[idx] = guess
    else:
        print("❌ Incorrect guess!\n")
        attempts -= 1

# Game result
if '_' not in word_display:
    print("🎉 Congratulations! You guessed the word:", chosen_word)
else:
    print("💀 Game Over! The word was:", chosen_word)

def squareWall(s):
    """
    Print a square wall of size s using nested loops.
    Args:
        s (int): Size of the square wall
    """
    for i in range(s):  # Outer loop for rows
        for j in range(s):  # Inner loop for columns
            print('*', end='')  # Print asterisk without newline
        print()  # Print newline after each row

# Test the function with example
if __name__ == "__main__":
    print("\nSquare Wall Examples:")
    print("Size 5:")
    squareWall(5)
    
    print("\nSize 3:")
    squareWall(3)
    
    print("\nSize 1:")
    squareWall(1)
