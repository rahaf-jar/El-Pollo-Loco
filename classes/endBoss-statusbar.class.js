/**
 * Represents the status bar for the End Boss's health.
 * Extends DrawAbleObject to display different health states as images.
 */
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
   * Creates a new EndBossStatusBar instance, loading images and setting position.
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
   * Updates the health percentage and sets the corresponding status bar image.
   * @param {number} percentage - New health percentage (clamped to 0 or above).
   */
  setPercentage(percentage) {
    this.percentage = Math.max(0, percentage);
    const path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the image index based on current health percentage.
   * @returns {number} Index corresponding to the health state image.
   */
  resolveImageIndex() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}