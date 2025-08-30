class StatusBar extends DrawAbleObject {
  images = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;

  /**
   * Initializes the status bar, loads images, sets position and size.
   */
  constructor() {
    super();
    this.loadImages(this.images);
    this.x = 40;
    this.y = 0;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
   * Updates the health percentage and sets the corresponding status bar image.
   * @param {number} percentage - New health percentage (0 to 100).
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
