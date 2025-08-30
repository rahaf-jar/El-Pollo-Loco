class EndBossStatusBar extends DrawAbleObject {
  images = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  percentage = 100;

  /**
   * Initializes the end boss status bar, loads images, and sets position and size.
   */
  constructor() {
    super();
    this.loadImages(this.images);
    this.x = 460;
    this.y = 6;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
   * Updates the end boss health percentage and sets the correct image.
   * @param {number} percentage - New percentage value (0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = Math.max(0, percentage);
    const index = this.resolveImageIndex(
      this.percentage,
      [0, 20, 40, 60, 80, 100]
    );
    this.img = this.imageCache[this.images[index]];
  }
}