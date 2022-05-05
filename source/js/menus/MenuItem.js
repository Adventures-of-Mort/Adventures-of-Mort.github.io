const MenuItem = new Phaser.Class({
  Extends: Phaser.GameObjects.Text,

  initialize: function MenuItem(x, y, text, scene) {
    Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: "#ffffff", align: "left", fontSize: 15 });
  },

  select: function () {
    this.setColor("#f8ff38");
  },

  deselect: function () {
    this.setColor("#ffffff");
  },
});

export default MenuItem;
