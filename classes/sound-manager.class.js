class SoundManager {
  /**
   * Initializes all sound effects and background music,
   * sets looping and volume levels.
   */
  constructor() {
    this.sounds = {
      chickenHurt: new Audio("audio/chicken-sound.wav"),
      pepeHurt: new Audio("audio/pepe-hurt-sound.wav"),
      pepeDead: new Audio("audio/character-lost.mp3"),
      collectCoin: new Audio("audio/collect-coin-sound.wav"),
      gameMusic: new Audio("audio/game-music.mp3"),
    };
    this.sounds.gameMusic.loop = true;
    this.sounds.gameMusic.volume = 0.1;
    for (let key in this.sounds) {
      if (key !== "gameMusic") {
        this.sounds[key].volume = 0.1;
      }
    }
  }

  /**
   * Plays the sound effect by name from the sounds collection.
   * Resets playback to start for overlapping sounds.
   *
   * @param {string} name - The key name of the sound to play.
   */
  play(name) {
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }

  /**
   * Plays the background game music if not already playing.
   */
  playMusic() {
    const music = this.sounds.gameMusic;
    if (music && music.paused) {
      music.play().catch(() => {});
    }
  }

  /**
   * Stops the background game music and resets playback.
   */
  stopMusic() {
    const music = this.sounds.gameMusic;
    if (music && !music.paused) {
      music.pause();
      music.currentTime = 0;
    }
  }

  /**
   * Mutes or unmutes all sounds and music.
   *
   * @param {boolean} muted - True to mute all sounds, false to unmute.
   */
  muteAll(muted) {
    for (let sound of Object.values(this.sounds)) {
      sound.muted = muted;
    }
  }
}
