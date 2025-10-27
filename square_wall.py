def squareWall(s):
    """
    Prints a square wall of asterisks of size s x s using nested loops
    Args:
        s (int): Size of the square wall
    """
    for i in range(s):
        for j in range(s):
            print("*", end="")
        print()  # New line after each row

# Test the function with different sizes
if __name__ == "__main__":
    print("Testing squareWall function:")
    
    print("\nExample 1: s = 5")
    squareWall(5)
    
    print("\nExample 2: s = 3")
    squareWall(3)
    
    print("\nExample 3: s = 1")
    squareWall(1)
    
    print("\nExample 4: s = 8")
    squareWall(8)