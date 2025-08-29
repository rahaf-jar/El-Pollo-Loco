class Level {
  enemies;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  level_end_x;

  /**
   * Creates a new Level instance.
   * 
   * @param {Array<MoveableObject>} enemies - Enemies present in the level
   * @param {Array<MoveableObject>} clouds - Clouds to render in the background
   * @param {Array<DrawAbleObject>} coins - Coins collectible by the player
   * @param {Array<DrawAbleObject>} bottles - Bottles collectible by the player
   * @param {Array<BackgroundObject>} backgroundObjects - Background visuals in the level
   * @param {number} level_end_x - X coordinate marking the level's end
   */
  constructor(enemies, clouds, coins, bottles, backgroundObjects, level_end_x) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
    this.level_end_x = level_end_x;
  }
}