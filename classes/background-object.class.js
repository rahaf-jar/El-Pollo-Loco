class BackgroundObject extends MoveableObject {
  width = 720;
  height = 480;

  /**
   * Creates a new BackgroundObject.
   * @param {string} imagePath - The path to the image representing the background object.
   * @param {number} x - The horizontal position (X coordinate) of the object in the world.
   */
  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
