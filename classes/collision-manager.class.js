class CollisionManager {
  /**
   * Creates a new CollisionManager linked to the game world.
   * @param {Object} world - The main game world object containing game state and entities.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Starts the periodic collision checking loop.
   * Checks for collisions between the character, enemies, bottles, coins, and the end boss.
   */
  startCollisionChecks() {
    setInterval(() => {
      if (!this.world.character) return;
      this.world.level.enemies.forEach((enemy) => {
        if (!(enemy instanceof Endboss)) {
          this.handleEnemyCollision(enemy);
        }
      });
      this.handleEndbossCollision();
      this.handleBottleEndbossCollision();
      this.handleCollectablesCollision(
        this.world.level.coins,
        "coins",
        1,
        true
      );
      this.handleCollectablesCollision(
        this.world.level.bottles,
        "bottles",
        1,
        false
      );
    }, 40);
  }

  /**
   * Handles collision logic when the character collides with a specific enemy.
   * @param {Object} enemy - The enemy object to check collision against.
   */
  handleEnemyCollision(enemy) {
    const { character } = this.world;
    if (character.isColliding(enemy)) {
      if (this.isJumpingOnEnemy(enemy)) {
        this.removeEnemy(enemy);
      } else if (this.canCharacterGetHurt(enemy)) {
        this.hurtCharacter();
      }
    }
  }

  /**
   * Handles collision between the character and the endboss.
   * If collided, character is hurt and endboss plays alert animation.
   */
  handleEndbossCollision() {
    const { character, endBoss } = this.world;
    if (
      character &&
      endBoss &&
      character.isColliding(endBoss) &&
      character.canBeHurt &&
      !endBoss.isDead &&
      !character.isJumping()
    ) {
      this.hurtCharacter();

      if (typeof endBoss.playAlert === "function") {
        endBoss.playAlert();
      }
    }
  }

  /**
   * Determines if the character is jumping on top of the enemy.
   * @param {Object} enemy - The enemy to check against.
   * @returns {boolean} True if the character is falling onto the enemy.
   */
  isJumpingOnEnemy(enemy) {
    return this.world.character.isFallingOn(enemy);
  }

  /**
   * Removes the enemy after the character jumps on it.
   * Applies a bounce effect to the character.
   * @param {Object} enemy - The enemy to remove.
   */
  removeEnemy(enemy) {
    this.killEnemy(enemy);
  }

  /**
   * Checks if the character can be hurt by the enemy collision.
   * @param {Object} enemy - The enemy involved in the collision.
   * @returns {boolean} True if the character can take damage.
   */
  canCharacterGetHurt(enemy) {
    const { character } = this.world;
    return (
      character.canBeHurt &&
      !enemy.dead &&
      character.isSideCollisionWith(enemy) &&
      !character.isJumping()
    );
  }

  /**
   * Applies hurt effects to the character including health reduction and animations.
   */
  hurtCharacter() {
    const { character, statusBar, soundManager } = this.world;
    character.canBeHurt = false;
    character.hurtAnimationPlaying = true;
    character.percentage -= 20;
    statusBar.setPercentage(character.percentage);
    soundManager.play("pepeHurt");

    if (character.percentage <= 0) {
      this.characterDies();
    }

    setTimeout(() => (character.hurtAnimationPlaying = false), 1000);
    setTimeout(() => (character.canBeHurt = true), 1200);
  }

  /**
   * Handles the character's death logic and ends the game.
   */
  characterDies() {
    const { character, soundManager } = this.world;
    character.isDead = true;
    soundManager.play("pepeDead");
    setTimeout(() => {
      this.world.character = null;
      this.world.endGame();
    }, 1500);
  }

  /**
   * Handles collisions between thrown bottles and the end boss.
   * @remarks Applies damage, plays hurt or death animations, and removes bottles after splash.
   */
  handleBottleEndbossCollision() {
    const { thrownBottles, endBoss, endBossStatusBar } = this.world;
    thrownBottles.forEach((bottle, index) => {
      if (bottle.isColliding(endBoss) && !bottle.hasSplashed) {
        bottle.splash();
        bottle.hasSplashed = true;
        const newPercentage = endBossStatusBar.percentage - 20;
        endBossStatusBar.setPercentage(newPercentage);

        if (newPercentage > 0) {
          endBoss.playHurt(this.world);
        } else if (!endBoss.dead) {
          endBoss.killEndboss(this.world);
        }

        setTimeout(() => {
          thrownBottles.splice(index, 1);
        }, 600);
      }
    });
  }

  /**
   * Creates a temporary expanded bounding box for better collision detection.
   * @param {Object} obj - The original object to expand (usually the character).
   * @param {number} margin - Pixels to expand in all directions.
   * @returns {Object} A new object with expanded dimensions.
   */
  expandCollisionBox(obj, margin) {
    return {
      x: obj.x - margin,
      y: obj.y - margin,
      width: obj.width + 2 * margin,
      height: obj.height + 2 * margin,
    };
  }

  /**
   * Handles collision detection and collection for coins or bottles.
   * @param {Array} collection - The array of collectible items (coins or bottles).
   * @param {string} type - Type of collectible ("coins" or "bottles").
   * @param {number} value - The amount to increase the count by on collection.
   * @param {boolean} useItemCollisionMethod - Whether to call item's isColliding (true for coins).
   */
  handleCollectablesCollision(
    collection,
    type,
    value,
    useItemCollisionMethod = false
  ) {
    const { character } = this.world;

    collection.forEach((item, index) => {
      const collision = this.isCollidingWithItem(
        character,
        item,
        type,
        useItemCollisionMethod
      );
      if (collision) this.collectItem(item, collection, index, type, value);
    });
  }

  isCollidingWithItem(character, item, type, useItemCollisionMethod) {
    if (type === "coins") return this.checkCoinCollision(character, item);
    return useItemCollisionMethod
      ? item.isColliding(this.expandCollisionBox(character, -15))
      : character.isColliding(item);
  }

  checkCoinCollision(character, coin) {
    const charBox = this.expandCollisionBox(character, 0);
    const overlapX =
      Math.min(charBox.x + charBox.width, coin.x + coin.width) -
      Math.max(charBox.x, coin.x);
    const overlapY =
      Math.min(charBox.y + charBox.height, coin.y + coin.height) -
      Math.max(charBox.y, coin.y);
    const coinBelowHead = coin.y + coin.height > charBox.y + charBox.height / 2; 
    return overlapX >= charBox.width / 2 && overlapY > 0 && coinBelowHead;
  }

  collectItem(item, collection, index, type, value) {
    const { coinBar, bottleBar, soundManager } = this.world;
    collection.splice(index, 1);

    if (type === "coins") {
      coinBar.setCoinsCount(coinBar.coins + value);
      soundManager.play("collectCoin");
    } else if (type === "bottles") {
      this.world.collectedBottles++;
      bottleBar.setBottlesAmount(this.world.collectedBottles);
    }
  }

  /**
   * Handles the enemy kill process including animation, sound, and removal from the game.
   * @param {Object} enemy - The enemy to kill.
   */
  killEnemy(enemy) {
    enemy.dead = true;
    enemy.currentImage = 0;
    enemy.speed = 0;
    this.world.soundManager.play("chickenHurt");

    let deathInterval = setInterval(() => {
      enemy.playAnimation(enemy.chicken_dead);
    }, 150);

    setTimeout(() => {
      clearInterval(deathInterval);
      const index = this.world.level.enemies.indexOf(enemy);
      if (index > -1) this.world.level.enemies.splice(index, 1);
    }, 800);
  }
}
