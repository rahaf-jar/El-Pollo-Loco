/**
 * Represents a throwable bottle object that can be thrown, rotate mid-air,
 * splash on impact, and is affected by gravity.
 * Extends MoveableObject to inherit position and movement properties.
 */
class ThrowableBottle extends MoveableObject {
  hasSplashed = false;
  bottle_rotation = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  bottle_splash = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a throwable bottle at the specified coordinates.
   * @param {number} x - The initial x-position of the bottle.
   * @param {number} y - The initial y-position of the bottle.
   */
  constructor(x, y) {
    super();
    this.loadImage(this.bottle_rotation[0]);
    this.loadImages(this.bottle_rotation);
    this.loadImages(this.bottle_splash);

    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;

    this.speedX = 12;
    this.speedY = 10;
    this.gravity = 1;

    this.applyGravity();
    this.throw();
  }

  /**
   * Starts the bottle rotation animation while in the air.
   * Runs repeatedly until the bottle splashes.
   */
  throw() {
    this.rotationInterval = setInterval(() => {
      if (!this.hasSplashed) {
        this.playAnimation(this.bottle_rotation);
      }
    }, 50);
  }

  /**
   * Triggers the splash animation and stops all movement.
   * Called when the bottle collides or hits the ground.
   */
  splash() {
    this.hasSplashed = true;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0;

    clearInterval(this.rotationInterval);

    this.playAnimation(this.bottle_splash);
  }

  /**
   * Applies gravity to the bottle, updating its position over time.
   * Moves the bottle while it's above ground or falling.
   */
  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (!this.hasSplashed && (this.isAboveGround() || this.speedY > 0)) {
        this.y -= this.speedY;
        this.speedY -= this.gravity;
        this.x += this.speedX;
      }
    }, 1000 / 25);
  }

  /**
   * Stops all movement and animation intervals related to the bottle.
   */
  stopAllMovement() {
    clearInterval(this.rotationInterval);
    clearInterval(this.gravityInterval);
  }
}