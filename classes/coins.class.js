class Coin extends DrawAbleObject {
  constructor(x, y) {
    super();
    this.loadImage("img/8_coin/coin_1.png"); 
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 90;
  }
}