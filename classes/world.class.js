class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

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

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);

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

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          console.log("Collision detected!");

          if (this.character.isFallingOn(enemy)) {
            console.log("Pepe is falling on enemy! Killing enemy.");
            this.character.speedY = 15;
            this.killEnemy(enemy);
          } else if (
            this.character.canBeHurt &&
            !enemy.dead &&
            this.character.isSideCollisionWith(enemy) &&
            !this.character.isJumping()
          ) {
            console.log("Pepe is hurt from the side!");

            this.character.canBeHurt = false;
            this.character.hurtAnimationPlaying = true;

            setTimeout(() => {
              this.character.hurtAnimationPlaying = false;
              console.log("Hurt animation ended.");
            }, 1000);

            setTimeout(() => {
              this.character.canBeHurt = true;
              console.log("Pepe can be hurt again.");
            }, 1200);
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
}
