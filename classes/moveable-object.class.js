class MoveableObject{
    x = 120;
    y = 250;
    img;
    height = 200;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(){
        console.log("Move right");
    }

    moveLeft() {
    }
}