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
    this.setBottlesAmount(100);
  }

  setBottlesAmount(bottles) {
    this.bottles = Math.max(0, bottles); 
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
 
  resolveImageIndex() {
    if (this.bottles == 100) {
      return 5;
    } else if (this.bottles > 80) {
      return 4;
    } else if (this.bottles > 60) {
      return 3;
    } else if (this.bottles > 40) {
      return 2;
    } else if (this.bottles > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}