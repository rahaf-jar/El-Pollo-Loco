class Cloud extends MoveableObject {
  y = 20;
  height = 250;
  width = 750;

  /**
   * Creates a new Cloud instance with a specified image and a random horizontal start position.
   * Starts the cloud movement animation immediately.
   * 
   * @param {string} imagePath - The file path to the cloud image to load.
   */
  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = Math.random() * 500;
    this.animate();
  }

  /**
   * Starts the cloud's movement animation by initiating leftward movement.
   */
  animate() {
    this.moveLeft();
  }
}