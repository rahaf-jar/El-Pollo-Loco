class Chicken extends MoveableObject {
  y = 380;
  width = 50;
  height = 70;

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 500;
  }
}
