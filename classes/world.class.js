/**
 * The World class controls the main game loop, drawing, collisions, and interactions
 * between the player, enemies, collectibles, and the environment.
 *
 * Responsibilities:
 * - Draws everything on the canvas
 * - Handles keyboard and mouse input
 * - Manages game state (start, end, reset)
 * - Detects and processes collisions
 * - Plays and manages sounds
 */
class World {
  /** The player character object */
  character = new Character();
  /** The final boss enemy in the game */
  endBoss = null;
  /** The active level data, including enemies, background, coins, and bottles */
  level = createLevel1();
  /** The HTML canvas element used for rendering */
  canvas;
  /** The 2D drawing context of the canvas, used for drawing images and shapes */
  ctx;
  /** Object holding the player's current keyboard input states */
  keyboard;
  /** Horizontal camera offset for scrolling the scene */
  camera_x = 0;
  /** Displays player's health as a status bar */
  statusBar = new StatusBar();
  /** Displays the boss's health as a status bar */
  endBossStatusBar = new EndBossStatusBar();
  /** Displays the number of collected coins */
  coinBar = new CoinBar();
  /** Displays the number of collected bottles */
  bottleBar = new BottleBar();
  /** Number of bottles currently collected */
  collectedBottles = 0;

  /** Image element for the sound icon */
  soundIcon = new Image();
  /** Sound icon's X position on the canvas */
  soundX = 670;
  /** Sound icon's Y position on the canvas */
  soundY = 10;
  /** Sound icon's width in pixels */
  soundWidth = 20;
  /** Sound icon's height in pixels */
  soundHeight = 20;
  /** Whether the game sounds are muted */
  isMuted = false;

  /** Image element for the fullscreen icon */
  fullscreenIcon = new Image();
  /** Fullscreen icon's X position on the canvas */
  fullscreenX = 670;
  /** Fullscreen icon's Y position on the canvas */
  fullscreenY = 450;
  /** Fullscreen icon's width in pixels */
  fullscreenWidth = 20;
  /** Fullscreen icon's height in pixels */
  fullscreenHeight = 20;

  /** Manages all music and sound effects */
  soundManager = new SoundManager();

  /** Whether the game has started yet */
  gameStarted = false;
  /** Image element for the start screen */
  startScreenImage = new Image();

  /**
   * Creates a new World instance.
   * @param {HTMLCanvasElement} canvas - The game's canvas element where everything is drawn.
   * @param {Object} keyboard - An object that stores the state of pressed keys for controlling the player.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = createLevel1();
    this.endBoss = this.level.enemies.find((e) => e instanceof Endboss);
    this.initIcons();
    this.startScreenImage.src =
      "img/9_intro_outro_screens/start/startscreen_1.png";
    this.registerKeyEvents();
    this.registerClickEvent();
    this.registerCanvasClick();
    this.registerResizeEvent();
    this.originalWidth = canvas.width;
    this.originalHeight = canvas.height;
    this.draw();
    this.thrownBottles = [];
  }

  /**
   * Checks if coins and bottles are loaded in the current level.
   * This helps catch loading errors early.
   */
  checkAssets() {
    if (!this.level.coins) console.error("Coins not loaded!");
    if (!this.level.bottles) console.error("Bottles not loaded!");
  }

  /** Loads the icons for sound and fullscreen into memory so they can be drawn on the canvas. */
  initIcons() {
    this.soundIcon.src = "img/on_canvas_options/unmute.png";
    this.fullscreenIcon.src = "img/on_canvas_options/open-full-screen.png";
  }

