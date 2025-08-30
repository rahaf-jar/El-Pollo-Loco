class CoinBar extends DrawAbleObject {
  images = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  coins = 0;

  /**
   * Initializes the coin bar, loads images, and sets default values.
   */
  constructor() {
    super();
    this.loadImages(this.images);
    this.x = 40;
    this.y = 45;
    this.width = 200;
    this.height = 50;
    this.setCoinsCount(0);
  }

  /**
   * Updates the coin count and sets the appropriate image.
   * @param {number} coins - New coin count (0 to 100).
   */
  setCoinsCount(coins) {
    this.coins = Math.max(0, Math.min(100, coins));
    const index = this.resolveImageIndex(this.coins, [0, 20, 40, 60, 80, 100]);
    this.img = this.imageCache[this.images[index]];
  }
}