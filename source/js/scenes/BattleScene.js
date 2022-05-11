import PlayerCharacter from "../units/Player"
import Enemy from "../units/Enemy"
import keys from "./keys"

class BattleScene extends Phaser.Scene {
	constructor() {
		super({ key: keys.BATTLE_SCENE })
	}
	create() {
		this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)")
		this.battleSequence()
		this.sys.events.on("wake", this.battleSequence, this)
	}

	battleSequence() {
		// PLAYER DAMAGE IS SCALED UP FOR DEV PURPOSES

		// The Create method only runs on first initialization, so we must create the Battle Sequence method which is called on first launch and when the scene "wakes up" upon being switched back to from world scene

		// player character - warrior
		const warrior = new PlayerCharacter(
			this,
			250,
			50,
			"player",
			1,
			"Warrior",
			100,
			40
		)
		this.add.existing(warrior)

		// player character - mage
		const mage = new PlayerCharacter(
			this, //scene
			250, //x coord
			100, //y coord
			"player", //texture
			4, //frame
			"Mage", //type
			80, //HP
			40 //Damage
		)
		this.add.existing(mage)

		// non player character - goblin
		const goblin = new Enemy(this, 50, 50, "goblin", null, "Goblin", 50, 3)
		this.add.existing(goblin)

		// non player character - evilTree
		const evilTree = new Enemy(
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

		// array with enemies
		this.enemies = [goblin, evilTree]
		// array with heroes
		this.heroes = [warrior, mage]

		// array with both parties, who will attack
		this.units = this.heroes.concat(this.enemies)

		this.index = -1
		console.log(this)
		// Run UI Scene at the same time
		this.scene.run(keys.BATTLE_UI_SCENE)

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
			this.endBattle()
			return
		}
		do {
			this.index++
			console.log("nextTurn : BattleScene")
			// Here is where we restart the turn order
			if (this.index >= this.units.length) this.index = 0
		} while (!this.units[this.index].living)

		//checking to see if its a player character
		if (this.units[this.index] instanceof PlayerCharacter) {
			console.log("Its a players turn")
			this.events.emit("PlayerSelect", this.index)
		} else {
			// if its an enemy
			// pick a random target
			let target
			do {
				target = Math.floor(Math.random() * this.heroes.length)
			} while (!this.heroes[target].living)
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

	checkEndBattle() {
		let victory = true

		for (let i = 0; i < this.enemies.length; i++) {
			console.log("check end battle(victory) : battleScene")
			if (this.enemies[i].living) victory = false
		}

		let gameOver = true

		for (let i = 0; i < this.heroes.length; i++) {
			console.log("check end battle(gameOver) : battleScene")
			if (this.heroes[i].living) gameOver = false
		}

		return victory || gameOver
	}

	endBattle() {
		// Wrap it up, boys. The show is over
		this.heroes.length = 0
		this.enemies.length = 0
		for (let i = 0; i < this.units.length; i++) {
			console.log("endbattle : battleScene")
			this.units[i].destroy()
		}
		this.units.length = 0

		this.scene.sleep(keys.BATTLE_UI_SCENE)

		this.scene.switch(keys.WORLD_SCENE)
	}

	// where is this method being called?
	receivePlayerSelection(action, target) {
		console.log("receiving player selection")
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
		this.scene.sleep(keys.BATTLE_UI_SCENE)
		this.scene.switch(keys.WORLD_SCENE)
	}
}

export default BattleScene
