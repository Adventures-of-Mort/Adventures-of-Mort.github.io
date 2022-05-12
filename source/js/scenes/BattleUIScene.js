import HeroesMenu from "../menus/HeroesMenu"
import ActionsMenu from "../menus/ActionsMenu"
import EnemiesMenu from "../menus/EnemiesMenu"
import Message from "../menus/Message"
import keys from "./keys"

class BattleUIScene extends Phaser.Scene {
	constructor() {
		super({ key: keys.BATTLE_UI_SCENE })
	}
	create() {
		this.graphics = this.add.graphics()
		this.graphics.lineStyle(1, 0xffffff)
		this.graphics.fillStyle(0x031f4c, 1)

		// Enemy Menu
		this.graphics.strokeRect(2, 150, 90, 100)
		this.graphics.fillRect(2, 150, 90, 100)

		// Action Menu
		this.graphics.strokeRect(95, 150, 90, 100)
		this.graphics.fillRect(95, 150, 90, 100)

		// Player Character Menu
		this.graphics.strokeRect(188, 150, 130, 100)
		this.graphics.fillRect(188, 150, 130, 100)

		this.menus = this.add.container()

		this.heroesMenu = new HeroesMenu(195, 153, this)
		this.actionsMenu = new ActionsMenu(100, 153, this)
		this.enemiesMenu = new EnemiesMenu(8, 153, this)

		// the currently selected menu
		this.currentMenu = this.actionsMenu

		// add menus to the container
		this.menus.add(this.heroesMenu)
		this.menus.add(this.actionsMenu)
		this.menus.add(this.enemiesMenu)

		// retrieve unit data from Battle Scene
		this.battleScene = this.scene.get(keys.BATTLE_SCENE)

		// menu navigation
		this.input.keyboard.on("keydown", this.onKeyInput, this)

		//when its the players turn
		this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this)

		// when the action on the menu is selected
		//for now we have only one action so we dont send an action ID
		this.events.on("SelectAction", this.onSelectAction, this)

		// when an enemy is selected
		this.events.on("Enemy", this.onEnemy, this)

		// when the scene gets a wake event
		this.sys.events.on("wake", this.createMenu, this)

		// Combat Text
		this.message = new Message(this, this.battleScene.events)
		this.add.existing(this.message)

		this.createMenu()
	}

	createMenu() {
		console.log("CreateMenu : UI Scene")
		// map hero menu items to heroes
		this.remapHeroes()

		// map enemy menu items to enemies
		this.remapEnemies()

		// ROUND 1, FIGHT!
		this.battleScene.nextTurn()
	}

	onPlayerSelect(id) {
		this.heroesMenu.select(id)
		this.actionsMenu.select(0)
		this.currentMenu = this.actionsMenu
	}

	onSelectAction() {
		this.currentMenu = this.enemiesMenu
		this.enemiesMenu.select(0)
	}

	onKeyInput(event) {
		if (this.currentMenu && this.currentMenu.selected) {
			if (event.code === "ArrowUp") {
				this.currentMenu.moveSelectionUp()
			} else if (event.code === "ArrowDown") {
				this.currentMenu.moveSelectionDown()
			} else if (event.code === "ArrowRight" || event.code === "Shift") {
			} else if (event.code === "Space" || event.code === "ArrowLeft") {
				this.currentMenu.confirm()
				// console.log("hi")
			}
		}
	}

	onEnemy(index) {
		this.heroesMenu.deselect()
		this.actionsMenu.deselect()
		this.enemiesMenu.deselect()
		this.currentMenu = null
		this.battleScene.receivePlayerSelection("attack", index)
	}

	remapHeroes() {
		var heroes = this.battleScene.heroes
		this.heroesMenu.remap(heroes)
	}

	remapEnemies() {
		var enemies = this.battleScene.enemies
		this.enemiesMenu.remap(enemies)
	}
}

export default BattleUIScene
