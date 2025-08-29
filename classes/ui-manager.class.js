class UIManager {
  /**
   * Creates a UIManager instance.
   * @param {Object} world - The game world containing UI elements.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
  constructor(world, ctx) {
    this.world = world;
    this.ctx = ctx;
  }

  /**
   * Draws the main UI bars (status bar, end boss bar, coin bar, bottle bar).
   */
  drawUI() {
    this.addToMap(this.world.statusBar);
    this.addToMap(this.world.endBossStatusBar);
    this.addToMap(this.world.coinBar);
    this.addToMap(this.world.bottleBar);
  }

  /**
   * Draws icons like sound and fullscreen buttons on the canvas.
   */
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

  /**
   * Adds an object's image to the canvas map, handling flipping for direction.
   * @param {Object} obj - The drawable object with image and position properties.
   */
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
