/**
 * Generates an array of Coin objects positioned in groups along the x-axis.
 * Each group contains 10 coins arranged in a pattern plus a random line of 5 coins.
 * @returns {Coin[]} Array of Coin instances representing collectible coins.
 */
function generateCoins() {
  const coins = [];
  const totalGroups = 10;
  const startX = 400;
  const spacing = 800;
  for (let i = 0; i < totalGroups; i++) {
    const baseX = startX + i * spacing;
    coins.push(new Coin(baseX, 180));
    coins.push(new Coin(baseX + 50, 130));
    coins.push(new Coin(baseX + 100, 110));
    coins.push(new Coin(baseX + 150, 130));
    coins.push(new Coin(baseX + 200, 180));
    const lineStartX = baseX + 300 + Math.random() * 200;
    const y = 250 + Math.floor(Math.random() * 40);
    for (let i = 0; i < 5; i++) {
      coins.push(new Coin(lineStartX + i * 50, y));
    }
  }
  return coins;
}

/**
 * Generates an array of Bottle objects spaced out along the x-axis.
 * @returns {Bottle[]} Array of Bottle instances representing throwable bottles.
 */
function generateBottles() {
  const bottles = [];
  const totalBottles = 5;
  const startX = 1000;
  const spacing = 1500;
  for (let i = 0; i < totalBottles; i++) {
    const x = startX + i * spacing;
    bottles.push(new Bottle(x));
  }
  return bottles;
}

/**
 * Generates an array of Chicken enemy objects spaced along the x-axis with some randomness.
 * @returns {Chicken[]} Array of Chicken instances representing larger enemies.
 */
function generateChickens() {
  const chickens = [];
  let positionX = 600;
  for (let i = 0; i < 10; i++) {
    chickens.push(new Chicken(positionX));
    positionX += 800 + Math.floor(Math.random() * 500);
  }
  return chickens;
}

/**
 * Generates an array of SmallChicken enemy objects spaced along the x-axis with some randomness.
 * @returns {SmallChicken[]} Array of SmallChicken instances representing smaller enemies.
 */
function generateSmallChickens() {
  const smallChickens = [];
  let positionX = 800;
  for (let i = 0; i < 7; i++) {
    smallChickens.push(new SmallChicken(positionX));
    positionX += 250 + Math.floor(Math.random() * 500);
  }
  return smallChickens;
}

/**
 * Creates and returns a Level 1 instance with enemies, clouds, coins, bottles, background objects, and the level length.
 * @returns {Level} A Level instance configured with initial game objects and background.
 */
function createLevel1() {
  return new Level(
    [
      ...generateChickens(),
      ...generateSmallChickens(),
      new Endboss(),
    ],
    [
      new Cloud("img/5_background/layers/4_clouds/2.png"),
      new Cloud("img/5_background/layers/4_clouds/1.png"),
    ],
    generateCoins(),
    generateBottles(),
    generateBackgroundObjects(-2000, 12000),
    11500
  );
}