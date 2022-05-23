import StartMenu from "../menus/StartMenu";
import keys from "./keys";

class StartUIScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.START_UI_SCENE });
  }

  create() {
    // basic container to hold all menus
    this.menus = this.add.container();
    this.selector = this.sound.add("selector");
    this.start = this.sound.add("accept");

    this.startMenu = new StartMenu(25, 200, this);

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
      this.scene.stop(keys.START_SCENE);
      this.scene.stop(keys.START_UI_SCENE);
      this.scene.start(keys.INTRO_SCENE);
    }
    // debug choice
    if (index === 1) {
      this.events.off("StartMenuSelect", this.onStartChoice);
      this.scene.stop(keys.START_SCENE);
      this.scene.stop(keys.START_UI_SCENE);
      this.scene.start(keys.BOSS_SCENE);
    }
  }

  onKeyInput(event) {
    if (this.currentMenu) {
      if (event.code === "ArrowUp") {
        this.currentMenu.moveSelectionUp();
        this.selector.play({ volume: 0.5 });
      } else if (event.code === "ArrowDown") {
        this.currentMenu.moveSelectionDown();
        this.selector.play({ volume: 0.5 });
      } else if (event.code === "Enter") {
        this.currentMenu.confirm();
        this.start.play({ volume: 0.5 });
      }
    }
  }
}

export default StartUIScene;
