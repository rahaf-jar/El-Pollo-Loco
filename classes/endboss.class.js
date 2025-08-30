class Endboss extends MoveableObject {
  width = 350;
  height = 400;
  y = 60;
  speed = 1.3;

  isHurt = false;
  isDead = false;
  currentAnimation = null;

  animationSpeed = 150;
  attackSpeed = 200;
  lastFrameTime = 0;
  hasAlerted = false;
  alertCount = 0;

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

  endboss_attack = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /** * Initializes the endboss object by loading images and setting initial properties. * The endboss starts at a specific x-coordinate and loads all necessary animation frames. */
  constructor() {
    super();
    this.x = 13000;
    this.loadImage(this.endboss_walking[0]);
    this.loadImages(this.endboss_walking);
    this.loadImages(this.endboss_hurt);
    this.loadImages(this.endboss_dead);
    this.loadImages(this.endboss_alert);
    this.loadImages(this.endboss_attack);
  }

  /** * Updates the endboss's behavior and animation based on the character's position.
   * * Moves the endboss toward the character, handles different animations (alert, attack, walk), and manages state changes (hurt, dead).
   * * @param {Character} character - The main character object to interact with.
   * */
  update(character) {
    if (!character) return;

    this.moveTowardCharacter(character);

    const distance = Math.abs(this.x - character.x);
    if (this.isDead) return this.playOnce(this.endboss_dead, "dead");
    if (this.isHurt) return this.playOnce(this.endboss_hurt, "hurt");

    if (!this.hasAlerted && distance < 700) return this.handleAlertAnimation();
    if (distance <= 850) return this.handleAttackAnimation();

    this.handleWalkAnimation();
  }

  /** Moves the endboss toward the character's position.
   * If the character is to the right, the endboss moves right; if to the left, it moves left.
   * @param {Character} character - The main character object to move toward.
   */
  moveTowardCharacter(character) {
    if (character.x > this.x) {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }
  }

  /** Handles the alert animation sequence.
   * Plays the alert animation twice before transitioning to the next state.
   */
  handleAlertAnimation() {
    this.initAlertAnimation();
    this.advanceAnimationFrame(this.endboss_alert, this.animationSpeed);
    this.checkAlertAnimationEnd();
    this.updateImage(this.endboss_alert);
  }

  /** Initializes the alert animation.
   * Resets the current image index and frame timing.
   */
  initAlertAnimation() {
    if (this.currentAnimation !== "alert") {
      this.currentAnimation = "alert";
      this.currentImage = 0;
      this.lastFrameTime = Date.now();
      this.alertCount = 0;
    }
  }

  /** Checks if the alert animation has completed its sequence.
   * If the animation has played twice, it sets the hasAlerted flag to true and stops the animation.
   */
  checkAlertAnimationEnd() {
    if (this.currentImage >= this.endboss_alert.length) {
      this.alertCount++;
      if (this.alertCount < 2) {
        this.currentImage = 0;
      } else {
        this.hasAlerted = true;
        this.currentAnimation = null;
      }
    }
  }

  /** Handles the attack animation sequence.
   * Moves the endboss slightly backward while playing the attack animation.
   */
  handleAttackAnimation() {
    this.speed = 4.5;
    this.x -= this.speed;

    this.initAnimation("attack");
    this.advanceAnimationFrame(this.endboss_attack, this.attackSpeed);
    this.loopAnimationIfNeeded(this.endboss_attack);
    this.updateImage(this.endboss_attack);
  }

  /** Initializes the specified animation.
   * Resets the current image index and frame timing if the animation has changed.
   * @param {string} name - The name of the animation to initialize.
   */
  initAnimation(name) {
    if (this.currentAnimation !== name) {
      this.currentAnimation = name;
      this.currentImage = 0;
      this.lastFrameTime = Date.now();
    }
  }

  /** Loops the animation if the current image index exceeds the number of images.
   * Resets the current image index to 0 to create a continuous loop effect.
   * @param {Array} images - The array of images for the current animation.
   */
  loopAnimationIfNeeded(images) {
    if (this.currentImage >= images.length) {
      this.currentImage = 0;
    }
  }

  /** Handles the walking animation sequence.
   * Moves the endboss left at a constant speed while playing the walking animation.
   */
  handleWalkAnimation() {
    this.speed = 1.3;
    this.x -= this.speed;

    this.initAnimation("walk");
    this.advanceAnimationFrame(this.endboss_walking, this.animationSpeed);
    this.loopAnimationIfNeeded(this.endboss_walking);
    this.updateImage(this.endboss_walking);
  }

  /** Advances the animation frame based on the specified speed.
   * Updates the current image index if enough time has passed since the last frame.
   * @param {Array} images - The array of images for the current animation.
   * @param {number} speed - The speed (in milliseconds) at which to advance frames.
   */
  advanceAnimationFrame(images, speed) {
    if (Date.now() - this.lastFrameTime > speed) {
      this.currentImage++;
      this.lastFrameTime = Date.now();
    }
  }

  /** Updates the current image based on the current animation frame.
   * Sets the img property to the image corresponding to the current frame index.
   * @param {Array} images - The array of images for the current animation.
   */
  updateImage(images) {
    const img = this.imageCache[images[this.currentImage]];
    if (img) this.img = img;
  }

  /** Plays an animation sequence once without looping.
   * Used for animations like hurt and dead that should not repeat.
   * @param {Array} images - The array of images for the animation.
   * @param {string} name - The name of the animation to play.
   */
  playOnce(images, name) {
    if (this.currentAnimation !== name) {
      this.currentAnimation = name;
      this.currentImage = 0;
      this.lastFrameTime = Date.now();
    }

    if (Date.now() - this.lastFrameTime > this.animationSpeed) {
      this.currentImage++;
      this.lastFrameTime = Date.now();
    }

    if (this.currentImage < images.length) {
      const img = this.imageCache[images[this.currentImage]];
      if (img) this.img = img;
    }
  }

  /** Plays the hurt sound and sets the isHurt state.
   * Prevents multiple hurt states if the endboss is already dead or hurt.
   * Resets the isHurt state after a short delay.
   * @param {World} world - The game world object to access the sound manager.
   */
  playHurt(world) {
    if (this.isDead || this.isHurt) return;

    this.isHurt = true;
    world.soundManager.play("chickenHurt");

    setTimeout(() => {
      this.isHurt = false;
    }, 600);
  }

  /** Kills the endboss, plays the death animation and sound, and ends the game.
   * Removes the endboss from the game world after the death animation completes.
   * @param {World} world - The game world object to access the sound manager and end the game.
   */
  killEndboss(world) {
    if (this.isDead) return;

    this.isDead = true;
    this.speed = 0;
    this.currentImage = 0;
    this.currentAnimation = "dead";
    world.soundManager.play("chickenHurt");

    const animationDuration =
      this.endboss_dead.length * this.animationSpeed + 600;

    setTimeout(() => {
      let i = world.level.enemies.indexOf(this);
      if (i !== -1) world.level.enemies.splice(i, 1);

      world.endGame(true);
    }, animationDuration);
  }
}