import PlayerCharacter from "../units/Player";
import Enemy from "../units/Enemy";

const BattleScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function BattleScene() {
    Phaser.Scene.call(this, { key: "BattleScene" });
  },
  create: function () {
    // change the background to green
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");

    // player character - warrior
    var warrior = new PlayerCharacter(this, 250, 50, "player", 1, "Warrior", 100, 20);
    this.add.existing(warrior);

    // player character - mage
    var mage = new PlayerCharacter(this, 250, 100, "player", 4, "Mage", 80, 8);
    this.add.existing(mage);

    var dragonblue = new Enemy(this, 50, 50, "dragonblue", null, "Dragon", 50, 3);
    this.add.existing(dragonblue);

    var dragonOrange = new Enemy(this, 50, 100, "dragonorrange", null, "Dragon2", 50, 3);
    this.add.existing(dragonOrange);

    // array with heroes
    this.heroes = [warrior, mage];
    // array with enemies
    this.enemies = [dragonblue, dragonOrange];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    // Run UI Scene at the same time
    this.scene.launch("BattleUIScene");
  },
});

export default BattleScene;
