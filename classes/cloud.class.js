class Cloud extends MoveableObject {
  y = 20;
  height = 250;
  width = 750;
  speed = 0.15;

  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = Math.random() * 500;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.20;
    }, 1000 / 60);
  }
}