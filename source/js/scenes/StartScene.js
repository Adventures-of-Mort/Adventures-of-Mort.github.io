const StartScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function StartScene() {
    Phaser.Scene.call(this, { key: "StartScene" });
  },
  create: function () {
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");
    this.scene.launch("StartUIScene");

    //this.scene.events.on("StartMenuSelect", this.menuSelect, this);
  },
  menuSelect: function (index) {
    //this.scene.launch("BattleScene");
    console.log("hi");
  },
});

export default StartScene;
