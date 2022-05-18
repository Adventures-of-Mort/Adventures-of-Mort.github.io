import keys from "./keys";

class IntroTextScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.INTRO_SCENE });
  }

  create() {
    this.add.text(
      20,
      20,
      "The Evil Princess has captured your favorite dragon! Fight your way through the tower and defeat her to win the game. But watch out for the kingdom's heroes!",
      { wordWrap: { width: 280 } }
    );
    this.add.text(20, 200, "Press Enter to continue");

    let enterKey = this.input.keyboard.addKey("ENTER");
    enterKey.on("down", () => {
      //this.music.stop();
      this.scene.stop(keys.INTRO_SCENE);

      this.scene.run(keys.WORLD_SCENE);
    });
  }
}

export default IntroTextScene;
