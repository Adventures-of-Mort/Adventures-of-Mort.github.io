import Menu from "./Menu";

const ActionsMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function ActionsMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
    this.addMenuItem("Attack");
  },
  confirm: function () {
    // do something when the player selects an action
  },
});

export default ActionsMenu;
