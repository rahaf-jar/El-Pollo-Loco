class MoveableObject {
  x = 120;
  y = 250;
  img;
  height = 200;
  width = 100;
  imageCache = {};

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['path1', 'path2', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log("Move right");
  }

  moveLeft() {}
}
