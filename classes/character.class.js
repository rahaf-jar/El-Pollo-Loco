class Character extends MoveableObject {
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png'); // ✅ then load image
    }

    jump() {
        console.log("Character jumps");
    }
}