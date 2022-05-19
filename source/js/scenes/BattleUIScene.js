import HeroesMenu from "../menus/HeroesMenu";
import ActionsMenu from "../menus/ActionsMenu";
import EnemiesMenu from "../menus/EnemiesMenu";
import Message from "../menus/Message";
import keys from "./keys";

class BattleUIScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.BATTLE_UI_SCENE });
  }
  create() {
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);

    //enemy menu
    this.graphics.strokeRect(1, 150, 125, 100);
    this.graphics.fillRect(0, 150, 125, 100);

    // Action Menu
    this.graphics.strokeRect(125, 150, 95, 100);
    this.graphics.fillRect(125, 150, 95, 100);

    // Player Character Menu
    this.graphics.strokeRect(190, 150, 130, 100);
    this.graphics.fillRect(190, 150, 130, 100);

    this.menus = this.add.container();

    this.heroesMenu = new HeroesMenu(196, 156, this);
    this.actionsMenu = new ActionsMenu(139, 156, this);
    this.enemiesMenu = new EnemiesMenu(11, 156, this);

    // the currently selected menu
    this.currentMenu = this.actionsMenu;

    // add menus to the container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);

    // retrieve unit data from Battle Scene
    this.battleScene = this.scene.get(keys.BATTLE_SCENE);

    // menu navigation
    this.input.keyboard.on("keydown", this.onKeyInput, this);

    //when its the players turn
    this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

    //cant heal go again turn
    this.battleScene.events.on("HealSelect", this.onHealSelect, this);

    // when the action on the menu is selected

    this.events.on("SelectAction", this.onSelectAction, this);

    // when an enemy is selected
    this.events.on("Enemy", this.onEnemy, this);

    // when the scene gets a wake event
    this.sys.events.on("wake", this.createMenu, this);

    // Combat Text
    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);

    this.createMenu();
  }

  createMenu() {
    // map hero menu items to heroes
    this.remapHeroes();

    // map enemy menu items to enemies
    this.remapEnemies();

    // ROUND 1, FIGHT!
    this.battleScene.nextTurn();
  }

  onPlayerSelect(id) {
    this.heroesMenu.select(id);
    this.actionsMenu.select(0);
    this.currentMenu = this.actionsMenu;
  }

  onHealSelect() {
    this.battleScene.index--;
    this.onPlayerSelect();
  }

  onSelectAction({ action }) {
    if (action === "Attack") {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(0);
    }
    if (action === "Rest") {
      this.heroesMenu.deselect();
      this.actionsMenu.deselect();
      this.enemiesMenu.deselect();
      this.currentMenu = null;
      this.battleScene.restUp();
    }
    if (action === "Flee") {
      this.battleScene.fleeBattle();
    }
  }

  onKeyInput(event) {
    if (this.currentMenu && this.currentMenu.selected) {
      if (event.code === "ArrowUp") {
        this.currentMenu.moveSelectionUp();
      } else if (event.code === "ArrowDown") {
        this.currentMenu.moveSelectionDown();
      } else if (event.code === "ArrowRight" || event.code === "Shift") {
      } else if (event.code === "Space" || event.code === "ArrowLeft") {
        this.currentMenu.confirm();
      }
    }
  }

  onEnemy(index) {
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection("attack", index);
  }

  remapHeroes() {
    let heroes = this.battleScene.heroes;
    this.heroesMenu.remap(heroes);
  }

  remapEnemies() {
    let enemies = this.battleScene.enemies;
    this.enemiesMenu.remap(enemies);
  }
}

export default BattleUIScene;
