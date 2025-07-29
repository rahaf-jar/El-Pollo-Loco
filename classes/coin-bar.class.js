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

  constructor() {
    super();
    this.loadImages(this.images);
    this.x = 40;
    this.y = 45;
    this.width = 200;
    this.height = 50;
    this.setCoinsCount(100);
  }

  setCoinsCount(coins) {
    this.coins = Math.max(0, coins); 
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
 
  resolveImageIndex() {
    if (this.coins == 100) {
      return 0;
    } else if (this.coins > 80) {
      return 1;
    } else if (this.coins > 60) {
      return 2;
    } else if (this.coins > 40) {
      return 3;
    } else if (this.coins > 20) {
      return 4;
    } else {
      return 5;
    }
  }
}