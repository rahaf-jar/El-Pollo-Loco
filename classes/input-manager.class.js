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
    this.keydownHandler = this.handleKeyDown.bind(this); 
    this.registerEvents();
    this.registerHTMLButtonEvents();
  }

  removeEvents() {
    document.removeEventListener("keydown", this.keydownHandler);
  }

  handleKeyDown(e) {
    if (
      e.key.toLowerCase() === "n" &&
      !this.world.gameStarted &&
      !this.world.gameEnded
    ) {
      this.world.startGame();
    }
    if (
      e.key.toLowerCase() === "x" &&
      this.world.gameStarted &&
      !this.world.gameEnded
    ) {
      this.world.throwBottle();
    }
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
    document.addEventListener("keydown", this.keydownHandler);
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

  /**
   * Registers touch and mouse events for HTML buttons.
   */
  registerHTMLButtonEvents() {
    this.handleArrowButton("btn-left", "LEFT");
    this.handleArrowButton("btn-right", "RIGHT");
    this.handleJumpButton("btn-jump");
    this.handleThrowButton("btn-throw");
  }

  /**
   * Handles touch and mouse events for arrow buttons.
   * @param {string} id - The button element ID.
   * @param {string} key - The corresponding keyboard key to set.
   */
  handleArrowButton(id, key) {
    const btn = document.getElementById(id);
    const setKey = (value) => (this.keyboard[key] = value);

    btn.addEventListener("touchstart", () => setKey(true));
    btn.addEventListener("touchend", () => setKey(false));
    btn.addEventListener("mousedown", () => setKey(true));
    btn.addEventListener("mouseup", () => setKey(false));
    btn.addEventListener("mouseleave", () => setKey(false));
  }

  /**
   * Handles touch and mouse events for the jump button.
   * @param {string} id - The button element ID.
   */
  handleJumpButton(id) {
    const btn = document.getElementById(id);
    const jump = () => {
      this.keyboard.SPACE = true;
      setTimeout(() => (this.keyboard.SPACE = false), 150);
    };

    btn.addEventListener("touchstart", jump);
    btn.addEventListener("mousedown", jump);
  }

  /**
   * Handles touch and mouse events for the throw button.
   * @param {string} id - The button element ID.
   */
  handleThrowButton(id) {
    const btn = document.getElementById(id);
    const throwAction = () => this.world.throwBottle();

    btn.addEventListener("touchstart", throwAction);
    btn.addEventListener("mousedown", throwAction);
  }
}
