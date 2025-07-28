class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.gameEnded) return;

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    if (this.character) this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(() => self.draw());
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
    console.log("Pepe jumped on enemy and kills it!");
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
    console.log("Pepe got hurt by enemy!");
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
      console.log("Hurt animation finished.");
    }, 1000);

    setTimeout(() => {
      if (!this.character) return;
      this.character.canBeHurt = true;
      console.log("Pepe can get hurt again.");
    }, 1200);
  }

  characterDies() {
    console.log("Pepe has died.");
    this.character.isDead = true;
    setTimeout(() => {
      this.character = null;
      this.endGame();
    }, 1500);
  }

  checkCollisions() {
    setInterval(() => {
      if (!this.character) return;

      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          console.log("Collision happened!");

          if (this.isJumpingOnEnemy(enemy)) {
            this.removeEnemy(enemy);
          } else if (this.canPepeGetHurt(enemy)) {
            this.hurtPepe();
          }
        }
      });
    }, 100);
  }

  killEnemy(enemy) {
    console.log("Killing enemy...");
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
        console.log("Enemy removed from level.");
      }
    }, 800);
  }

  endGame() {
    console.log("GAME OVER");
    this.gameEnded = true;

    this.ctx.font = "60px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(
      "GAME OVER",
      this.canvas.width / 2 - 160,
      this.canvas.height / 2
    );
  }
}
