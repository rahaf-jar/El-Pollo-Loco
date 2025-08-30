class DrawAbleObject {
  height = 200;
  width = 100;
  x = 120;
  y = 250;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Loads a single image and assigns it as the current image.
   * @param {string} path - The file path of the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images into the image cache for animations.
   * @param {string[]} arr - Array of image file paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Resolves the correct image index based on a value and an array of thresholds.
   * @param {number} value - The current value (e.g., percentage or count).
   * @param {number[]} thresholds - An array of threshold values sorted in ascending order.                          Each threshold maps to an index in the image array.
   * @returns {number} The index in the image array that corresponds to the current value.
   */
  resolveImageIndex(value, thresholds) {
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (value >= thresholds[i]) {
        return i;
      }
    }
    return 0;
  }
}