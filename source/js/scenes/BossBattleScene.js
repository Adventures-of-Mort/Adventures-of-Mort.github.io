import PlayerCharacter from "../units/Player";
import Enemy from "../units/Enemy";
import keys from "./keys";
import mort from "../characters/mort";
import skeleman from "../characters/skelemen";
import boss from "../characters/enemies";

class BossBattleScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.BOSS_SCENE });
  }

  create() {
    this.battleUIScene = this.scene.get(keys.BOSS_BATTLE_UI_SCENE);
    this.battleSequence();
    this.sys.events.on("wake", this.battleSequence, this);
  }

  battleSequence() {
    let background = this.add.image(
      160,
      120,
      `BossBattleScene-battleBackground`
    );
    background.displayWidth = 320;
    background.displayHeight = 240;

    // PLAYER DAMAGE IS SCALED UP FOR DEV PURPOSES

    // The Create method only runs on first initialization, so we must create the Battle Sequence method which is called on first launch and when the scene "wakes up" upon being switched back to from world scene

    // player character - warrior
    const warrior = new PlayerCharacter(
      this,
      250,
      50,
      "skeleman",
      0,
      "Skeleman",
      skeleman.currentHP,
      40,
      skeleman.maxHP
    );
    this.add.existing(warrior);

    // player character - mage
    const mage = new PlayerCharacter(
      this, //scene
      250, //x coord
      100, //y coord
      "battleMort", //texture
      0, //frame
      "Mort", //type
      mort.currentHP, //HP
      40, //Damage
      mort.maxHP //maxHP
    );
    this.add.existing(mage);

    // non player character - goblin
    const boss = new Enemy(
      this,
      60,
      70,
      "boss",
      0,
      `'Evil' Princess`,
      300,
      35,
      300
    );

    this.add.existing(boss);

    // array with enemies
    this.enemies = [boss];
    // array with heroes
    this.heroes = [warrior, mage];

    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);
    console.log(this.units);

    this.index = -1;
    // Run UI Scene at the same time
    this.scene.run(keys.BOSS_BATTLE_UI_SCENE);

    //Timer to kill battle sequence for development purposes

    // const timeEvent = this.time.addEvent({
    // 	delay: 2000,
    // 	callback: this.exitBattle,
    // 	callbackScope: this,
    // })
  }

  // wake() {
  // 	this.scene.run("BattleUIScene")
  // 	this.time.addEvent({
  // 		delay: 2000,
  // 		callback: this.exitBattle,
  // 		callbackScope: this,
  // 	})
  // }

  nextTurn() {
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }
    do {
      this.index++;
      // Here is where we restart the turn order
      if (this.index >= this.units.length) this.index = 0;
    } while (!this.units[this.index].living);

    //checking to see if its a player character
    if (this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit("PlayerSelect", this.index);
    } else {
      // if its an enemy
      // pick a random target
      let target;
      do {
        target = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[target].living);
      // ATTACK!
      this.units[this.index].attack(this.heroes[target]);
      let currentTarget = this.heroes[target];
      // if (currentTarget.type === mort.type)
      // 	currentTarget.hp === mort.currentHP
      this.battleUIScene.remapHeroes();
      // This is to add time between attacks to provide smoother gameplay loop
      this.time.addEvent({
        delay: 3000,
        callback: this.nextTurn,
        callbackScope: this,
      });
    }
  }

  checkEndBattle() {
    let victory = true;

    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].living) victory = false;
    }

    let gameOver = true;

    for (let i = 0; i < this.heroes.length; i++) {
      if (this.heroes[i].living) gameOver = false;
    }

    return victory || gameOver;
  }

  endBattle() {
    // Wrap it up, boys. The show is over
    let sceneContext = this.registry.get("context");
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i++) {
      this.units[i].destroy();
    }
    this.units.length = 0;

    this.scene.sleep(keys.BOSS_BATTLE_UI_SCENE);

    this.scene.switch(sceneContext.currentScene);
  }

  // where is this method being called?
  receivePlayerSelection(action, target) {
    if (action === "attack") {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({
      delay: 3000,
      callback: this.nextTurn,
      callbackScope: this,
    });
  }
}

export default BossBattleScene;