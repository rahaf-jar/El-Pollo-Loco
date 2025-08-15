/** * The HTML canvas element where the game is rendered. * @type {HTMLCanvasElement} */ let canvas;
let world;
let keyboard = new Keyboard();

/** * Initializes the game by setting up the canvas, creating the world, * and logging the main character instance. * Should be called once the DOM is loaded. */ function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  console.log("my character is", world.character);
}

/** * Listens for keydown events and updates the keyboard state accordingly. * Maps arrow keys and spacebar to boolean flags in the Keyboard instance. * @param {KeyboardEvent} event - The keyboard event triggered by user input. */ window.addEventListener(
  "keydown",
  (event) => {
    if (event.keyCode == 39) {
      keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
      keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
      keyboard.UP = true;
    }
    if (event.keyCode == 40) {
      keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
      keyboard.SPACE = true;
    }
  }
);

/** * Listens for keyup events and updates the keyboard state accordingly. * Resets the respective key flags in the Keyboard instance when keys are released. * @param {KeyboardEvent} event - The keyboard event triggered by user input. */ window.addEventListener(
  "keyup",
  (event) => {
    if (event.keyCode == 39) {
      keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
      keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
      keyboard.UP = false;
    }
    if (event.keyCode == 40) {
      keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
      keyboard.SPACE = false;
    }
  }
);

function openAboutTheGame() {
  let aboutTheGameRef = document.getElementById("overlay");
  aboutTheGameRef.innerHTML = "";
  aboutTheGameRef.innerHTML += getAboutTheGameTemplate();
  aboutTheGameRef.classList.toggle("d_none");
}

function openMenu() {
  let menuRef = document.getElementById("menu_overlay");
  menuRef.innerHTML = "";
  menuRef.innerHTML += getMenu();
  menuRef.classList.toggle("d_none");
}

function toggleOff(overlayId) {
  let overlayRef = document.getElementById(overlayId);
  overlayRef.classList.toggle("d_none");
}