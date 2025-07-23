class Endboss extends MoveableObject {
  y = 60;
  width = 350;
  height = 400;
  endboss_walking = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor() {
    super();
    this.loadImage(this.endboss_walking[0]);
    this.loadImages(this.endboss_walking);
    this.x = 2500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.img = this.imageCache[this.endboss_walking[this.currentImage]];
      this.currentImage = (this.currentImage + 1) % this.endboss_walking.length;
    }, 200);
  }
}
