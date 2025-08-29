class SmallChicken extends MoveableObject {
  y = 400;
  width = 45;
  height = 50;
  dead = false;
  animationSpeed = 100;
  lastFrameTime = 0;
  small_chicken_walking = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  chicken_dead = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Creates a new SmallChicken at a given horizontal position.
   * Loads images and assigns random speed.
   * 
   * @param {number} x - The X position where the chicken starts.
   */
  constructor(x) {
    super();
    this.loadImage(this.small_chicken_walking[0]);
    this.loadImages(this.small_chicken_walking);
    this.loadImages(this.chicken_dead);
    this.x = x;
    this.speed = 0.35 + Math.random() * 2.9;
  }

  /**
   * Updates the chicken’s position and animation frame.
   * Moves left if alive and plays correct animation.
   */
  update() {
    this.x -= this.speed;

    const now = Date.now();
    if (!this.dead) {
      if (now - this.lastFrameTime > this.animationSpeed) {
        this.playAnimation(this.small_chicken_walking);
        this.lastFrameTime = now;
      }
    } else {
      this.playAnimation(this.chicken_dead);
    }
  }
}