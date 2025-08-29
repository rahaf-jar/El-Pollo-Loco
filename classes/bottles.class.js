class Bottle extends DrawAbleObject {
  /**
   * Creates a new Bottle object at a specific position in the world.
   * 
   * @param {number} x - The X coordinate where the bottle will be placed.
   * @param {number} y - The Y coordinate where the bottle would be placed (not used, fixed to 380).
   */
  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.x = x;
    this.y = 380;
    this.width = 60;
    this.height = 70;
  }
}