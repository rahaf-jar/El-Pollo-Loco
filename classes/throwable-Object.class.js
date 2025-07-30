class ThrowableBottle extends MoveableObject {

  bottle_rotation = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ]
  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.bottle_rotation);
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;

    this.speedX = 12; 
    this.speedY = 15; 
    this.gravity = 1.2;

    this.throw();
  }

  throw() {
    const throwInterval = setInterval(() => {
      setInterval(() => {
        this.playAnimation(this.bottle_rotation) ;
      }, 50);
      this.x += this.speedX; 
      this.y -= this.speedY;  
      this.speedY -= this.gravity; 

      if (this.y > 350) {  
        clearInterval(throwInterval);
      }
    }, 50);
  }
}