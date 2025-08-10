class MoveableObject extends DrawAbleObject {
  /**
   * Speed of horizontal movement (pixels per frame).
   * @type {number}
   */
  speed = 0.15;

  /**
   * Whether the object is facing/moving in the opposite direction.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * Current vertical speed (for jumping/falling).
   * @type {number}
   */
  speedY = 0;

  /**
   * Gravity acceleration applied each frame.
   * @type {number}
   */
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
        this.currentImage = 0; // Restart animation
      } else {
        this.currentImage = images.length - 1; // Stay on last frame
      }
    }

    const path = images[this.currentImage];
    this.img = this.imageCache[path]; // Set current image to display
    this.currentImage++;
  }

  /**
   * Applies gravity to the object by updating vertical speed and position regularly.
   * This simulates jumping and falling.
   */
  applyGravity() {
    setInterval(() => {
      // If object is above ground or moving upwards (jumping/falling)
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY; // Move vertically by speedY
        this.speedY -= this.acceleration; // Decrease speedY due to gravity
      } else {
        this.speedY = 0; // Reset vertical speed if on ground
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground level.
   * @returns {boolean} True if above ground, false if on ground.
   */
  isAboveGround() {
    return this.y < 170; // Ground level assumed at y=170
  }

  /**
   * Moves the object to the right.
   * (Currently only logs a message; should implement movement logic.)
   */
  moveRight() {
    console.log("Move right");
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
      this.speedY = 30; // Initial jump speed upwards
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
  isColliding(obj) {
    const offset = 10;

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