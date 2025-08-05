class BottleBar extends DrawAbleObject {
  images = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  bottles = 100;

  constructor() {
    super();
    this.loadImages(this.images);
    this.x = 40;
    this.y = 90;
    this.width = 200;
    this.height = 50;
    this.setBottlesAmount(0);
  }

  setBottlesAmount(bottles) {
    this.bottles = Math.max(0, Math.min(5, bottles)); 
    const index = this.resolveImageIndex();
    const path = this.images[index];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    switch (this.bottles) {
      case 5:
        return 5; 
      case 4:
        return 4; 
      case 3:
        return 3;
      case 2:
        return 2; 
      case 1:
        return 1;
      default:
        return 0; 
    }
  }
}
