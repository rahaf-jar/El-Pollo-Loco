class MoveableObject extends DrawAbleObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

  /**
   * Plays an animation from an array of image paths.
   * @param {string[]} images - Array of image paths for animation frames.
   * @param {boolean} [loop=true] - Whether to loop the animation or stop at the last frame.
   */
  playAnimation(images, loop = true) {
    if (!images || images.length === 0) return;

    if (this.currentImage >= images.length) {
      if (loop) {
        this.currentImage = 0;
      } else {
        this.currentImage = images.length - 1;
      }
    }

    const path = images[this.currentImage];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Applies gravity to the object by updating vertical speed and position regularly.
   * This simulates jumping and falling.
   */
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

  /**
   * Checks if the object is above the ground level.
   * @returns {boolean} True if above ground, false if on ground.
   */
  isAboveGround() {
    return this.y < 170;
  }

  /**
   * Moves the object to the left by decreasing its x position every frame.
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  /**
   * Makes the object jump by setting upward vertical speed if on the ground.
   */
  jump() {
    if (!this.isAboveGround()) {
      this.speedY = 30;
    }
  }

  /**
   * Checks if the object is currently jumping (moving upwards above ground).
   * @returns {boolean} True if jumping, false otherwise.
   */
  isJumping() {
    return this.isAboveGround() && this.speedY > 0;
  }

  /**
   * Checks if this object is colliding (overlapping) with another object.
   * Uses a small offset to ignore edges.
   * @param {MoveableObject} obj - Another object to check collision against.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isColliding(obj, offset = 10) {
    const thisLeft = this.x + offset;
    const thisRight = this.x + this.width - offset;
    const thisTop = this.y + offset;
    const thisBottom = this.y + this.height - offset;

    const objLeft = obj.x + offset;
    const objRight = obj.x + obj.width - offset;
    const objTop = obj.y + offset;
    const objBottom = obj.y + obj.height - offset;

    return (
      thisRight > objLeft &&
      thisLeft < objRight &&
      thisBottom > objTop &&
      thisTop < objBottom
    );
  }

  /**
   * Checks if there is a side collision with another object.
   * Specifically checks horizontal overlap and vertical body contact ignoring edges.
   * @param {MoveableObject} obj - Another object to check side collision against.
   * @returns {boolean} True if side collision detected, false otherwise.
   */
  isSideCollisionWith(obj) {
    const horizontalOverlap =
      this.x + this.width > obj.x && this.x < obj.x + obj.width;
    const verticalBodyTouch =
      this.y + this.height > obj.y + 10 && this.y < obj.y + obj.height - 10;

    return horizontalOverlap && verticalBodyTouch;
  }

  /**
   * Checks if this object is falling onto another object.
   * Used to detect if it lands on top of the other object.
   * @param {MoveableObject} obj - The object potentially being fallen on.
   * @returns {boolean} True if falling on the object, false otherwise.
   */
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
