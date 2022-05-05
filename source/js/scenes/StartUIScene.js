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

    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    this.graphics.strokeRect(2, 150, 90, 100);
    this.graphics.fillRect(2, 150, 90, 100);
  },
});

export default StartUIScene;
