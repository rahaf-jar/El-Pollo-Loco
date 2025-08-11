/**
 * Represents the main player character (Pepe) in the game.
 * Inherits from MoveableObject and handles movement, animation, and state.
 */
class Character extends MoveableObject {
  height = 270;

  width = 130;

  y = 70;

  speed = 10;

  /** Time the character has been idle (in milliseconds) */
  idleTimer = 0;

  /** Reference to the current World object */
  world;

  /** Timestamp of the last movement, used to detect idling */
  lastMoveTime = Date.now();

  isThrowing = false;

  pepe_walking = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /** Jumping animation image paths */
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
   * Handles the animation and movement logic of the character.
   * Includes:
   * - Movement (left/right/jump)
   * - Switching animation states (walking, jumping, idle, hurt, dead)
   * - Detecting idle duration to trigger long idle animation
   */
  animate() {
    if (this.isDead) {
      setInterval(() => {
        this.playAnimation(this.pepe_dead);
      }, 100);
      return;
    }
    setInterval(() => {
      if (!this.world) return;

      let isMoving = false;

      if (this.world.keyboard?.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
        isMoving = true;
      }

      if (this.world.keyboard?.LEFT && this.x > -1500) {
        this.x -= this.speed;
        this.otherDirection = true;
        isMoving = true;
      }

      if (this.world.keyboard?.SPACE) {
        this.jump();
      }

      if (this.isAboveGround()) {
        isMoving = true;
      }

      if (isMoving) {
        this.lastMoveTime = Date.now();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.hurtAnimationPlaying) {
        this.playAnimation(this.pepe_hurt);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.pepe_jumping);
      } else if (
        (this.world?.keyboard?.RIGHT || this.world?.keyboard?.LEFT) &&
        !this.isAboveGround()
      ) {
        this.playAnimation(this.pepe_walking);
      } else if (this.percentage <= 0) {
        this.playAnimation(this.pepe_dead);
      }
    }, 100);

    setInterval(() => {
      const isStandingStill =
        !this.world?.keyboard?.RIGHT &&
        !this.world?.keyboard?.LEFT &&
        !this.isAboveGround() &&
        !this.hurtAnimationPlaying &&
        !this.isThrowing;

      if (isStandingStill) {
        this.idleTimer += 300;
        if (this.idleTimer >= 15000) {
          this.playAnimation(this.pepe_long_idle);
        } else {
          this.playAnimation(this.pepe_idle);
        }
      } else {
        this.idleTimer = 0;
      }
    }, 300);
  }
}
