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

  throw() {
    this.rotationInterval = setInterval(() => {
      if (!this.hasSplashed) {
        this.playAnimation(this.bottle_rotation);
      }
    }, 50);
  }

  splash() {
    this.hasSplashed = true;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0;

    clearInterval(this.rotationInterval);

    this.playAnimation(this.bottle_splash);
  }

  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (!this.hasSplashed && (this.isAboveGround() || this.speedY > 0)) {
        this.y -= this.speedY;
        this.speedY -= this.gravity;
        this.x += this.speedX;
      }
    }, 1000 / 25);
  }

  stopAllMovement() {
    clearInterval(this.rotationInterval);
    clearInterval(this.gravityInterval);
  }
}