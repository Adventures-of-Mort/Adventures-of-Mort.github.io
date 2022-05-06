import StartMenu from "../menus/StartMenu";

const StartUIScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function StartUIScene() {
    Phaser.Scene.call(this, { key: "StartUIScene" });
  },
  create: function () {
    // basic container to hold all menus
    this.menus = this.add.container();

    this.startMenu = new StartMenu(0, 0, this);

    // the currently selected menu
    this.currentMenu = this.startMenu;

    // add menus to the container
    this.menus.add(this.startMenu);

    this.startScene = this.scene.get("StartScene");

    this.input.keyboard.on("keydown", this.onKeyInput, this);

    this.events.on("StartMenuSelect", this.onStartChoice, this);
  },

  onStartChoice: function (index) {
    if (index === 0) {
      this.scene.start("WorldScene");
    }
    if (index === 1) {
      this.scene.start("BattleScene");
    }
  },

  onKeyInput: function (event) {
    if (this.currentMenu) {
      if (event.code === "ArrowUp") {
        this.currentMenu.moveSelectionUp();
      } else if (event.code === "ArrowDown") {
        this.currentMenu.moveSelectionDown();
      } else if (event.code === "Enter") {
        this.currentMenu.confirm();
      }
    }
  },
});

export default StartUIScene;
