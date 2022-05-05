import * as Phaser from "./phaser.min.js";

import BootScene from "./scenes/BootScene";
import WorldScene from "./scenes/WorldScene";

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
  scene: [BootScene, WorldScene],
};

export default config;
