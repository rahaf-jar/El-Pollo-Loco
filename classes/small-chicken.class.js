class SmallChicken extends MoveableObject {
  y = 400;
  width = 45;
  height = 50;
  dead = false;

  small_chicken_walking = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",

  ];

  chicken_dead = [
    "img/3_enemies_chicken/chicken_small/2_dead/dead.png"
  ];

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.small_chicken_walking);
    this.loadImages(this.chicken_dead);
    this.x = 200 + Math.random() * 500; 
    this.speed = 0.35 + Math.random() * 2.9;
    this.animate();
  }

  animate() {
    this.moveLeft();
    setInterval(() => {
      if (this.dead) {
        this.playAnimation(this.chicken_dead);
      } else {
        this.playAnimation(this.small_chicken_walking);
      }
    }, 200);
  }

  moveLeft() {
    setInterval(() => {
      if (!this.dead) {
        this.x -= this.speed;
      }
    }, 1000 / 60);
  }
}