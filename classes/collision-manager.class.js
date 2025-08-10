class CollisionManager {
  constructor(world) {
    this.world = world;
  }

  startCollisionChecks() {
    setInterval(() => {
      if (!this.world.character) return;

      this.world.level.enemies.forEach((enemy) => {
        if (!(enemy instanceof Endboss)) {
          this.handleEnemyCollision(enemy);
        }
      });

      this.handleBottleEndbossCollision();
      this.handleCollectablesCollision(this.world.level.coins, "coins", 1);
      this.handleCollectablesCollision(this.world.level.bottles, "bottles", 1);
    }, 40);
  }

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

  isJumpingOnEnemy(enemy) {
    return this.world.character.isFallingOn(enemy);
  }

  removeEnemy(enemy) {
    this.world.character.speedY = 15;
    this.killEnemy(enemy);
  }

  canCharacterGetHurt(enemy) {
    const { character } = this.world;
    return (
      character.canBeHurt &&
      !enemy.dead &&
      character.isSideCollisionWith(enemy) &&
      !character.isJumping()
    );
  }

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

  characterDies() {
    const { character, soundManager } = this.world;
    character.isDead = true;
    soundManager.play("pepeDead");
    setTimeout(() => {
      this.world.character = null;
      this.world.endGame();
    }, 1500);
  }

  handleBottleEndbossCollision() {
    const { thrownBottles, endBoss, endBossStatusBar, soundManager } = this.world;

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

  handleCollectablesCollision(collection, type, value) {
    const { character, coinBar, bottleBar, soundManager } = this.world;

    collection.forEach((item, index) => {
      if (character.isColliding(item)) {
        collection.splice(index, 1);
        if (type === "coins") {
          coinBar.setCoinsCount(coinBar.coins + value);
          soundManager.play("collectCoin");
        } else if (type === "bottles") {
          this.world.collectedBottles++;
          bottleBar.setBottlesAmount(this.world.collectedBottles);
        }
      }
    });
  }

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
