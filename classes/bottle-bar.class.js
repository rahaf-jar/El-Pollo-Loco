class BottleBar extends DrawAbleObject {
  images = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  bottles = 0;

  /**
   * Initializes the bottle bar, loads images, and sets its position and size.
   */
  constructor() {
    super();
    this.loadImages(this.images);
    this.x = 40;
    this.y = 90;
    this.width = 200;
    this.height = 50;
    this.setBottlesAmount(0);
  }

  /**
   * Sets the number of collected bottles and updates the corresponding image.
   * @param {number} bottles - Number of bottles collected (0 to 5).
   */
  setBottlesAmount(bottles) {
    this.bottles = Math.max(0, Math.min(5, bottles));
    const index = this.resolveImageIndex(this.bottles, [0, 1, 2, 3, 4, 5]);
    this.img = this.imageCache[this.images[index]];
  }
}