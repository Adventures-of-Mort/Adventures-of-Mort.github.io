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
    { zone: keys.WORLD_SCENE, localEnemies: [whiteMage, redMage, rogue, warrior, monk] },
    { zone: keys.TOWER_SCENE, localEnemies: [knight, master, ninja, redWizard, whiteWizard] },
  ],
  currentEnemies: function () {
    return this.enemiesList.filter((enemies) => {
      return enemies.zone === this.currentScene;
    });
  },
};

export default context;
