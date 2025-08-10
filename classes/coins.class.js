/**
 * Represents a collectible coin object in the game world.
 * Extends DrawAbleObject to provide drawing functionality.
 */
class Coin extends DrawAbleObject {
  /**
   * Creates a new Coin instance at the specified position.
   *
   * @param {number} x - The X coordinate where the coin will be placed.
   * @param {number} y - The Y coordinate where the coin will be placed.
   */
  constructor(x, y) {
    super();
    this.loadImage("img/8_coin/coin_1.png");
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 90;
  }
}