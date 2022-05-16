import * as Phaser from "../phaser.js";
import keys from "./keys";
import context from "../utilities/context";

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.BOOT_SCENE });
  }
  preload() {
    // map tiles
    this.load.image("tiles", "../../../public/MORT/MAPS/Tilesets/Tileset 7.png");

    this.load.image("floor1Tiles", "../../../public/MORT/MAPS/Tilesets/Tileset 6+7.png");

    this.load.image("finalFloorTiles", "../../../public/MORT/MAPS/Tilesets/Tileset 1.png");

    // map in json format
    this.load.tilemapTiledJSON("map", "../../../public/MORT/MAPS/OverworldMapV2.json");

    this.load.tilemapTiledJSON("floor1", "../../../public/MORT/MAPS/Tower1V2.json");

    this.load.tilemapTiledJSON("FinalTowerFloor", "../../../public/MORT/MAPS/FinalFloor.json");

    this.load.image("menuSplash", "../../../public/MORT/SPLASHART/Mort_Tings.png");

    // our two characters
    this.load.atlas(
      "battleMort",
      "../../../public/MORT/MORT/BattleMortSpritesheet.png",
      "../../../public/MORT/MORT/BattleMortSpritesheet.json"
    );

    this.load.atlas(
      "skeleman",
      "../../../public/MORT/SKELEMAN/SkeleSpritesheet.png",
      "../../../public/MORT/SKELEMAN/SkeleSpritesheet.json"
    );

    // butz overworld atlas
    this.load.atlas(
      "playerMort",
      "../../../public/MORT/MORT/OverworldMortSpritesheet.png",
      "../../../public/MORT/MORT/OverworldMortSpritesheet.json"
    );

    //battle backgrounds
    this.load.image("WorldScene-battleBackground", "../../../public/MORT/BATTLEBACKGROUNDS/0.png");

    this.load.image("TowerScene-battleBackground", "../../../public/MORT/BATTLEBACKGROUNDS/21.png");

    //enemies

    this.load.image("whiteWolf", "../../../public/MORT/ENEMIES/10.png");

    this.load.image("goblin", "../../../public/MORT/ENEMIES/5.png");

    this.load.image("ghost", "../../../public/MORT/ENEMIES/46.png");

    this.load.image("spider", "../../../public/MORT/ENEMIES/79.png");

    //audio

    this.load.audio("battle1", "../../../source/assets/audio/music/battle1.mp3");
    this.load.audio("battle2", "../../../source/assets/audio/music/battle2.mp3");
    this.load.audio("battle3", "../../../source/assets/audio/music/battle3.mp3");
    this.load.audio("world_theme", "../../../source/assets/audio/music/world.MP3");
    this.load.audio("main_theme", "../../../source/assets/audio/music/main_theme.MP3");
    this.load.audio("boss1", "../../../source/assets/audio/music/bossbattle.mp3");
    this.load.audio("doomcastle", "../../../source/assets/audio/music/doomcastle.mp3");
    this.load.audio("gameover", "../../../source/assets/audio/music/GameOver.mp3");
    this.load.audio("victory", "../../../source/assets/audio/music/victoryfanfare.mp3");

    this.load.audio("door1", "../../../source/assets/audio/effects/door1.wav");
    this.load.audio("door2", "../../../source/assets/audio/effects/door2.wav");
  }

  create() {
    this.registry.set("context", context);

    this.scene.start(keys.START_SCENE);
  }
}

export default BootScene;
