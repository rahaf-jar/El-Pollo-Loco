/** 
 * The HTML canvas element where the game is rendered.
 * @type {HTMLCanvasElement}
 */
let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the canvas, creating the world,
 * and logging the main character instance.
 * Should be called once the DOM is loaded.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("my character is", world.character);
}

/**
 * Listens for keydown events and updates the keyboard state accordingly.
 * Maps arrow keys and spacebar to boolean flags in the Keyboard instance.
 * @param {KeyboardEvent} event - The keyboard event triggered by user input.
 */
window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) { // Right arrow
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) { // Left arrow
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) { // Up arrow
    keyboard.UP = true;
  }
  if (event.keyCode == 40) { // Down arrow
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) { // Spacebar
    keyboard.SPACE = true;
  }
});

/**
 * Listens for keyup events and updates the keyboard state accordingly.
 * Resets the respective key flags in the Keyboard instance when keys are released.
 * @param {KeyboardEvent} event - The keyboard event triggered by user input.
 */
window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) { // Right arrow
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) { // Left arrow
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) { // Up arrow
    keyboard.UP = false;
  }
  if (event.keyCode == 40) { // Down arrow
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) { // Spacebar
    keyboard.SPACE = false;
  }
});
