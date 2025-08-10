class UIManager {
  constructor(world, ctx) {
    this.world = world;
    this.ctx = ctx;
  }

  drawUI() {
    this.addToMap(this.world.statusBar);
    this.addToMap(this.world.endBossStatusBar);
    this.addToMap(this.world.coinBar);
    this.addToMap(this.world.bottleBar);
  }

  drawIcons() {
    this.ctx.drawImage(
      this.world.soundIcon,
      this.world.soundX,
      this.world.soundY,
      this.world.soundWidth,
      this.world.soundHeight
    );

    this.ctx.drawImage(
      this.world.fullscreenIcon,
      this.world.fullscreenX,
      this.world.fullscreenY,
      this.world.fullscreenWidth,
      this.world.fullscreenHeight
    );
  }

  addToMap(obj) {
    if (obj.img instanceof HTMLImageElement && obj.img.complete) {
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
}
