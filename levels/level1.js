function generateCoins() {
  const coins = [];
  const totalGroups = 10;
  const startX = 500;
  const spacing = 1200;

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

function generateBottles() {
  const bottles = [];
  const bottleCount = 15;

  for (let i = 0; i < bottleCount; i++) {
    const x = 800 + Math.floor(Math.random() * 10000); 
    bottles.push(new Bottle(x));
  }

  return bottles;
}

function generateChickens() {
  const chickens = [];
  let positionX = 600;

  for (let i = 0; i < 10; i++) {
    chickens.push(new Chicken(positionX));
    positionX += 800 + Math.floor(Math.random() * 500); 
  }

  return chickens;
}

function generateSmallChickens() {
  const smallChickens = [];
  let positionX = 800;

  for (let i = 0; i < 7; i++) {
    smallChickens.push(new SmallChicken(positionX));
    positionX += 250 + Math.floor(Math.random() * 500); 
  }

  return smallChickens;
}

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