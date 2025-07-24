class MoveableObject {
  x = 120;
  y = 250;
  img;
  height = 200;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 170;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['path1', 'path2', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log("Move right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  jump() {
    if (!this.isAboveGround()) {
      this.speedY = 30;
    }
  }
}