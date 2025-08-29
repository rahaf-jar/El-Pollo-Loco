class Chicken extends MoveableObject {
  y = 380;
  width = 65;
  height = 70;
  dead = false;
  animationSpeed = 100; 
  lastFrameTime = 0;

  chicken_walking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  chicken_dead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Creates a new Chicken instance at the specified X coordinate.
   * Loads walking and dead images and sets a random speed.
   * 
   * @param {number} x - The horizontal position of the chicken.
   */
  constructor(x) {
    super();
    this.loadImage(this.chicken_walking[0]);
    this.loadImages(this.chicken_walking);
    this.loadImages(this.chicken_dead);
    this.x = x;
    this.speed = 0.15 + Math.random() * 0.6;
  }

  /**
   * Updates the chicken's position and animation frame.
   * If the chicken is alive, it walks left and animates.
   * If dead, plays the dead animation.
   */
  update() {
    this.x -= this.speed;

    const now = Date.now();
    if (!this.dead) {
      if (now - this.lastFrameTime > this.animationSpeed) {
        this.playAnimation(this.chicken_walking);
        this.lastFrameTime = now;
      }
    } else {
      this.playAnimation(this.chicken_dead);
    }
  }
}