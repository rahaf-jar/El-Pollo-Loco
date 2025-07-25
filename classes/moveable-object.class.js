class MoveableObject extends DrawAbleObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

  playAnimation(images) {
    if (!images || images.length === 0) {
      console.warn("No images passed to playAnimation");
      return;
    }

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

  isJumping() {
    return this.isAboveGround() && this.speedY > 0;
  }

  isColliding(obj) {
    return (
      this.x + this.width > obj.x &&
      this.x < obj.x + obj.width &&
      this.y + this.height > obj.y &&
      this.y < obj.y + obj.height
    );
  }

  isSideCollisionWith(obj) {
    const horizontalOverlap =
      this.x + this.width > obj.x && this.x < obj.x + obj.width;
    const verticalBodyTouch =
      this.y + this.height > obj.y + 10 && this.y < obj.y + obj.height - 10;

    return horizontalOverlap && verticalBodyTouch;
  }

  isFallingOn(obj) {
    const isFalling = this.speedY <= 5;
    const feetNearEnemyTop =
      this.y + this.height >= obj.y - obj.height &&
      this.y + this.height <= obj.y + obj.height;
    const horizontallyAligned =
      this.x + this.width > obj.x && this.x < obj.x + obj.width;

    return isFalling && feetNearEnemyTop && horizontallyAligned;
  }
}
