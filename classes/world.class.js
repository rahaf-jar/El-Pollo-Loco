class World {
  character = new Character();
  endBoss = new Endboss();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  endBossStatusBar = new EndBossStatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  collectedBottles = 0;

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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.checkAssets();
    this.initIcons();
    this.draw();
    this.setWorld();
    this.checkCollisions();

    this.registerKeyEvents();
    this.registerClickEvent();
    this.registerCanvasClick();
    this.registerResizeEvent();

    this.originalWidth = canvas.width;
    this.originalHeight = canvas.height;
  }

  checkAssets() {
    if (!this.level.coins) console.error("Coins not loaded!");
    if (!this.level.bottles) console.error("Bottles not loaded!");
  }

  initIcons() {
    this.soundIcon.src = "img/on_canvas_options/unmute.png";
    this.fullscreenIcon.src = "img/on_canvas_options/open-full-screen.png";
  }

  registerKeyEvents() {
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "x") this.throwBottle();
    });
  }

  registerCanvasClick() {
    this.canvas.addEventListener("click", () => {
      if (!this.bgMusic) this.playBackgroundMusic();
    });
  }

  registerResizeEvent() {
    window.addEventListener("resize", () => {
      if (document.fullscreenElement) this.resizeFullscreen();
    });
  }

  playBackgroundMusic() {
    this.bgMusic = new Audio("audio/game-music.mp3");
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.5;
    this.bgMusic.play().catch(() => {});
  }

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

  getScaledClickCoordinates(e) {
    const rect = this.canvas.getBoundingClientRect();
    let clickX = e.clientX - rect.left;
    let clickY = e.clientY - rect.top;

    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    return {
      clickX: clickX * scaleX,
      clickY: clickY * scaleY,
    };
  }

  isInsideArea(clickX, clickY, x, y, width, height) {
    return (
      clickX >= x && clickX <= x + width && clickY >= y && clickY <= y + height
    );
  }

  toggleSound() {
    if (!this.bgMusic) return;
    this.isMuted = !this.isMuted;
    this.bgMusic.muted = this.isMuted;
    this.soundIcon.src = this.isMuted
      ? "img/on_canvas_options/mute.png"
      : "img/on_canvas_options/unmute.png";
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.canvas
        .requestFullscreen()
        .then(() => this.onEnterFullscreen())
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => this.onExitFullscreen())
        .catch(() => {});
    }
  }

  onEnterFullscreen() {
    this.resizeCanvas(window.innerWidth, window.innerHeight);
    this.fullscreenIcon.src = "img/on_canvas_options/close-full-screen.png";
  }

  onExitFullscreen() {
    this.resizeCanvas(this.originalWidth, this.originalHeight);
    this.fullscreenIcon.src = "img/on_canvas_options/open-full-screen.png";
  }

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

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

  drawBackgroundAndObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    if (this.character) this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.clouds);
  }

  drawUI() {
    this.addToMap(this.statusBar);
    this.addToMap(this.endBossStatusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
  }

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

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

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

  isJumpingOnEnemy(enemy) {
    return this.character.isFallingOn(enemy);
  }

  removeEnemy(enemy) {
    this.character.speedY = 15;
    this.killEnemy(enemy);
  }

  canPepeGetHurt(enemy) {
    return (
      this.character.canBeHurt &&
      !enemy.dead &&
      this.character.isSideCollisionWith(enemy) &&
      !this.character.isJumping()
    );
  }

  hurtPepe() {
    if (!this.character) return;
    this.character.canBeHurt = false;
    this.character.hurtAnimationPlaying = true;

    this.character.percentage -= 20;
    this.statusBar.setPercentage(this.character.percentage);

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

  characterDies() {
    this.character.isDead = true;
    setTimeout(() => {
      this.character = null;
      this.endGame();
    }, 1500);
  }

  checkCollisions() {
    setInterval(() => {
      if (!this.character) return;

      this.level.enemies.forEach((enemy) => this.handleEnemyCollision(enemy));
      this.handleCollectablesCollision(this.level.coins, "coins", 20);
      this.handleCollectablesCollision(this.level.bottles, "bottles", 1);
    }, 100);
  }

  handleEnemyCollision(enemy) {
    if (this.character.isColliding(enemy)) {
      if (this.isJumpingOnEnemy(enemy)) {
        this.removeEnemy(enemy);
      } else if (this.canPepeGetHurt(enemy)) {
        this.hurtPepe();
      }
    }
  }

  handleCollectablesCollision(collection, type, value) {
    collection.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        collection.splice(index, 1);
        if (type === "coins") {
          this.coinBar.setCoinsCount(this.coinBar.coins + value);
        } else if (type === "bottles") {
          this.collectedBottles++;
          this.bottleBar.setBottlesAmount(this.collectedBottles);
        }
      }
    });
  }

  killEnemy(enemy) {
    enemy.dead = true;
    enemy.currentImage = 0;
    enemy.speed = 0;

    let deathInterval = setInterval(() => {
      enemy.playAnimation(enemy.chicken_dead);
    }, 150);

    setTimeout(() => {
      clearInterval(deathInterval);
      const index = this.level.enemies.indexOf(enemy);
      if (index > -1) {
        this.level.enemies.splice(index, 1);
      }
    }, 800);
  }

  endGame() {
    this.gameEnded = true;

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
  }

  throwBottle() {
    if (this.collectedBottles > 0) {
      const bottle = new ThrowableBottle(
        this.character.x + 50,
        this.character.y
      );
      this.level.bottles.push(bottle);
      this.collectedBottles--;
      this.bottleBar.setBottlesAmount(this.collectedBottles);
    }
  }
}