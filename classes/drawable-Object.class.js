/**
 * Base class for drawable objects in the game.
 * Handles image loading and caching for animation frames.
 */
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
}