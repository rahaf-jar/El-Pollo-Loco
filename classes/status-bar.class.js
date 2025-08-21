/**
 * Represents a health/status bar that visually indicates a percentage value.
 * Extends DrawAbleObject to render images representing different health levels.
 */
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
   * Initializes the status bar, loads images, sets initial position and size,
   * and sets the initial percentage to 100%.
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
   * Updates the displayed image according to the given percentage.
   * @param {number} percentage - The new percentage value (clamped to 0 or above).
   */
  setPercentage(percentage) {
    this.percentage = Math.max(0, percentage);
    const path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the appropriate image index based on the current percentage.
   * @returns {number} Index in the images array corresponding to the percentage.
   */
  resolveImageIndex() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage > 60) {
      return 4;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}