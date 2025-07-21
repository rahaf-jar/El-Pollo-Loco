class Character extends MoveableObject {
    height = 280;
    width = 130;
    y = 170; 
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png'); // ✅ then load image
    }

    jump() {
        console.log("Character jumps");
    }
}