class Character extends MoveableObject {
  height = 270;
  width = 130;
  y = 70;
  speed = 10;
  idleTimer = 0; 

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

  world;
  lastMoveTime = Date.now();

  constructor() {
    super();
    this.loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.pepe_idle);
    this.loadImages(this.pepe_walking);
    this.loadImages(this.pepe_jumping);
    this.loadImages(this.pepe_long_idle);
    this.loadImages(this.pepe_hurt);
    this.applyGravity();
    this.animate();
    this.hurtAnimationPlaying = false;
    this.canBeHurt = true;
  }

  animate() {
    setInterval(() => {
      let isMoving = false;

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
        isMoving = true;
      }

      if (this.world.keyboard.LEFT && this.x > -1500) {
        this.x -= this.speed;
        this.otherDirection = true;
        isMoving = true;
      }

      if (this.world.keyboard.SPACE) {
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
        (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
        !this.isAboveGround()
      ) {
        this.playAnimation(this.pepe_walking);
      }
    }, 100);

    setInterval(() => {
      let isStandingStill =
        !this.world.keyboard.RIGHT &&
        !this.world.keyboard.LEFT &&
        !this.isAboveGround() &&
        !this.hurtAnimationPlaying;

      if (isStandingStill) {
        this.idleTimer += 300;
        if (this.idleTimer >= 10000) {
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