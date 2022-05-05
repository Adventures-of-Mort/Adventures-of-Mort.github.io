import Menu from "./Menu";

const EnemiesMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function EnemiesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  },
  confirm: function () {
    // do something when the player selects an enemy
  },
});

export default EnemiesMenu;
