class InputManager {
  constructor(world, canvas, keyboard) {
    this.world = world;
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.registerEvents();
  }

  registerEvents() {
    this.registerKeyEvents();
    this.registerCanvasClick();
    this.registerClickEvent();
  }

  registerKeyEvents() {
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "n" && !this.world.gameStarted) {
        this.world.startGame();
      }
      if (e.key.toLowerCase() === "x" && this.world.gameStarted) {
        this.world.throwBottle();
      }
    });
  }

  registerCanvasClick() {
    this.canvas.addEventListener("click", () => {
      this.world.soundManager.playMusic();
    });
  }

  registerClickEvent() {
    this.canvas.addEventListener("click", (e) => {
      const { clickX, clickY } = this.getScaledClickCoordinates(e);

      if (
        this.world.isInsideArea(
          clickX,
          clickY,
          this.world.fullscreenX,
          this.world.fullscreenY,
          this.world.fullscreenWidth,
          this.world.fullscreenHeight
        )
      ) {
        this.world.toggleFullscreen();
      } else if (
        this.world.isInsideArea(
          clickX,
          clickY,
          this.world.soundX,
          this.world.soundY,
          this.world.soundWidth,
          this.world.soundHeight
        )
      ) {
        this.world.toggleSound();
      }
    });
  }

  getScaledClickCoordinates(e) {
    const rect = this.canvas.getBoundingClientRect();
    let clickX = e.clientX - rect.left;
    let clickY = e.clientY - rect.top;
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return { clickX: clickX * scaleX, clickY: clickY * scaleY };
  }
}
