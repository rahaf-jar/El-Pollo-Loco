class SoundManager {
  constructor() {
    this.sounds = {
      chickenHurt: new Audio("audio/chicken-sound.wav"),
      pepeHurt: new Audio("audio/pepe-hurt-sound.wav"),
      pepeDead: new Audio("audio/character-lost.mp3"),
      collectCoin: new Audio("audio/collect-coin-sound.wav"),
      gameMusic: new Audio("audio/game-music.mp3"),
    };

    this.sounds.gameMusic.loop = true;
    this.sounds.gameMusic.volume = 0.5;

    for (let key in this.sounds) {
      if (key !== "gameMusic") {
        this.sounds[key].volume = 0.5;
      }
    }
  }

  play(name) {
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }

  playMusic() {
    const music = this.sounds.gameMusic;
    if (music && music.paused) {
      music.play().catch(() => {});
    }
  }

  stopMusic() {
    const music = this.sounds.gameMusic;
    if (music && !music.paused) {
      music.pause();
      music.currentTime = 0;
    }
  }

  muteAll(muted) {
    for (let sound of Object.values(this.sounds)) {
      sound.muted = muted;
    }
  }
}