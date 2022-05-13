import keys from "./keys";

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.GAME_OVER_SCENE });
  }
  preload() {}

  create() {
    this.music = this.sound.add("gameover");

    this.music.play({ volume: 0.2 });

    const text = this.add.text(50, 50, "Game Over", {});
  }
}
