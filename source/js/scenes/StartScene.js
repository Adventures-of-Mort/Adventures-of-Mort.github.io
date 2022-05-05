const StartScene = new Phaser.Class({
  extends: Phaser.Scene,

  initialize: function StartScene() {
    Phaser.Scene.call(this, { key: "StartScene" });
  },
  create: function () {
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");
    this.scene.launch("BattleUIScene");
  },
});

export default StartScene;
