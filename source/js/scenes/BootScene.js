import * as Phaser from "../phaser.min.js";

const BootScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function BootScene() {
    Phaser.Scene.call(this, { key: "BootScene" });
  },

  preload: function () {
    // map tiles
    this.load.image(
      "tiles",
      "../../../public/MORT/MAPS/Tilesets/Tileset 7.png"
    );

    // map in json format
    this.load.tilemapTiledJSON(
      "map",
      "../../../public/MORT/MAPS/OverworldMapV2.json"
    );

    this.load.atlas(
      "player",
      "../../../public/MORT/MORT/OverworldMortSpritesheet.png",
      "../../../public/MORT/MORT/OverworldMortSpritesheet.json"
    );

    // goblin enemy
    this.load.image("goblin", "../../../public/MORT/ENEMIES/GOBLIN/Goblin.png");

    // evil tree enemy
    this.load.image("evilTree", "../../../public/MORT/ENEMIES/TREE/Tree.png");
  },

  create: function () {
    // start the WorldScene
    this.scene.start("WorldScene");
    // only for test
    //this.scene.start("StartScene");
  },
});

export default BootScene;
