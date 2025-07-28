class Bottle extends DrawAbleObject {
  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png"); 
    this.x = x;
    this.y = 380; 
    this.width = 60;
    this.height = 70;
  }
}