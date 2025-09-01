class Character extends MoveableObject {
  height = 270;
  width = 130;
  y = 70;
  speed = 13;
  idleTimer = 0;
  world;
  lastMoveTime = Date.now();
  isThrowing = false;
  isJumpingFlag = false;

  pepe_walking = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  pepe_jumping = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  jumpFrameIndex = 0;

  pepe_idle = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  pepe_long_idle = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  pepe_hurt = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  pepe_dead = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Creates a new Character instance, loads all animations and sets up behavior.
   */
  constructor() {
    super();
    this.loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.pepe_idle);
    this.loadImages(this.pepe_walking);
    this.loadImages(this.pepe_jumping);
    this.loadImages(this.pepe_long_idle);
    this.loadImages(this.pepe_hurt);
    this.loadImages(this.pepe_dead);
    this.applyGravity();
    this.animate();
    this.hurtAnimationPlaying = false;
    this.canBeHurt = true;
    this.percentage = 100;
    this.isDead = false;
  }

  /**
   * Checks if the character's health percentage has dropped to zero or below.
   * If so, sets the isDead flag to true and ends the game.
   */
  checkDead() {
    if (!this.isDead && this.percentage <= 0) {
      this.isDead = true;
      this.world.endGame(false);
    }
  }

  /** Plays the death animation in a loop.
   * This function is called when the character is dead.
   */
  animateDead() {
    setInterval(() => this.playAnimation(this.pepe_dead), 100);
  }

  /** Handles character movement based on keyboard input.
   * Moves left, right, and jumps. Also updates the camera position.
   */
  moveCharacter() {
    if (!this.world) return;
    const k = this.world.keyboard;
    const boss = this.world.endBoss;
    let isMoving = false;

    if (k?.RIGHT && this.x < this.world.level.level_end_x) {
      const nearBoss =
        boss &&
        this.x + this.width + this.speed >= boss.x &&
        this.x < boss.x + boss.width;
      if (!nearBoss)
        (this.x += this.speed),
          (this.otherDirection = false),
          (isMoving = true);
    }

    if (k?.LEFT && this.x > -1500) {
      this.x -= this.speed;
      this.otherDirection = true;
      isMoving = true;
    }

    if (k?.SPACE && !this.isAboveGround()) {
      this.jump();
      this.jumpFrameIndex = 0;
      this.isJumpingFlag = true;
    }

    if (this.isAboveGround()) isMoving = true;
    if (isMoving) this.lastMoveTime = Date.now();
    this.world.camera_x = -this.x + 100;
  }

  /** Updates the character's animation based on its current state.
   * Prioritizes hurt animation, then jump, then walking, and finally idle or dead.
   */
  updateAnimation() {
    if (this.hurtAnimationPlaying) {
      this.playAnimation(this.pepe_hurt);
    } else if (this.isJumpingFlag) {
      this.updateJumpAnimation();
    } else if (this.world?.keyboard?.RIGHT || this.world?.keyboard?.LEFT) {
      this.playAnimation(this.pepe_walking);
    } else if (this.percentage <= 0) {
      this.playAnimation(this.pepe_dead);
      this.checkDead();
    }
  }

  /** Checks if the character has been idle for a certain duration.
   * If idle for more than 8 seconds, plays the long idle animation.
   * Resets the idle timer if the character moves or performs an action.
   */
  checkIdle() {
    const k = this.world?.keyboard;
    const isStill =
      !k?.RIGHT &&
      !k?.LEFT &&
      !this.isJumpingFlag &&
      !this.hurtAnimationPlaying &&
      !this.isThrowing;

    if (isStill) {
      this.idleTimer += 300;
      if (this.idleTimer >= 8000) {
        this.playAnimation(this.pepe_long_idle);
      } else {
        this.playAnimation(this.pepe_idle);
      }
    } else {
      this.idleTimer = 0;
    }
  }

  /**
   * Handles the animation and movement logic of the character.
   * Includes:
   * - Movement (left/right/jump)
   * - Switching animation states (walking, jumping, idle, hurt, dead)
   * - Detecting idle duration to trigger long idle animation
   */
  animate() {
    if (this.isDead) return this.animateDead();
    setInterval(() => this.moveCharacter(), 1000 / 60);
    setInterval(() => this.updateAnimation(), 100);
    setInterval(() => this.checkIdle(), 300);
  }

  /**
   * Updates the jump animation frame based on the current jump frame index.
   * Resets the jump frame index when the character lands back on the ground.
   */
  updateJumpAnimation() {
    this.img = this.imageCache[this.pepe_jumping[this.jumpFrameIndex]];

    if (this.jumpFrameIndex < this.pepe_jumping.length - 1) {
      this.jumpFrameIndex++;
    }

    if (!this.isAboveGround()) {
      this.jumpFrameIndex = 0;
      this.isJumpingFlag = false;
    }
  }
}
