import BootScene from "./scenes/BootScene";
import WorldScene from "./scenes/WorldScene";
import StartScene from "./scenes/StartScene";
import BattleUIScene from "./scenes/BattleUIScene.js";
import StartUIScene from "./scenes/StartUIScene.js";
import BattleScene from "./scenes/BattleScene";
import TowerScene from "./scenes/TowerScene";
import FinalBossScene from "./scenes/FinalBossScene";
import BossBattleScene from "./scenes/BossBattleScene";
import BossBattleUIScene from "./scenes/BossBattleUIScene";

const config = {
  type: Phaser.AUTO,
  parent: "content",
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true, // set to true to view zones
    },
  },
<<<<<<< HEAD
  scene: [
    BootScene,
    StartScene,
    StartUIScene,
    WorldScene,
    TowerScene,
    FinalBossScene,
    BattleScene,
    BattleUIScene,
    BossBattleScene,
    BossBattleUIScene,
  ],
=======
  scene: [BootScene, StartScene, StartUIScene, WorldScene, TowerScene, FinalBossScene, BattleScene, BattleUIScene],
  callbacks: {
    preBoot: function (game) {
      //game.music = Phaser.Sound.SoundManagerCreator.create(game);
      //game.FX = Phaser
    },
  },
>>>>>>> 6d28c384928ade5ee7a34cc48a43474c4dcb9ea6
};
export default config;
