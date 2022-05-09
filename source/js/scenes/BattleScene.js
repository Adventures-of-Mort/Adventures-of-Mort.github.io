import PlayerCharacter from "../units/Player"
import Enemy from "../units/Enemy"
import keys from "./keys"

class BattleScene extends Phaser.Scene {
	constructor() {
		super({ key: keys.BATTLE_SCENE })
	}
	create() {
		this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)")

		// player character - warrior
		const warrior = new PlayerCharacter(
			this,
			250,
			50,
			"player",
			1,
			"Warrior",
			100,
			20
		)
		this.add.existing(warrior)

		// player character - mage
		const mage = new PlayerCharacter(
			this,
			250,
			100,
			"player",
			4,
			"Mage",
			80,
			8
		)
		this.add.existing(mage)

		// non player character - goblin
		var goblin = new Enemy(this, 50, 50, "goblin", null, "Goblin", 50, 3)
		this.add.existing(goblin)

		// non player character - evilTree
		var evilTree = new Enemy(
			this,
			50,
			100,
			"evilTree",
			null,
			"Evil Tree",
			50,
			3
		)
		this.add.existing(evilTree)

		// array with heroes
		this.heroes = [warrior, mage]
		// array with enemies
		this.enemies = [goblin, evilTree]
		// array with both parties, who will attack
		this.units = this.heroes.concat(this.enemies)

		this.index = -1

		// Run UI Scene at the same time
		this.scene.launch("BattleUIScene")

		const timeEvent = this.time.addEvent({
			delay: 2000,
			callback: this.exitBattle,
			callbackScope: this,
		})

		// this.sys.events.on("wake", this.wake, this)
	}

	wake() {
		this.scene.run("BattleUIScene")
		this.time.addEvent({
			delay: 2000,
			callback: this.exitBattle,
			callbackScope: this,
		})
	}

	nextTurn() {
		this.index++
		// Here is where we restart the turn order
		if (this.index >= this.units.length) this.index = 0

		if (this.units[this.index]) {
			//checking to see if its a player character
			if (this.units[this.index] instanceof PlayerCharacter) {
				this.events.emit("PlayerSelect", this.index)
			} else {
				// if its an enemy
				// pick a random target
				const target = Math.floor(Math.random() * this.heroes.length)
				// ATTACK!
				this.units[this.index].attack(this.heroes[target])
				// This is to add time between attacks to provide smoother gameplay loop
				this.time.addEvent({
					delay: 3000,
					callback: this.nextTurn,
					callbackScope: this,
				})
			}
		}
	}

	receivePlayerSelection(action, target) {
		if (action === "attack") {
			this.units[this.index].attack(this.enemies[target])
		}
		this.time.addEvent({
			delay: 3000,
			callback: this.nextTurn,
			callbackScope: this,
		})
	}

	exitBattle() {
		this.scene.remove("BattleUIScene")
		this.scene.switch("WorldScene")
	}
}

export default BattleScene
