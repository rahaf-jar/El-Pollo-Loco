let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("my character is", world.character);
}

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

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
});
