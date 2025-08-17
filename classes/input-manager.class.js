/**
 * Manages user input events including keyboard and canvas interactions.
 * Handles game start, bottle throwing, sound/music toggling, and fullscreen control.
 */
class InputManager {
  /**
   * Creates an InputManager.
   * @param {Object} world - The game world instance to interact with.
   * @param {HTMLCanvasElement} canvas - The canvas element for click events.
   * @param {Object} keyboard - Keyboard state tracking object.
   */
  constructor(world, canvas, keyboard) {
    this.world = world;
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.registerEvents();
  }

  /**
   * Registers all input event listeners.
   */
  registerEvents() {
    this.registerKeyEvents();
    this.registerCanvasClick();
    this.registerClickEvent();
    this.registerTouchEvents();
  }

  /**
   * Registers keyboard events to start game and throw bottles.
   */
  registerKeyEvents() {
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "n" && !this.world.gameStarted) {
        this.world.startGame();
      }
      if (e.key.toLowerCase() === "x" && this.world.gameStarted) {
        this.world.throwBottle();
      }
    });
  }

  /**
   * Registers a click event on the canvas to play background music.
   */
  registerCanvasClick() {
    this.canvas.addEventListener("click", () => {
      this.world.soundManager.playMusic();
    });
  }

  /**
   * Registers a click event on the canvas for toggling fullscreen and sound.
   */
  registerClickEvent() {
    this.canvas.addEventListener("click", (e) => {
      const { clickX, clickY } = this.getScaledClickCoordinates(e);

      if (
        this.world.isInsideArea(
          clickX,
          clickY,
          this.world.fullscreenX,
          this.world.fullscreenY,
          this.world.fullscreenWidth,
          this.world.fullscreenHeight
        )
      ) {
        this.world.toggleFullscreen();
      } else if (
        this.world.isInsideArea(
          clickX,
          clickY,
          this.world.soundX,
          this.world.soundY,
          this.world.soundWidth,
          this.world.soundHeight
        )
      ) {
        this.world.toggleSound();
      }
    });
  }

  /**
   * Registers touch events for mobile controls.
   * - LEFT/RIGHT: continuous until finger lifts
   * - SPACE (jump): triggers once per tap
   * - THROW: triggers once per tap
   */
  registerTouchEvents() {
    this.canvas.addEventListener("touchstart", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = (touch.clientX - rect.left) * (this.canvas.width / rect.width);
      const y = (touch.clientY - rect.top) * (this.canvas.height / rect.height);

      this.world.mobileButtons.forEach((btn) => {
        if (
          this.world.isInsideArea(x, y, btn.x, btn.y, btn.width, btn.height)
        ) {
          if (btn.action === "LEFT" || btn.action === "RIGHT") {
            this.keyboard[btn.action] = true;
          } else if (btn.action === "SPACE") {
            this.keyboard.SPACE = true;
            setTimeout(() => (this.keyboard.SPACE = false), 150);
          } else if (btn.action === "THROW") {
            this.world.throwBottle();
          }
        }
      });
    });

    this.canvas.addEventListener("touchend", () => {
      this.keyboard.LEFT = false;
      this.keyboard.RIGHT = false;
    });
  }

  /**
   * Calculates the scaled click coordinates relative to the canvas size.
   * @param {MouseEvent} e - The mouse event.
   * @returns {{clickX: number, clickY: number}} The scaled X and Y click coordinates.
   */
  getScaledClickCoordinates(e) {
    const rect = this.canvas.getBoundingClientRect();
    let clickX = e.clientX - rect.left;
    let clickY = e.clientY - rect.top;
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return { clickX: clickX * scaleX, clickY: clickY * scaleY };
  }
}
