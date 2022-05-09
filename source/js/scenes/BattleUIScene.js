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
		let blue = 0x031f4c
		let red = 0x555555

		this.graphics = this.add.graphics()
		this.graphics.lineStyle(1, 0xffffff)
		this.graphics.fillStyle(red, 1)

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

		this.battleScene = this.scene.get("BattleScene")

		this.remapHeroes()
		this.remapEnemies()

		this.input.keyboard.on("keydown", this.onKeyInput, this)

		this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this)

		this.events.on("SelectEnemies", this.onSelectEnemies, this)

		this.events.on("Enemy", this.onEnemy, this)

		// Combat Text
		this.message = new Message(this, this.battleScene.events)
		this.add.existing(this.message)

		this.battleScene.nextTurn()
	}

	onPlayerSelect(id) {
		this.heroesMenu.select(id)
		this.actionsMenu.select(0)
		this.currentMenu = this.actionsMenu
	}

	onSelectEnemies() {
		this.currentMenu = this.enemiesMenu
		this.enemiesMenu.select(0)
	}

	onKeyInput(event) {
		if (this.currentMenu) {
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