  /**
   * Sets up keyboard controls:
   * - Pressing "N" starts the game.
   * - Pressing "X" throws a bottle.
   */
  registerKeyEvents() {
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "n" && !this.gameStarted) {
        this.startGame();
      }
      if (e.key.toLowerCase() === "x" && this.gameStarted) {
        this.throwBottle();
      }
    });
  }

  /** Registers a click on the canvas to play music (needed for browser autoplay rules). */
  registerCanvasClick() {
    this.canvas.addEventListener("click", () => {
      this.soundManager.playMusic();
    });
  }

  /** Resizes the canvas if the window size changes while in fullscreen mode. */
  registerResizeEvent() {
    window.addEventListener("resize", () => {
      if (document.fullscreenElement) this.resizeFullscreen();
    });
  }

  /**
   * Handles clicks on the canvas to:
   * - Toggle fullscreen mode when clicking the fullscreen icon.
   * - Toggle sound when clicking the sound icon.
   * @param {MouseEvent} e - Mouse click event.
   */
  registerClickEvent() {
    this.canvas.addEventListener("click", (e) => {
      const { clickX, clickY } = this.getScaledClickCoordinates(e);
      if (
        this.isInsideArea(
          clickX,
          clickY,
          this.fullscreenX,
          this.fullscreenY,
          this.fullscreenWidth,
          this.fullscreenHeight
        )
      ) {
        this.toggleFullscreen();
      } else if (
        this.isInsideArea(
          clickX,
          clickY,
          this.soundX,
          this.soundY,
          this.soundWidth,
          this.soundHeight
        )
      ) {
        this.toggleSound();
      }
    });
  }

  /**
   * Calculates click coordinates in relation to the canvas scaling.
   * @param {MouseEvent} e - Mouse event containing click position.
   * @returns {{clickX: number, clickY: number}} The scaled click coordinates.
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
   * Checks if a point is inside a rectangle area.
   * @param {number} clickX - X coordinate of the point.
   * @param {number} clickY - Y coordinate of the point.
   * @param {number} x - Rectangle's top-left X position.
   * @param {number} y - Rectangle's top-left Y position.
   * @param {number} width - Rectangle width.
   * @param {number} height - Rectangle height.
   * @returns {boolean} True if point is inside the area.
   */
  isInsideArea(clickX, clickY, x, y, width, height) {
    return (
      clickX >= x && clickX <= x + width && clickY >= y && clickY <= y + height
    );
  }

  /** Toggles sound between muted and unmuted, and updates the icon. */
  toggleSound() {
    this.isMuted = !this.isMuted;
    this.soundIcon.src = this.isMuted
      ? "img/on_canvas_options/mute.png"
      : "img/on_canvas_options/unmute.png";
    this.soundManager.muteAll(this.isMuted);
  }

  /** Switches between fullscreen mode and windowed mode. */
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.canvas.requestFullscreen().then(() => this.onEnterFullscreen());
    } else {
      document.exitFullscreen().then(() => this.onExitFullscreen());
    }
  }

  /** Called when entering fullscreen mode. Resizes the canvas and updates the icon. */
  onEnterFullscreen() {
    this.resizeCanvas(window.innerWidth, window.innerHeight);
    this.fullscreenIcon.src = "img/on_canvas_options/close-full-screen.png";
  }

  /** Called when exiting fullscreen mode. Restores original size and icon. */
  onExitFullscreen() {
    this.resizeCanvas(this.originalWidth, this.originalHeight);
    this.fullscreenIcon.src = "img/on_canvas_options/open-full-screen.png";
  }

  /**
   * Resizes the canvas and updates scale values and icon positions.
   * @param {number} width - New canvas width.
   * @param {number} height - New canvas height.
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

  /** Resizes the canvas to match the fullscreen window size. */
  resizeFullscreen() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.scaleX = this.canvas.width / this.originalWidth;
    this.scaleY = this.canvas.height / this.originalHeight;
    this.fullscreenX = this.canvas.width - 30;
    this.fullscreenY = this.canvas.height - 30;
    this.soundX = this.canvas.width - 30;
    this.soundY = 10;
  }

  /** Links the character to the world so it can access and interact with game elements. */
  setWorld() {
    this.character.world = this;
  }

  /** Main draw loop: updates and renders the game every frame. */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.gameStarted) {
      this.drawStartScreen();
      requestAnimationFrame(() => this.draw());
      return;
    }
    if (this.gameEnded) return;
    this.ctx.save();
    this.ctx.scale(this.scaleX, this.scaleY);
    this.ctx.translate(this.camera_x, 0);
    this.drawBackgroundAndObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.drawUI();
    this.ctx.restore();
    this.drawIcons();
    requestAnimationFrame(() => this.draw());
  }

  /** Draws the start screen image before the game begins. */
  drawStartScreen() {
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

  /** Draws background elements and game objects like enemies, coins, and clouds. */
  drawBackgroundAndObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    if (this.character) this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.thrownBottles);
  }

  /** Draws all UI components (health bar, coin counter, bottle counter, etc.) */
  drawUI() {
    this.addToMap(this.statusBar);
    this.addToMap(this.endBossStatusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
  }

  /** Draws on-screen icons like sound and fullscreen toggle buttons. */
  drawIcons() {
    this.ctx.drawImage(
      this.soundIcon,
      this.soundX,
      this.soundY,
      this.soundWidth,
      this.soundHeight
    );
    this.ctx.drawImage(
      this.fullscreenIcon,
      this.fullscreenX,
      this.fullscreenY,
      this.fullscreenWidth,
      this.fullscreenHeight
    );
  }

  /**
   * Draws multiple objects on the canvas.
   * @param {Array} objects - List of objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Draws a single object to the canvas, flipping it if it faces the other direction.
   * @param {Object} mo - The movable object to draw.
   */
  addToMap(mo) {
    if (mo.img instanceof HTMLImageElement && mo.img.complete) {
      if (mo.otherDirection) {
        this.ctx.save();
        this.ctx.translate(mo.x + mo.width, mo.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
        this.ctx.restore();
      } else {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
      }
    }
  }

  /**
   * Checks if the character is falling onto an enemy (jump attack).
   * @param {Object} enemy - The enemy to check.
   * @returns {boolean} True if the character is jumping on the enemy.
   */
  isJumpingOnEnemy(enemy) {
    return this.character.isFallingOn(enemy);
  }

  /**
   * Removes an enemy from the game by killing it when jumped on.
   * @param {Object} enemy - The enemy to remove.
   */
  removeEnemy(enemy) {
    this.character.speedY = 15;
    this.killEnemy(enemy);
  }

  /**
   * Checks if the player can be hurt by an enemy (side collision and not jumping).
   * @param {Object} enemy - The enemy to check.
   * @returns {boolean} True if the character can take damage.
   */
  canPepeGetHurt(enemy) {
    return (
      this.character.canBeHurt &&
      !enemy.dead &&
      this.character.isSideCollisionWith(enemy) &&
      !this.character.isJumping()
    );
  }

  /** Reduces the player's health and plays hurt animation and sound. */
  hurtPepe() {
    if (!this.character) return;
    this.character.canBeHurt = false;
    this.character.hurtAnimationPlaying = true;
    this.character.percentage -= 20;
    this.statusBar.setPercentage(this.character.percentage);
    this.soundManager.play("pepeHurt");
    if (this.character.percentage <= 0) {
      this.characterDies();
    }
    setTimeout(() => {
      if (!this.character) return;
      this.character.hurtAnimationPlaying = false;
    }, 1000);
    setTimeout(() => {
      if (!this.character) return;
      this.character.canBeHurt = true;
    }, 1200);
  }

  /** Handles the character's death sequence and ends the game. */
  characterDies() {
    this.character.isDead = true;
    this.soundManager.play("pepeDead");
    setTimeout(() => {
      this.character = null;
      this.endGame();
    }, 1500);
  }

  /** Sets up a repeating check for collisions between the player, enemies, and items. */
  checkCollisions() {
    setInterval(() => {
      if (!this.character) return;
      this.level.enemies.forEach((enemy) => {
        if (!(enemy instanceof Endboss)) {
          this.handleEnemyCollision(enemy);
        }
      });
      this.handleBottleEndbossCollision();
      this.handleCollectablesCollision(this.level.coins, "coins", 1);
      this.handleCollectablesCollision(this.level.bottles, "bottles", 1);
    }, 40);
  }

  /** Checks if thrown bottles hit the end boss and reduces boss health. */
  handleBottleEndbossCollision() {
    this.thrownBottles.forEach((bottle, index) => {
      if (bottle.isColliding(this.endBoss) && !bottle.hasSplashed) {
        bottle.splash();
        bottle.hasSplashed = true;
        const newPercentage = this.endBossStatusBar.percentage - 20;
        this.endBossStatusBar.setPercentage(newPercentage);
        if (newPercentage > 0) {
          this.endBoss.playHurt(this);
        } else if (!this.endBoss.dead) {
          this.endBoss.killEndboss(this);
        }
        setTimeout(() => {
          this.thrownBottles.splice(index, 1);
        }, 600);
      }
    });
  }

  /**
   * Handles collision with normal enemies.
   * If jumped on, kills them; if side collision, hurts player.
   * @param {Object} enemy - The enemy to check.
   */
  handleEnemyCollision(enemy) {
    if (this.character.isColliding(enemy)) {
      if (this.isJumpingOnEnemy(enemy)) {
        this.removeEnemy(enemy);
      } else if (this.canPepeGetHurt(enemy)) {
        this.hurtPepe();
      }
    }
  }

  /**
   * Handles collecting coins or bottles.
   * @param {Array} collection - The array of collectible objects.
   * @param {string} type - Type of collectible ("coins" or "bottles").
   * @param {number} value - Amount to add when collected.
   */
  handleCollectablesCollision(collection, type, value) {
    collection.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        collection.splice(index, 1);
        if (type === "coins") {
          this.coinBar.setCoinsCount(this.coinBar.coins + value);
          this.soundManager.play("collectCoin");
        } else if (type === "bottles") {
          this.collectedBottles++;
          this.bottleBar.setBottlesAmount(this.collectedBottles);
        }
      }
    });
  }

  /**
   * Plays enemy death animation and removes them from the level.
   * @param {Object} enemy - The enemy to remove.
   */
  killEnemy(enemy) {
    enemy.dead = true;
    enemy.currentImage = 0;
    enemy.speed = 0;
    this.soundManager.play("chickenHurt");
    let deathInterval = setInterval(() => {
      enemy.playAnimation(enemy.chicken_dead);
    }, 150);
    setTimeout(() => {
      clearInterval(deathInterval);
      const index = this.level.enemies.indexOf(enemy);
      if (index > -1) this.level.enemies.splice(index, 1);
    }, 800);
  }

  /** Throws a bottle from the player's position if bottles are available. */
  throwBottle() {
    if (this.collectedBottles > 0) {
      const bottle = new ThrowableBottle(
        this.character.x + 50,
        this.character.y
      );
      this.thrownBottles.push(bottle);
      this.collectedBottles--;
      this.bottleBar.setBottlesAmount(this.collectedBottles);
    }
  }

  /**
   * Starts the game by setting up the world, checking assets, and enabling collisions.
   */
  startGame() {
    this.setWorld();
    this.checkAssets();
    this.checkCollisions();
    this.gameStarted = true;
    this.soundManager.playMusic();
  }

  /**
   * Ends the game, shows a "Game Over" image, and restarts the game after 3 seconds.
   */
  endGame() {
    this.gameEnded = true;
    this.soundManager.stopMusic();

    const gameOverImage = new Image();
    gameOverImage.src = "./img/10_You_won_you_lost/oh_no_you_lost.png";

    gameOverImage.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(
        gameOverImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    };

    setTimeout(() => {
      this.resetGame();
    }, 3000);
  }

  /**
   * Resets the game by creating a new World object.
   */
  resetGame() {
    world = new World(this.canvas, this.keyboard);
  }
}