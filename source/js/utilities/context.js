import {
  whiteMage,
  redMage,
  rogue,
  warrior,
  monk,
  knight,
  master,
  ninja,
  redWizard,
  whiteWizard,
} from "../characters/enemies";
import keys from "../scenes/keys";

const context = {
  currentScene: keys.WORLD_SCENE,
  enemiesList: [
    { zone: keys.WORLD_SCENE, localEnemies: [whiteMage, redMage, rogue, warrior, monk], minLevel: 1, maxLevel: 6 },
    {
      zone: keys.TOWER_SCENE,
      localEnemies: [knight, master, ninja, redWizard, whiteWizard],
      minLevel: 5,
      maxLevel: 11,
    },
  ],
  currentEnemies: function () {
    return this.enemiesList.filter((enemies) => {
      return enemies.zone === this.currentScene;
    });
  },
};

export default context;
