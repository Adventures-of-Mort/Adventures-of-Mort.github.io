import StartMenu from "../menus/StartMenu";
import keys from "./keys";

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.START_SCENE });
  }

  create() {
    this.scene.launch(keys.START_UI_SCENE);

    this.music = this.sound.add("main_theme");

    this.music.play({ volume: 0.2 });
  }

  update() {
    if (this.game.sound.context.state === "suspended") {
      this.game.sound.context.resume();
    }
  }
}

export default StartScene;
