import keys from "./keys";

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.GAME_OVER_SCENE });
  }
  preload() {}

  create() {
    this.music = this.sound.add("gameover");

    this.music.play({ volume: 0.2 });

    const text = this.add.text(120, 160, "And they were never heard from again...", { wordWrap: { width: 200 } });

    let enterKey = this.input.keyboard.addKey("ENTER");

    enterKey.on("down", () => {
      this.music.stop();
      this.scene.stop(keys.GAME_OVER_SCENE);
      this.scene.start(keys.START_SCENE);
    });
  }
}

export default GameOverScene;
