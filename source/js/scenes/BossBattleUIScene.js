import HeroesMenu from "../menus/HeroesMenu";
import ActionsMenu from "../menus/ActionsMenu";
import EnemiesMenu from "../menus/EnemiesMenu";
import MagicMenu from "../menus/MagicMenu";
import Message from "../menus/Message";
import keys from "./keys";

class BossBattleUIScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.BOSS_BATTLE_UI_SCENE });
  }
  create() {
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    this.selector = this.sound.add("selector");
    // Enemy Menu
    this.graphics.strokeRect(1, 150, 120, 100);
    this.graphics.fillRect(0, 150, 120, 100);

    // Action Menu
    this.graphics.strokeRect(118, 150, 75, 100);
    this.graphics.fillRect(118, 150, 75, 100);
    // x y width height
    // Player Character Menu
    this.graphics.strokeRect(188, 150, 133, 100);
    this.graphics.fillRect(188, 150, 133, 100);

    this.menus = this.add.container();

    this.heroesMenu = new HeroesMenu(196, 156, this);
    this.actionsMenu = new ActionsMenu(136, 156, this);
    this.enemiesMenu = new EnemiesMenu(11, 156, this);
    this.magicMenu = new MagicMenu(139, 156, this);

    this.magicMenu.visible = false;

    // the currently selected menu
    this.currentMenu = this.actionsMenu;

    // add menus to the container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);
    this.menus.add(this.magicMenu);

    // retrieve unit data from Battle Scene
    this.battleScene = this.scene.get(keys.BOSS_SCENE);

    // menu navigation
    this.input.keyboard.on("keydown", this.onKeyInput, this);

    //when its the players turn
    this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

    this.battleScene.events.on("HealSelect", this.onHealSelect, this);

    this.events.on("MagicSelect", this.onSelectMagic, this);

    // when the action on the menu is selected
    //for now we have only one action so we dont send an action ID
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
    this.actionsMenu.visible = true;

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

  onSelectMagic({ spell }) {
    this.spell = spell;
    this.currentMenu = this.enemiesMenu;
    this.enemiesMenu.select(0);
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
    if (action === "Magic") {
      this.actionsMenu.visible = false;
      this.magicMenu.visible = true;
      this.currentMenu = this.magicMenu;
      this.magicMenu.select(0);
    }
    if (action === "Flee") {
      this.battleScene.fleeBattle();
    }
  }

  onKeyInput(event) {
    if (this.currentMenu && this.currentMenu.selected) {
      if (event.code === "ArrowUp") {
        this.currentMenu.moveSelectionUp();
        this.selector.play({ volume: 0.5 });
      } else if (event.code === "ArrowDown") {
        this.currentMenu.moveSelectionDown();
        this.selector.play({ volume: 0.5 });
      } else if (event.code === "ArrowRight" || event.code === "Shift") {
      } else if (event.code === "Enter") {
        this.currentMenu.confirm();
        this.selector.play({ volume: 0.5 });
      }
    }
  }

  onEnemy({ index }) {
    let spell = this.spell;
    console.log("on enemy spell: ", this.spell);
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;

    if (spell) {
      this.battleScene.receivePlayerSelection("magic", index, spell);
      this.spell = null;
      return;
    }
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

export default BossBattleUIScene;
