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
    this.registerHTMLButtonEvents();
  }

  /**
   * Registers all input event listeners.
   */
  registerEvents() {
    this.registerKeyEvents();
    this.registerCanvasClick();
    this.registerClickEvent();
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
      if (this.world.gameStarted) {
        this.world.soundManager.playMusic();
      }
    });
  }

  /**
   * Registers a click event on the canvas for toggling fullscreen and sound.
   */
  registerClickEvent() {
    this.canvas.addEventListener("click", (e) => {
      const { clickX, clickY } = this.getScaledClickCoordinates(e);
      if (
        this.world.isInsideArea(clickX, clickY, this.world.fullscreenX, this.world.fullscreenY, this.world.fullscreenWidth, this.world.fullscreenHeight
        )
      ) {
        this.world.toggleFullscreen();
      } else if (
        this.world.isInsideArea(clickX, clickY, this.world.soundX, this.world.soundY, this.world.soundWidth, this.world.soundHeight
        )
      ) {
        this.world.toggleSound();
      }
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

  registerHTMLButtonEvents() {
    const btnLeft = document.getElementById("btn-left");
    btnLeft.addEventListener("touchstart", () => (this.keyboard.LEFT = true));
    btnLeft.addEventListener("touchend", () => (this.keyboard.LEFT = false));
    btnLeft.addEventListener("mousedown", () => (this.keyboard.LEFT = true));
    btnLeft.addEventListener("mouseup", () => (this.keyboard.LEFT = false));
    btnLeft.addEventListener("mouseleave", () => (this.keyboard.LEFT = false));

    const btnRight = document.getElementById("btn-right");
    btnRight.addEventListener("touchstart", () => (this.keyboard.RIGHT = true));
    btnRight.addEventListener("touchend", () => (this.keyboard.RIGHT = false));
    btnRight.addEventListener("mousedown", () => (this.keyboard.RIGHT = true));
    btnRight.addEventListener("mouseup", () => (this.keyboard.RIGHT = false));
    btnRight.addEventListener(
      "mouseleave",
      () => (this.keyboard.RIGHT = false)
    );

    const btnJump = document.getElementById("btn-jump");
    btnJump.addEventListener("touchstart", () => {
      this.keyboard.SPACE = true;
      setTimeout(() => (this.keyboard.SPACE = false), 150);
    });
    btnJump.addEventListener("mousedown", () => {
      this.keyboard.SPACE = true;
      setTimeout(() => (this.keyboard.SPACE = false), 150);
    });

    const btnThrow = document.getElementById("btn-throw");
    btnThrow.addEventListener("touchstart", () => this.world.throwBottle());
    btnThrow.addEventListener("mousedown", () => this.world.throwBottle());
  }
}
