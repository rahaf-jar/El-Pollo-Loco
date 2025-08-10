/**
 * Tracks the current state of keyboard keys relevant to the game.
 * Listens for keydown and keyup events to update key states.
 */
class Keyboard {
  LEFT;
  RIGHT;
  UP;
  DOWN;
  SPACE;
  X;

  /**
   * Creates a Keyboard instance and registers event listeners to track key states.
   */
  constructor() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.LEFT = true;
      if (e.key === "ArrowRight") this.RIGHT = true;
      if (e.key === " ") this.SPACE = true;
      if (e.key.toLowerCase() === "x") this.X = true;
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft") this.LEFT = false;
      if (e.key === "ArrowRight") this.RIGHT = false;
      if (e.key === " ") this.SPACE = false;
      if (e.key.toLowerCase() === "x") this.X = false;
    });
  }
}