/**
 * Represents an enemy chicken that moves left and can be dead or alive.
 * Extends MoveableObject to inherit movement and animation capabilities.
 */
class Chicken extends MoveableObject {
  y = 380;
  width = 65;
  height = 70;
  dead = false;

  chicken_walking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  chicken_dead = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
  ];

  /**
   * Creates a new Chicken instance at the specified X coordinate.
   * Initializes images, random speed, and starts animations.
   * 
   * @param {number} x - The initial horizontal position of the chicken.
   */
  constructor(x) {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.chicken_walking);
    this.loadImages(this.chicken_dead);
    this.x = x;
    this.speed = 0.15 + Math.random() * 0.6;
    this.animate();
  }

  /**
   * Starts the chicken animation loop, switching between walking and dead animations.
   * Also continuously moves the chicken left unless it is dead.
   */
  animate() {
    this.moveLeft();
    setInterval(() => {
      if (this.dead) {
        this.playAnimation(this.chicken_dead);
      } else {
        this.playAnimation(this.chicken_walking);
      }
    }, 200);
  }

  /**
   * Continuously moves the chicken left at its speed, unless it is dead.
   */
  moveLeft() {
    setInterval(() => {
      if (!this.dead) {
        this.x -= this.speed;
      }
    }, 1000 / 60);
  }
}