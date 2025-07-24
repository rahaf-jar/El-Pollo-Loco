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

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.chicken_walking);
    this.loadImages(this.chicken_dead);
    this.x = 200 + Math.random() * 500; 
    this.speed = 0.15 + Math.random() * 0.6;
    this.animate();
  }

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

  moveLeft() {
    setInterval(() => {
      if (!this.dead) {
        this.x -= this.speed;
      }
    }, 1000 / 60);
  }
}