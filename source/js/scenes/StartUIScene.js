import StartMenu from "../menus/StartMenu";
import keys from "./keys";

class StartUIScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.START_UI_SCENE });
  }

  create() {
    // basic container to hold all menus
    this.menus = this.add.container();

    this.startMenu = new StartMenu(33, 170, this);

    // the currently selected menu
    this.currentMenu = this.startMenu;

    // add menus to the container
    this.menus.add(this.startMenu);

    this.startScene = this.scene.get(keys.START_SCENE);

    this.input.keyboard.on("keydown", this.onKeyInput, this);

    this.events.on("StartMenuSelect", this.onStartChoice, this);
  }

  onStartChoice(index) {
    // start choice
    this.events.off("StartMenuSelect");
    this.startScene.music.stop();
    // start world scene
    if (index === 0) {
      this.scene.start(keys.WORLD_SCENE);
    }
    // debug choice
    if (index === 1) {
      this.events.off("StartMenuSelect", this.onStartChoice);
      this.scene.start(keys.BATTLE_SCENE);
    }
  }

  onKeyInput(event) {
    if (this.currentMenu) {
      if (event.code === "ArrowUp") {
        this.currentMenu.moveSelectionUp();
      } else if (event.code === "ArrowDown") {
        this.currentMenu.moveSelectionDown();
      } else if (event.code === "Enter") {
        this.currentMenu.confirm();
      }
    }
  }
}

export default StartUIScene;
