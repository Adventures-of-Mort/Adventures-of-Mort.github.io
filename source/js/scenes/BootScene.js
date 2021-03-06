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

    // battle player characters
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

    this.load.image("hanz", "../../../public/MORT/ENEMIES/46.png");

    // mort overworld atlas
    this.load.atlas(
      "playerMort",
      "../../../public/MORT/MORT/OverworldMortSpritesheet.png",
      "../../../public/MORT/MORT/OverworldMortSpritesheet.json"
    );

    //starting menu splash
    this.load.image("menuSplash", "../../../public/MORT/SPLASHART/Mort_Tings.png");

    //battle backgrounds
    this.load.image("WorldScene-battleBackground", "../../../public/MORT/BATTLEBACKGROUNDS/0.png");

    this.load.image("TowerScene-battleBackground", "../../../public/MORT/BATTLEBACKGROUNDS/21.png");

    //final boss background
    this.load.image("BossBattleScene-battleBackground", "../../../public/MORT/BATTLEBACKGROUNDS/30.png");

    //Bosses

    this.load.image("boss", "../../../public/MORT/PRINCESS/princessBoss.png");

    //Dragon in distress

    this.load.image("dragon", "../../../public/MORT/ENEMIES/107.png");

    //worldscene-hero-enemies

    this.load.image("warrior", "../../../public/MORT/heroEnemies/warrior-0.png");
    this.load.image("whiteMage", "../../../public/MORT/heroEnemies/whiteMage-2.png");
    this.load.image("rogue", "../../../public/MORT/heroEnemies/rogue-2.png");
    this.load.image("redMage", "../../../public/MORT/heroEnemies/redMage-3.png");
    this.load.image("monk", "../../../public/MORT/heroEnemies/monk-2.png");

    //towerscene-hero-enemies

    this.load.image("knight", "../../../public/MORT/heroEnemies/knight-3.png");
    this.load.image("master", "../../../public/MORT/heroEnemies/master-2.png");
    this.load.image("ninja", "../../../public/MORT/heroEnemies/ninja-2.png");
    this.load.image("redWizard", "../../../public/MORT/heroEnemies/redWizard-3.png");
    this.load.image("whiteWizard", "../../../public/MORT/heroEnemies/whiteWizard-2.png");

    //audio

    this.load.audio("battle1", "../../../source/assets/audio/music/battle1.mp3");
    this.load.audio("battle2", "../../../source/assets/audio/music/battle2.mp3");
    this.load.audio("battle3", "../../../source/assets/audio/music/battle3.mp3");
    this.load.audio("world_theme", "../../../source/assets/audio/music/world.mp3");
    this.load.audio("main_theme", "../../../source/assets/audio/music/main_theme.mp3");
    this.load.audio("boss1", "../../../source/assets/audio/music/bossbattle.mp3");
    this.load.audio("doomcastle", "../../../source/assets/audio/music/doomcastle.mp3");
    this.load.audio("gameover", "../../../source/assets/audio/music/gameover.mp3");
    this.load.audio("victory", "../../../source/assets/audio/music/victoryfanfare.mp3");
    this.load.audio("confusing_melody", "../../../source/assets/audio/music/confusing_melody.mp3");
    this.load.audio("for_achieve", "../../../source/assets/audio/music/for_achieve.mp3");
    this.load.audio("ending", "../../../source/assets/audio/music/ending.mp3");

    this.load.audio("door1", "../../../source/assets/audio/effects/door1.wav");
    this.load.audio("door2", "../../../source/assets/audio/effects/door2.wav");
    this.load.audio("bonk", "../../../source/assets/audio/effects/bonk.mp3");
    this.load.audio("slash", "../../../source/assets/audio/effects/slash.mp3");
    this.load.audio("recover", "../../../source/assets/audio/effects/recover.mp3");
    this.load.audio("hit", "../../../source/assets/audio/effects/hit.mp3");
    this.load.audio("run", "../../../source/assets/audio/effects/run.mp3");
    this.load.audio("selector", "../../source/assets/audio/effects/move.mp3");
    this.load.audio("accept", "../../source/assets/audio/effects/accept.mp3");
    this.load.audio("Fire", "../../source/assets/audio/effects/Fire_1.mp3");
    this.load.audio("Bolt", "../../source/assets/audio/effects/Thunder_1.mp3");
    this.load.audio("Ice", "../../source/assets/audio/effects/Blizzard_1.mp3");
  }

  create() {
    this.registry.set("context", context);

    this.scene.start(keys.START_SCENE);
  }
}

export default BootScene;
