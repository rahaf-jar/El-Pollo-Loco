/**
 * Represents a control button on the screen (for mobile).
 * Extends DrawAbleObject so it can be drawn like other UI elements.
 */
class ControlButton extends DrawAbleObject {
  /**
   * Creates a new button
   * @param {string} imgPath 
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height
   * @param {string} action
   */
  constructor(imgPath, x, y, width, height, action) {
    super().loadImage(imgPath);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.action = action; 
  }
}