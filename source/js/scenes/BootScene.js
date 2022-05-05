import * as Phaser from "../phaser.min.js";

const BootScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function BootScene() {
    Phaser.Scene.call(this, { key: "BootScene" });
  },

  preload: function () {
    // map tiles
    this.load.image("tiles", "assets/map/spritesheet.png");

    // map in json format
    this.load.tilemapTiledJSON("map", "assets/map/map.json");

    // our two characters
    this.load.spritesheet("player", "assets/RPG_assets.png", { frameWidth: 16, frameHeight: 16 });
  },

  create: function () {
    // start the WorldScene
    this.scene.start("BattleScene");
    // only for test
    //this.scene.start("StartScene");
  },
});

export default BootScene;
