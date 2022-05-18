import PlayerCharacter from "../units/Player";
import Enemy from "../units/Enemy";
import keys from "./keys";
import mort from "../characters/mort";
import skeleman from "../characters/skelemen";

class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.BATTLE_SCENE });
  }

  create() {
    this.battleUIScene = this.scene.get(keys.BATTLE_UI_SCENE);

    // this.initializeAudio();
    // this.music.play({ volume: 0.2 });

    // this.events.on("wake", () => {
    // 	this.initializeAudio();
    //   this.music.play({ volume: 0.2 });
    // });

    // this.events.on("sleep", () => {
    // 	this.music.stop();
    // });
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.battleSequence();
    this.sys.events.on("wake", this.battleSequence, this);
  }

  generateEnemies() {
    let sceneContext = this.registry.get("context");
    let zoneEnemies = sceneContext.currentEnemies();
    let { localEnemies } = zoneEnemies[0];

    const one = localEnemies[Math.floor(Math.random() * localEnemies.length)];

    const enemyOne = new Enemy(this, 50, 60, one.texture, null, one.type, one.hp, one.damage, one.hp, one.experience);
    this.add.existing(enemyOne);

    const two = localEnemies[Math.floor(Math.random() * localEnemies.length)];

    const enemyTwo = new Enemy(this, 50, 85, two.texture, null, two.type, two.hp, two.damage, two.hp, two.experience);
    this.add.existing(enemyTwo);

    const three = localEnemies[Math.floor(Math.random() * localEnemies.length)];

    const enemyThree = new Enemy(
      this,
      50,
      110,
      three.texture,
      null,
      three.type,
      three.hp,
      three.damage,
      three.hp,
      three.experience
    );
    this.add.existing(enemyThree);
    return [enemyOne, enemyTwo, enemyThree];
  }

  initializeAudio() {
    const songs = ["battle1", "battle2", "battle3"];
    let index = Math.floor(Math.random() * songs.length);
    this.music = this.sound.add(songs[index]);
  }

  battleSequence() {
    this.initializeAudio();
    this.music.play({ volume: 0.2 });

    let sceneContext = this.registry.get("context");
    console.log(sceneContext);

    let background = this.add.image(160, 120, `${sceneContext.currentScene}-battleBackground`);
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
      skeleman.attack,
      skeleman.maxHP
    );
    this.add.existing(warrior);
    console.log(mort);
    // player character - mage
    const mage = new PlayerCharacter(
      this, //scene
      250, //x coord
      100, //y coord
      "battleMort", //texture
      0, //frame
      "Mort", //type
      mort.currentHP, //HP
      mort.attack, //Damage
      mort.maxHP //maxHP
    );
    this.add.existing(mage);

    // array with enemies
    this.enemies = this.generateEnemies();

    // array with heroes
    this.heroes = [warrior, mage];

    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.index = -1;
    // Run UI Scene at the same time
    this.scene.run(keys.BATTLE_UI_SCENE);

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
    let outcome = this.checkEndBattle();
    if (outcome === "victory") {
      this.endBattle();
      return;
    } else if (outcome === "gameover") {
      this.scene.sleep(keys.BATTLE_UI_SCENE);
      this.scene.switch(keys.GAME_OVER_SCENE);
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

    if (victory) {
      let expTally = 0;
      console.log(`exp before ${mort.experience}`);
      for (let i = 0; i < this.enemies.length; i++) {
        expTally += this.enemies[i].experience;
      }
      this.heroes[0].earnExp(expTally);
      if (mort.toNextLevel <= mort.experience) {
        this.heroes[0].levelUp();
        console.log(mort);
      }
      return "victory";
    } else if (gameOver) {
      return "gameover";
    } else {
      return "continue";
    }
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

    this.music.stop();
    //this.scene.sleep(keys.BATTLE_UI_SCENE);
    console.log("got here");
    this.scene.launch(keys.BATTLE_WON_SCENE);
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

export default BattleScene;
