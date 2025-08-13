class Endboss extends MoveableObject {
  width = 350;
  height = 400;
  y = 60;
  speed = 0.15;

  isHurt = false;
  isDead = false;
  currentAnimation = null;

  endboss_walking = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  endboss_hurt = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  endboss_dead = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  endboss_alert = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor() {
    super();
    this.x = 11000;

    this.loadImage(this.endboss_walking[0]);
    this.loadImages(this.endboss_walking);
    this.loadImages(this.endboss_hurt);
    this.loadImages(this.endboss_dead);
    this.loadImages(this.endboss_alert);

    this.animate();
  }

  /**
   * Starts the animation loops for movement and switching between animations.
   * Moves the endboss to the left if it’s not hurt or dead.
   * Animates walking, hurt, or dead states accordingly.
   */
  animate() {
    setInterval(() => {
      if (!this.isDead && !this.isHurt) {
        this.x -= this.speed;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead) {
        this.playOnce(this.endboss_dead, "dead");
      } else if (this.isHurt) {
        this.playOnce(this.endboss_hurt, "hurt");
      } else {
        this.playLoop(this.endboss_walking, "walk");
      }
    }, 120);
  }

  /**
   * Plays the given animation images in a loop.
   * Resets animation if switching to a new animation.
   * @param {string[]} images - Array of image paths to loop through.
   * @param {string} name - Name of the animation (used to track current animation).
   */
  playLoop(images, name) {
    if (this.currentAnimation !== name) {
      this.currentImage = 0;
      this.currentAnimation = name;
    }
    this.playAnimation(images, true);
  }

  /**
   * Plays the alert animation once.
   */
  playAlert() {
    if (this.isDead || this.isHurt) return;

    this.currentAnimation = "alert";
    this.currentImage = 0;
    this.playAnimation(this.endboss_alert, false);
  }

  /**
   * Plays the given animation images once (does not loop).
   * Resets animation if switching to a new animation.
   * Only advances the animation if not finished.
   * @param {string[]} images - Array of image paths to play once.
   * @param {string} name - Name of the animation (used to track current animation).
   */
  playOnce(images, name) {
    if (this.currentAnimation !== name) {
      this.currentImage = 0;
      this.currentAnimation = name;
    }

    if (this.currentImage < images.length) {
      this.playAnimation(images, false);
    }
  }

  /**
   * Marks the endboss as hurt and plays hurt sound.
   * Prevents multiple hurt states at the same time.
   * After 600ms, removes the hurt state.
   * @param {Object} world - The game world object, used to access soundManager.
   */
  playHurt(world) {
    if (this.isDead || this.isHurt) return;

    this.isHurt = true;
    world.soundManager.play("chickenHurt");

    setTimeout(() => {
      this.isHurt = false;
    }, 600);
  }

  /**
   * Marks the endboss as dead, stops its movement, and plays hurt sound.
   * After 1 second, removes the endboss from the enemies array in the world.
   * Prevents multiple kills.
   * @param {Object} world - The game world object, used to access soundManager and enemies list.
   */
  killEndboss(world) {
    if (this.isDead) return;

    this.isDead = true;
    this.isHurt = true;
    this.speed = 0;
    this.currentImage = 0;
    this.currentAnimation = "dead";
    world.soundManager.play("chickenHurt");

    world.endGame(true); 

    setTimeout(() => {
      let i = world.level.enemies.indexOf(this);
      if (i !== -1) {
        world.level.enemies.splice(i, 1);
      }
    }, 1000);
  }
}