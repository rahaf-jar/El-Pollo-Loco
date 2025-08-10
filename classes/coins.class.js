class Coin extends DrawAbleObject {
  constructor(x, y) {
    super();
    this.loadImage("img/8_coin/coin_1.png");
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 90;
  }

  /**
   * Circle-based collision detection with another object.
   * Assumes other object has x, y, width, height.
   * @param {object} obj - Object to check collision with.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isColliding(obj) {
    const coinCenterX = this.x + this.width / 2;
    const coinCenterY = this.y + this.height / 2;
    const coinRadius = (this.width / 2) * 0.4;

    const objCenterX = obj.x + obj.width / 2;
    const objCenterY = obj.y + obj.height / 2;

    const objRadius = Math.min(obj.width, obj.height) / 2;

    const dx = coinCenterX - objCenterX;
    const dy = coinCenterY - objCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < coinRadius + objRadius;
  }
}
