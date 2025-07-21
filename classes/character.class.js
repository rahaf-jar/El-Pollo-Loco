class Character extends MoveableObject {
  height = 280;
  width = 130;
  y = 170;
  pepe_walking = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  currentImage = 0;

  constructor() {
    super();
    this.loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.pepe_walking); 
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.img = this.imageCache[this.pepe_walking[this.currentImage]];
      this.currentImage = (this.currentImage + 1) % this.pepe_walking.length;
    }, 100);
  }
}
