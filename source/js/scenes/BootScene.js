import * as Phaser from "../phaser.min.js";
import keys from "./keys";

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.BOOT_SCENE });
  }
  preload() {
    // map tiles
    this.load.image(
      "tiles",
      "../../../public/MORT/MAPS/Tilesets/Tileset 7.png"
    );

    this.load.image(
      "floor1Tiles",
      "../../../public/MORT/MAPS/Tilesets/Tileset 6+7.png"
    );

    // map in json format
    this.load.tilemapTiledJSON(
      "map",
      "../../../public/MORT/MAPS/OverworldMapV2.json"
    );

    this.load.tilemapTiledJSON(
      "floor1",
      "../../../public/MORT/MAPS/Tower1V2.json"
    );

    // our two characters
    this.load.spritesheet("player", "assets/RPG_assets.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("goblin", "../../../public/MORT/ENEMIES/GOBLIN/Goblin.png");

    // butz overworld atlas
    this.load.atlas(
      "playerButz",
      "../../../public/MORT/MORT/OverworldMortSpritesheet.png",
      "../../../public/MORT/MORT/OverworldMortSpritesheet.json"
    );

    // evil tree enemy
    this.load.image("evilTree", "../../../public/MORT/ENEMIES/TREE/Tree.png");
  }

  create() {
    this.scene.start(keys.TOWER_SCENE);
  }
}

export default BootScene;
