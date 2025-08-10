/**
 * Generates an array of background objects spanning from the left to the right coordinate.
 * The backgrounds are tiled horizontally with alternating sets for visual variety.
 *
 * Each tile consists of multiple layers:
 * - Air layer (always the same image)
 * - Third, second, and first layers that alternate between set 1 and set 2 images
 *
 * @param {number} left - The starting x-coordinate from where to generate background tiles.
 * @param {number} right - The ending x-coordinate up to which background tiles are generated.
 * @returns {BackgroundObject[]} An array of BackgroundObject instances representing the layered background tiles.
 */
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