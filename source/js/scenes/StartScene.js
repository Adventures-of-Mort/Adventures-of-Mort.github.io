import StartMenu from "../menus/StartMenu";
import keys from "./keys";

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.START_SCENE });
  }

  create() {
    this.scene.launch(keys.START_UI_SCENE);
<<<<<<< HEAD
    this.background();
  }

  background() {
    let background = this.add.image(159, 115, "menuSplash");
=======

    this.music = this.sound.add("main_theme");

    this.music.play({ volume: 0.2 });
>>>>>>> 6d28c384928ade5ee7a34cc48a43474c4dcb9ea6
  }
}

export default StartScene;
