class World {
  character = new Character();
  endBoss = null;
  level = createLevel1();
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  collectedBottles = 0;
  thrownBottles = [];
  statusBar = new StatusBar();
  endBossStatusBar = new EndBossStatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  gameStarted = false;
  gameEnded = false;
  soundIcon = new Image();
  soundX = 670;
  soundY = 10;
  soundWidth = 20;
  soundHeight = 20;
  isMuted = false;
  fullscreenIcon = new Image();
  fullscreenX = 670;
  fullscreenY = 450;
  fullscreenWidth = 20;
  fullscreenHeight = 20;
  startScreenImage = new Image();
  originalWidth;
  originalHeight;
  soundManager = new SoundManager();
  collisionManager;
  uiManager;
  inputManager;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.setupGameElements();
    this.storeCanvasSize();
    this.initIcons();
    this.startScreenImage = new Image();
    this.startScreenImage.src =
      "img/9_intro_outro_screens/start/startscreen_1.png";
    this.uiManager = new UIManager(this, this.ctx);
    this.inputManager = new InputManager(this, canvas, keyboard);
    this.collisionManager = new CollisionManager(this);
    this.soundManager = new SoundManager();
    this.applySavedMute();
    this.registerResizeEvent();
    this.setWorld();
    this.draw();
    this.loadEndGameAssets();
    this.animationFrameId = null;
  }

  /** Sets up the main game elements: level, character, and end boss */
  setupGameElements() {
    this.level = createLevel1();
    this.character = new Character();
    this.endBoss = this.level.enemies.find((e) => e instanceof Endboss);
  }

  /** Stores the original canvas size for fullscreen toggling */
  storeCanvasSize() {
    this.originalWidth = this.canvas.width;
    this.originalHeight = this.canvas.height;
  }

  /** Applies saved mute state from localStorage */
  applySavedMute() {
    const saved = localStorage.getItem("isMuted");
    if (saved !== null) {
      this.isMuted = JSON.parse(saved);
      this.soundManager.muteAll(this.isMuted);
      this.soundIcon.src = this.isMuted
        ? "img/on_canvas_options/mute.png"
        : "img/on_canvas_options/unmute.png";
    }
  }

  /** Loads images for the end game screen */
  loadEndGameAssets() {
    this.endGameImages = {
      won: new Image(),
      lost: new Image(),
    };
    this.endGameImages.won.src = "img/10_You_won_you_lost/You_won_A.png";
    this.endGameImages.lost.src = "img/10_You_won_you_lost/oh_no_you_lost.png";
    this.didWin = false;
    this.endGameBackground = new Image();
    this.endGameBackground.src = "img/5_background/second_half_background.png";
  }

  /** Updates all game objects each frame */
  update() {
    if (!this.gameStarted) return;
    if (this.character && this.character.update) {
      this.character.update();
    }
    if (this.endBoss instanceof Endboss) {
      this.endBoss.update(this.character);
    }
    this.level.enemies.forEach((enemy) => {
      if (enemy !== this.endBoss && enemy.update) enemy.update();
    });
    this.thrownBottles.forEach((bottle) => {
      if (bottle.update) bottle.update();
    });
  }

  /** Links the character to the world instance */
  setWorld() {
    this.character.world = this;
  }

  /** Initializes the fullscreen and sound icons */
  initIcons() {
    this.soundIcon.src = "img/on_canvas_options/unmute.png";
    this.fullscreenIcon.src = "img/on_canvas_options/open-full-screen.png";
  }

  /** Starts the game: sets up the world, starts collisions, and plays music */
  startGame() {
    if (this.gameStarted || this.gameEnded) return;

    this.setWorld();
    this.checkAssets();
    this.collisionManager.startCollisionChecks();
    this.gameStarted = true;
    this.soundManager.playMusic();
  }

  /** Ends the game and displays the "Game Over" screen */
  /** Ends the game and displays the "Game Over" screen */
  endGame(won) {
    if (this.gameEnded) return;

    this.gameEnded = true;
    this.didWin = won;
    this.soundManager.stopMusic();

    if (this.character) this.character.isDead = true;
    if (this.endBoss) this.endBoss.isDead = true;
    toggleInstructions(true);
  }

  /** Resets the game to its initial state */
  resetGame() {
    this.cleanup();
    world = new World(this.canvas, this.keyboard);
  }

  /** Checks if all assets (coins, bottles) are loaded */
  checkAssets() {
    if (!this.level.coins) console.error("Coins not loaded!");
    if (!this.level.bottles) console.error("Bottles not loaded!");
  }

  /** Toggles mute and updates the sound icon */
  toggleSound() {
    this.isMuted = !this.isMuted;
    this.soundIcon.src = this.isMuted
      ? "img/on_canvas_options/mute.png"
      : "img/on_canvas_options/unmute.png";
    this.soundManager.muteAll(this.isMuted);
    localStorage.setItem("isMuted", JSON.stringify(this.isMuted));
  }

  /** Toggles fullscreen mode on and off */
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.canvas.requestFullscreen().then(() => this.onEnterFullscreen());
    } else {
      document.exitFullscreen().then(() => this.onExitFullscreen());
    }
  }

  /** Called when fullscreen is entered, updates sizes and icon */
  onEnterFullscreen() {
    this.resizeCanvas(window.innerWidth, window.innerHeight);
    this.fullscreenIcon.src = "img/on_canvas_options/close-full-screen.png";
  }

  /** Called when fullscreen is exited, resets size and icon */
  onExitFullscreen() {
    this.resizeCanvas(this.originalWidth, this.originalHeight);
    this.fullscreenIcon.src = "img/on_canvas_options/open-full-screen.png";
  }

  /**
   * Resizes the canvas and recalculates scale and icon positions
   * @param {number} width - New canvas width
   * @param {number} height - New canvas height
   */
  resizeCanvas(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.scaleX = this.canvas.width / this.originalWidth;
    this.scaleY = this.canvas.height / this.originalHeight;
    this.fullscreenX = this.canvas.width - 30;
    this.fullscreenY = this.canvas.height - 30;
    this.soundX = this.canvas.width - 30;
    this.soundY = 10;
  }

  /** Handles canvas resizing in fullscreen mode */
  registerResizeEvent() {
    window.addEventListener("resize", () => {
      if (document.fullscreenElement)
        this.resizeCanvas(window.innerWidth, window.innerHeight);
    });
  }

  /**
   * Checks if a point is inside a rectangular area
   * @param {number} clickX - X coordinate of the point
   * @param {number} clickY - Y coordinate of the point
   * @param {number} x - Top-left X of the area
   * @param {number} y - Top-left Y of the area
   * @param {number} width - Width of the area
   * @param {number} height - Height of the area
   * @returns {boolean} True if inside, false otherwise
   */
  isInsideArea(clickX, clickY, x, y, width, height) {
    return (
      clickX >= x && clickX <= x + width && clickY >= y && clickY <= y + height
    );
  }

  /** Throws a bottle if available and updates the bottle bar */
  throwBottle() {
    if (this.collectedBottles > 0 && !this.character.isDead) {
      this.character.isThrowing = true;
      const bottle = new ThrowableBottle(
        this.character.x + 50,
        this.character.y
      );
      this.thrownBottles.push(bottle);
      this.collectedBottles--;
      this.bottleBar.setBottlesAmount(this.collectedBottles);

      setTimeout(() => {
        this.character.isThrowing = false;
      }, 500);
    }
  }

  /** Main game loop: clears canvas, updates, and draws everything */
  draw() {
    this.clearCanvas();
    if (!this.gameStarted) {
      this.showStartScreen();
      this.animationFrameId = requestAnimationFrame(() => this.draw());
      return;
    }
    this.update();
    if (this.gameEnded) {
      this.showEndScreen();
      return;
    }

    this.drawGame();
    this.drawUI();

    this.animationFrameId = requestAnimationFrame(() => this.draw());
  }

  cleanup() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.soundManager.stopMusic();
    this.soundManager.muteAll(true);
    if (this.inputManager) {
      this.inputManager.removeEvents();
    }
  }

  /** Clears the entire canvas */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /** Displays the start screen image */
  showStartScreen() {
    if (this.startScreenImage.complete) {
      this.ctx.drawImage(
        this.startScreenImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
  }

  /** Displays the end game screen with win/loss message */
  showEndScreen() {
    if (this.endGameBackground.complete) {
      this.ctx.drawImage(
        this.endGameBackground,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const img = this.didWin ? this.endGameImages.won : this.endGameImages.lost;
    if (img.complete) {
      const w = this.canvas.width / 2;
      const h = (img.height / img.width) * w;
      this.ctx.drawImage(
        img,
        this.canvas.width / 2 - w / 2,
        this.canvas.height / 2 - h / 2,
        w,
        h
      );
    }
    toggleInstructions(true);
  }

  /** Draws the game world with camera translation and scaling */
  drawGame() {
    this.ctx.save();
    this.ctx.scale(this.scaleX, this.scaleY);
    this.ctx.translate(this.camera_x, 0);

    this.drawObjects();

    this.ctx.translate(-this.camera_x, 0);
    this.ctx.restore();
  }

  /** Draws all game objects in the correct order */
  drawObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    if (this.character) this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.thrownBottles);
  }

  /** Draws the UI elements and icons */
  drawUI() {
    this.uiManager.drawUI();
    this.uiManager.drawIcons();
  }

  /**
   * Adds an array of drawable objects to the map
   * @param {DrawableObject[]} objects - The objects to draw
   */
  addObjectsToMap(objects) {
    objects.forEach((obj) => this.addToMap(obj));
  }

  /**
   * Draws a single object on the map, respecting direction
   * @param {DrawableObject} obj - Object to draw
   */
  addToMap(obj) {
    if (!obj.img) return;

    if (obj.otherDirection) {
      this.ctx.save();
      this.ctx.translate(obj.x + obj.width, obj.y);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(obj.img, 0, 0, obj.width, obj.height);
      this.ctx.restore();
    } else {
      this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    }
  }
}
