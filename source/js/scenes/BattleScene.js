import PlayerCharacter from "../units/Player"
import Enemy from "../units/Enemy"

const BattleScene = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function BattleScene() {
		Phaser.Scene.call(this, { key: "BattleScene" })
	},
	create: function () {
		// change the background to green

		// Find way to implement battleScene 12 for visualization

		this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)")

		// player character - warrior
		var warrior = new PlayerCharacter(
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
		var mage = new PlayerCharacter(
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

		// Run UI Scene at the same time
		this.scene.launch("BattleUIScene")
	},
})

export default BattleScene
