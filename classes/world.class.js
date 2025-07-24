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
}
