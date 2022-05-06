import Menu from "./Menu";

const StartMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function StartMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
    this.addMenuItem("Start");

    this.addMenuItem("Debug Mode");
  },
  confirm: function () {
    // do something when the player selects an action
    this.scene.events.emit("StartMenuSelect", this.menuItemIndex);
  },
  create: function () {},
});

export default StartMenu;
