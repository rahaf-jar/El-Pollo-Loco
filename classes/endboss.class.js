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

  constructor() {
    super();
    this.x = 11900;
    this.loadImage(this.endboss_walking[0]);
    this.loadImages(this.endboss_walking);
    this.loadImages(this.endboss_hurt);
    this.loadImages(this.endboss_dead);
    this.loadImages(this.endboss_alert);
    this.loadImages(this.endboss_attack);
  }

  update(character) {
    const distance = Math.abs(this.x - character.x);
    if (this.isDead) {
      this.playOnce(this.endboss_dead, "dead");
      return;
    }

    if (this.isHurt) {
      this.playOnce(this.endboss_hurt, "hurt");
      return;
    }

    if (!this.hasAlerted && distance < 700) {
      if (this.currentAnimation !== "alert") {
        this.currentAnimation = "alert";
        this.currentImage = 0;
        this.lastFrameTime = Date.now();
        this.alertCount = 0;
      }

      if (Date.now() - this.lastFrameTime > this.animationSpeed) {
        this.currentImage++;
        this.lastFrameTime = Date.now();
      }

      if (this.currentImage >= this.endboss_alert.length) {
        this.alertCount++;
        if (this.alertCount < 2) {
          this.currentImage = 0;
        } else {
          this.hasAlerted = true;
          this.currentAnimation = null;
        }
      }

      const img = this.imageCache[this.endboss_alert[this.currentImage]];
      if (img) this.img = img;
      return; 
    }

    if (distance <= 550) {
      this.speed = 4.5;
      this.x -= this.speed;

      if (this.currentAnimation !== "attack") {
        this.currentAnimation = "attack";
        this.currentImage = 0;
        this.lastFrameTime = Date.now();
      }

      if (Date.now() - this.lastFrameTime > this.attackSpeed) {
        this.currentImage++;
        this.lastFrameTime = Date.now();
      }

      if (this.currentImage >= this.endboss_attack.length) this.currentImage = 0;

      const img = this.imageCache[this.endboss_attack[this.currentImage]];
      if (img) this.img = img;
      return;
    }

    this.speed = 1.3;
    this.x -= this.speed;

    if (this.currentAnimation !== "walk") {
      this.currentAnimation = "walk";
      this.currentImage = 0;
      this.lastFrameTime = Date.now();
    }

    if (Date.now() - this.lastFrameTime > this.animationSpeed) {
      this.currentImage++;
      this.lastFrameTime = Date.now();
    }

    if (this.currentImage >= this.endboss_walking.length) this.currentImage = 0;

    const img = this.imageCache[this.endboss_walking[this.currentImage]];
    if (img) this.img = img;
  }

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

  playHurt(world) {
    if (this.isDead || this.isHurt) return;

    this.isHurt = true;
    world.soundManager.play("chickenHurt");

    setTimeout(() => {
      this.isHurt = false;
    }, 600);
  }

  killEndboss(world) {
    if (this.isDead) return;

    this.isDead = true;
    this.speed = 0;
    this.currentImage = 0;
    this.currentAnimation = "dead";
    world.soundManager.play("chickenHurt");

    const animationDuration = this.endboss_dead.length * this.animationSpeed + 600;

    setTimeout(() => {
      let i = world.level.enemies.indexOf(this);
      if (i !== -1) world.level.enemies.splice(i, 1);

      world.endGame(true);
    }, animationDuration);
  }
}