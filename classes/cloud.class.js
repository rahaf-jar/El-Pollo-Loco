class Cloud extends MoveableObject {
  y = 20;
  height = 250;
  width = 750;

  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = Math.random() * 500;

    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
