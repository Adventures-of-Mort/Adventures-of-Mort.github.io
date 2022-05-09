import StartMenu from "../menus/StartMenu";

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  create() {
    //this.scene.launch("StartUIScene");

    // basic container to hold all menus
    this.menus = this.add.container();

    this.startMenu = new StartMenu(0, 0, this);

    // the currently selected menu
    this.currentMenu = this.startMenu;

    // add menus to the container
    this.menus.add(this.startMenu);

    this.input.keyboard.on("keydown", this.onKeyInput, this);

    this.events.on("StartMenuSelect", this.onStartChoice, this);
  }
  onStartChoice(index) {
    // start choice
    //this.events.off("StartMenuSelect");
    this.events.off("StartMenuSelect", this.onStartChoice);
    if (index === 0) {
      this.scene.start("WorldScene");
    }
    // debug choice
    else if (index === 1) {
      this.scene.start("BattleScene");
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

export default StartScene;
