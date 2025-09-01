let canvas;
let world;
let keyboard = new Keyboard();

/** Initializes the game by setting up the canvas and world objects. */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function restartGame() {
  if (world) {
    world.cleanup();
  }
  toggleInstructions(false);
  world = new World(canvas, keyboard);
  world.startGame();
}

function backToStartScreen() {
  if (world) {
    world.cleanup();
    document.getElementById("start-button-container").style.display = "block";
    document.getElementById("mobile-control-buttons").style.display = "none";
    document.getElementById("overlay").classList.add("d_none");
    document.getElementById("menu_overlay").classList.add("d_none");

    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
  }
  toggleInstructions(false);
}

function toggleInstructions(endScreenActive) {
  const normal = document.getElementById("normal-instructions");
  const endgame = document.getElementById("endgame-instructions");

  if (endScreenActive) {
    normal.style.display = "none";
    endgame.style.display = "flex";
  } else {
    normal.style.display = "flex";
    endgame.style.display = "none";
  }
}

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

/** * Listens for keydown events and updates the keyboard state accordingly. * Maps arrow keys and spacebar to boolean flags in the Keyboard instance. * @param {KeyboardEvent} event - The keyboard event triggered by user input. */
window.addEventListener("keydown", (event) => {
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
});

/** * Listens for keyup events and updates the keyboard state accordingly. * Resets the respective key flags in the Keyboard instance when keys are released. * @param {KeyboardEvent} event - The keyboard event triggered by user input. */
window.addEventListener("keyup", (event) => {
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
});

/** Opens the "About the Game" overlay by injecting the relevant HTML template. * Toggles the visibility of the overlay element. */
function openAboutTheGame() {
  let aboutTheGameRef = document.getElementById("overlay");
  aboutTheGameRef.innerHTML = "";
  aboutTheGameRef.innerHTML += getAboutTheGameTemplate();
  aboutTheGameRef.classList.toggle("d_none");
}

/** Opens the legal notice overlay by injecting the relevant HTML template. * Toggles the visibility of the overlay element. */
function openLegalNotice() {
  let aboutTheGameRef = document.getElementById("overlay");
  aboutTheGameRef.innerHTML = "";
  aboutTheGameRef.innerHTML += getLegalNoticeTemplate();
  aboutTheGameRef.classList.toggle("d_none");
}

/** Opens the game menu overlay by injecting the relevant HTML template. * Toggles the visibility of the menu overlay element. */
function openMenu() {
  let menuRef = document.getElementById("menu_overlay");
  menuRef.innerHTML = "";
  menuRef.innerHTML += getMenu();
  menuRef.classList.toggle("d_none");
}

/** Toggles the visibility of an overlay element by its ID. * @param {string} overlayId - The ID of the overlay element to toggle. */
function toggleOff(overlayId) {
  let overlayRef = document.getElementById(overlayId);
  overlayRef.classList.toggle("d_none");
}

/** Starts the game from the start button, hides the button container, * and shows mobile control buttons if applicable. */
function startGameFromButton() {
  if (world && typeof world.startGame === "function") {
    world.startGame();
    document.getElementById("start-button-container").style.display = "none";
    document.getElementById("mobile-control-buttons").style.display = "flex";
  }
}
