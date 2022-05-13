import StartMenu from "../menus/StartMenu";
import keys from "./keys";

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.START_SCENE });
  }

  create() {
    this.scene.launch(keys.START_UI_SCENE);
    this.background();
  }

  background() {
    let background = this.add.image(159, 115, "menuSplash");
  }
}

export default StartScene;
