class Chicken extends MoveableObject {
  y = 380;
  width = 65;
  height = 70;

  chicken_walking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 500;
    this.loadImages(this.chicken_walking); 
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.img = this.imageCache[this.chicken_walking[this.currentImage]];
      this.currentImage = (this.currentImage + 1) % this.chicken_walking.length;
    }, 200);
  }
}
