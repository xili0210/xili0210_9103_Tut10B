# xili0210_9103_Tut10B
# Smiley Blocks Animation

This project creates an interactive animation of smiley face blocks inspired by a combination of Piet Mondrian's artwork "Broadway Boogie Woogie" and elements from Pac-Man, using p5.js.

## Interaction Instructions

- Use the arrow buttons (↑, ←, ↓, →) to move the smiley blocks around the canvas.
- Click the "Change Mood" button to randomly change the expression of the smiley faces.
- Click the "Pause" button to pause or resume the movement of the smiley blocks.
- The objective is to align all smiley blocks at the same position to win the game.

## Individual Approach

### Animation Method
- **User Input:** The animation is driven by user input through arrow buttons and keyboard arrows.
- **Properties Animated:** Position of the smiley blocks and their expressions.
- **Inspiration:** The design and movement are inspired by Piet Mondrian's "Broadway Boogie Woogie," focusing on geometric shapes and vibrant colors, while also incorporating elements from Pac-Man for character movement.

### Explanation
- The code defines smiley face blocks with initial coordinates (`smileyX` and `smileyY`) and a variable `mouthType` to represent the type of mouth expression.
- The `setup()` function initializes the canvas and creates buttons for interaction.
- The smiley blocks are constrained to move within defined boundaries on the canvas.
- The `changeMood()` function randomly changes the `mouthType` variable for each smiley block to simulate different expressions.
- The `pauseResume()` function toggles the pause state of smiley block movement.
- The smiley blocks are drawn and moved according to user input, incorporating some elements from Pac-Man for movement dynamics.
- Each function is well-commented for clarity.

### Changes to Group Code
- No significant changes were made to the group code.

### External Tools and Techniques
- This project solely uses p5.js for animation, which was taught in the course.

### Code Comments
- The code includes detailed comments explaining each function and variable.

### References
- The design and movement were inspired by Piet Mondrian's "Broadway Boogie Woogie" for its geometric shapes and vibrant colors, with a hint of Pac-Man for character movement dynamics.

### Acknowledge
Acknowledgments to ChatGPT for troubleshooting. 


