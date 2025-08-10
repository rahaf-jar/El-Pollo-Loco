/**
 * Represents the UI status bar for the player's collected bottles.
 * Extends DrawAbleObject to visually show the number of bottles using images.
 */
class BottleBar extends DrawAbleObject {
  /**
   * Array of image paths representing the different bottle levels (0 to 5).
   * Each image shows a different fill level of the bottle bar.
   * @type {string[]}
   */
  images = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * Current number of collected bottles (max 5).
   * @type {number}
   */
  bottles = 100;

  /**
   * Creates a new BottleBar instance, initializes position and images.
   */
  constructor() {
    super();
    this.loadImages(this.images);
    this.x = 40;
    this.y = 90;
    this.width = 200;
    this.height = 50;
    this.setBottlesAmount(0); // Start with 0 bottles displayed
  }

  /**
   * Updates the bottle bar UI based on the number of collected bottles.
   * Accepts values between 0 and 5. Any values outside that range will be clamped.
   *
   * @param {number} bottles - Number of bottles collected (0 to 5).
   */
  setBottlesAmount(bottles) {
    this.bottles = Math.max(0, Math.min(5, bottles));
    const index = this.resolveImageIndex();
    const path = this.images[index];
    this.img = this.imageCache[path];
  }

  /**
   * Maps the current number of bottles to the correct image index.
   * @returns {number} Index of the image in the `images` array.
   */
  resolveImageIndex() {
    switch (this.bottles) {
      case 5: return 5;
      case 4: return 4;
      case 3: return 3;
      case 2: return 2;
      case 1: return 1;
      default: return 0;
    }
  }
}
