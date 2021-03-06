import BootScene from "./scenes/BootScene";
import WorldScene from "./scenes/WorldScene";
import StartScene from "./scenes/StartScene";
import BattleUIScene from "./scenes/BattleUIScene.js";
import StartUIScene from "./scenes/StartUIScene.js";
import BattleScene from "./scenes/BattleScene";
import TowerScene from "./scenes/TowerScene";
import FinalBossScene from "./scenes/FinalBossScene";
import GameOverScene from "./scenes/GameOverScene";
import BattleWonScene from "./scenes/BattleWonScene";
import BossBattleScene from "./scenes/BossBattleScene";
import BossBattleUIScene from "./scenes/BossBattleUIScene";
import GameWonScene from "./scenes/GameWonScene";
import NotificationScene from "./scenes/NotificationsScene";
import IntroTextScene from "./scenes/IntroTextScene";
import StatusScene from "./scenes/StatusScene";

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
      debug: false, // set to true to view zones
    },
  },
  scene: [
    BootScene,
    StartScene,
    StartUIScene,
    IntroTextScene,
    WorldScene,
    TowerScene,
    FinalBossScene,
    BattleScene,
    BattleUIScene,
    GameOverScene,
    BattleWonScene,
    BossBattleScene,
    BossBattleUIScene,
    GameWonScene,
    NotificationScene,
    StatusScene,
  ],
  callbacks: {
    preBoot: function (game) {
      //game.music = Phaser.Sound.SoundManagerCreator.create(game);
      //game.FX = Phaser
    },
  },
};
export default config;
