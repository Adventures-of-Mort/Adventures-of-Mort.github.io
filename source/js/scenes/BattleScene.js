import PlayerCharacter from "../units/Player";
import Enemy from "../units/Enemy";
import keys from "./keys";
import mort from "../characters/mort";
import skeleman from "../characters/skelemen";
import hanzIV from "../characters/hanzIV";

class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.BATTLE_SCENE });
  }

  create() {
    this.battleUIScene = this.scene.get(keys.BATTLE_UI_SCENE);

    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.battleSequence();
    this.sys.events.on("wake", this.battleSequence, this);
  }

  generateEnemies() {
    let sceneContext = this.registry.get("context");
    let zoneEnemies = sceneContext.currentEnemies();
    let { localEnemies } = zoneEnemies[0];
    let attackingEnemies = [];

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }

    let randomNum = getRandomInt(2, 5);
    let enemyOneLvl = getRandomInt(zoneEnemies[0].minLevel, zoneEnemies[0].maxLevel);
    let enemyTwoLvl = getRandomInt(zoneEnemies[0].minLevel, zoneEnemies[0].maxLevel);
    let enemyThreeLvl = getRandomInt(zoneEnemies[0].minLevel, zoneEnemies[0].maxLevel);
    let enemyFourLvl = getRandomInt(zoneEnemies[0].minLevel, zoneEnemies[0].maxLevel);

    const one = localEnemies[Math.floor(Math.random() * localEnemies.length)];

    const enemyOne = new Enemy(
      this,
      50,
      60,
      one.texture,
      null,
      one.type,
      one.level + enemyOneLvl,
      one.hp + enemyOneLvl * 5,
      one.damage + enemyOneLvl * 2,
      one.hp + enemyOneLvl * 5,
      one.experience + enemyOneLvl * 10
    );

    const two = localEnemies[Math.floor(Math.random() * localEnemies.length)];

    const enemyTwo = new Enemy(
      this,
      50,
      85,
      two.texture,
      null,
      two.type,
      two.level + enemyTwoLvl,
      two.hp + enemyTwoLvl * 5,
      two.damage + enemyTwoLvl * 2,
      two.hp + enemyTwoLvl * 5,
      two.experience + enemyTwoLvl * 10
    );

    const three = localEnemies[Math.floor(Math.random() * localEnemies.length)];

    const enemyThree = new Enemy(
      this,
      50,
      110,
      three.texture,
      null,
      three.type,
      three.level + enemyThreeLvl,
      three.hp + enemyThreeLvl * 5,
      three.damage + enemyThreeLvl * 2,
      three.hp + enemyThreeLvl * 5,
      three.experience + enemyThreeLvl * 10
    );

    const four = localEnemies[Math.floor(Math.random() * localEnemies.length)];
    const enemyFour = new Enemy(
      this,
      50,
      135,
      four.texture,
      null,
      four.type,
      four.level + enemyFourLvl,
      four.hp + enemyFourLvl * 5,
      four.damage + enemyFourLvl * 2,
      four.hp + enemyFourLvl * 5,
      four.experience + enemyFourLvl * 10
    );

    let allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour];
    for (let i = 0; i < randomNum; i++) {
      this.add.existing(allEnemies[i]);
      attackingEnemies.push(allEnemies[i]);
    }
    return attackingEnemies;
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

    let background = this.add.image(160, 120, `${sceneContext.currentScene}-battleBackground`);
    background.displayWidth = 320;
    background.displayHeight = 240;

    // player character - warrior
    const warrior = new PlayerCharacter(
      this,
      250,
      50,
      "skeleman",
      0,
      "Skeleman",
      70,
      skeleman.attack,
      skeleman.maxHP,
      skeleman.int
    );
    this.add.existing(warrior);

    // player character - mage
    const mage = new PlayerCharacter(
      this, //scene
      290, //x coord
      90, //y coord
      "battleMort", //texture
      0, //frame
      "Mort", //type
      mort.currentHP, //HP
      mort.attack, //Damage
      mort.maxHP, //maxHP
      mort.int
    );
    this.add.existing(mage);

    const hanz = new PlayerCharacter(
      this,
      250,
      125,
      hanzIV.texture,
      0,
      hanzIV.type,
      hanzIV.currentHP,
      hanzIV.attack,
      hanzIV.maxHP
    );
    this.add.existing(hanz);

    // array with enemies

    this.enemies = this.generateEnemies();

    // array with heroes
    this.heroes = [warrior, mage, hanz];

    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.index = -1;
    // Run UI Scene at the same time
    this.scene.run(keys.BATTLE_UI_SCENE);
  }

  nextTurn() {
    let outcome = this.checkEndBattle();
    if (outcome === "victory") {
      this.music.stop();
      this.endBattle();
      return;
    } else if (outcome === "gameover") {
      this.music.stop();
      mort.currentHP = mort.maxHP;
      skeleman.currentHP = skeleman.maxHP;

      this.battleUIScene.remapHeroes();
      this.scene.sleep(keys.BATTLE_UI_SCENE);
      this.scene.stop(keys.WORLD_SCENE);
      this.scene.stop(keys.TOWER_SCENE);
      this.scene.stop(keys.FINAL_SCENE);
      this.scene.stop(keys.BATTLE_SCENE);
      this.scene.start(keys.GAME_OVER_SCENE);
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
      for (let i = 0; i < this.enemies.length; i++) {
        expTally += this.enemies[i].experience;
      }
      this.heroes[0].earnExp(expTally);
      if (mort.toNextLevel <= mort.experience) {
        this.heroes[0].levelUp();
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
    this.scene.launch(keys.BATTLE_WON_SCENE);
  }

  fleeBattle() {
    let sceneContext = this.registry.get("context");

    this.index--;
    this.music.stop();
    this.scene.sleep(keys.BATTLE_UI_SCENE);
    this.scene.switch(sceneContext.currentScene);
  }

  restUp() {
    this.units[this.index].heal(this.units[this.index].maxHP);

    this.battleUIScene.remapHeroes();

    this.time.addEvent({
      delay: 2000,
      callback: this.nextTurn,
      callbackScope: this,
    });
  }

  receivePlayerSelection(action, target, spell = null) {
    if (action === "attack") {
      this.units[this.index].attack(this.enemies[target]);
    }
    if (action === "magic") {
      this.units[this.index].useMagic(this.enemies[target], spell);
    }
    this.scene.get(keys.BATTLE_UI_SCENE).actionsMenu.visible = true;
    this.time.addEvent({
      delay: 3000,
      callback: this.nextTurn,
      callbackScope: this,
    });
  }
}

export default BattleScene;
