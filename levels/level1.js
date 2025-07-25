const level1 = new Level(
  [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new Endboss(),
  ],

  [
    new Cloud("img/5_background/layers/4_clouds/2.png"),
    new Cloud("img/5_background/layers/4_clouds/1.png"),
  ],

  generateBackgroundObjects(-2000, 20000),

  20000 
);