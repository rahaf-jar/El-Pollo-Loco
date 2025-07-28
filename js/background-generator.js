function generateBackgroundObjects(left, right) {
  const tileWidth = 719;
  const backgrounds = [];
  for (let x = left; x <= right; x += tileWidth) {
    let set = (Math.floor(x / tileWidth) % 2 === 0) ? 1 : 2;

    let air = "img/5_background/layers/air.png";
    let third = `img/5_background/layers/3_third_layer/${set}.png`;
    let second = `img/5_background/layers/2_second_layer/${set}.png`;
    let first = `img/5_background/layers/1_first_layer/${set}.png`;

    backgrounds.push(new BackgroundObject(air, x));
    backgrounds.push(new BackgroundObject(third, x));
    backgrounds.push(new BackgroundObject(second, x));
    backgrounds.push(new BackgroundObject(first, x));
    backgrounds.push(new BackgroundObject(first, x));
  }

  return backgrounds;
}