import keys from "./keys";

class GameWonScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.GAME_WON_SCENE });
  }

  create() {
    this.music = this.sound.add("ending");

    this.music.play({ volume: 0.2 });

    const text = this.add.text(80, 120, "Thanks for playing!", { wordWrap: { width: 200 } });
    const text2 = this.add.text(80, 160, "Made by Kyle, Jason, John, and Eric", { wordWrap: { width: 200 } });

    let enterKey = this.input.keyboard.addKey("ENTER");

    console.log("hello");

    enterKey.on("down", () => {
      console.log("click click");
      //this.music.stop();
      //this.scene.stop(keys.GAME_WON_SCENE);
      //this.scene.start(keys.START_SCENE);
    });
  }
}

export default GameWonScene;
