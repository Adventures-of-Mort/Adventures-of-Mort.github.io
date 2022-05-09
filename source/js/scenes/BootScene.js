import * as Phaser from "../phaser.min.js"
import keys from "./keys"

class BootScene extends Phaser.Scene {
	constructor() {
		super({ key: keys.BOOT_SCENE })
	}
	preload() {
		this.load.image("tiles", "assets/map/spritesheet.png")

		// map in json format
		this.load.tilemapTiledJSON("map", "assets/map/map.json")

		// our two characters
		this.load.spritesheet("player", "assets/RPG_assets.png", {
			frameWidth: 16,
			frameHeight: 16,
		})
		this.load.image(
			"goblin",
			"../../../public/MORT/ENEMIES/GOBLIN/Goblin.png"
		)

		// evil tree enemy
		this.load.image(
			"evilTree",
			"../../../public/MORT/ENEMIES/TREE/Tree.png"
		)
	}

	create() {
		this.scene.start(keys.WORLD_SCENE)
	}
}

export default BootScene
