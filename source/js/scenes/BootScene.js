import * as Phaser from "../phaser.js"
import keys from "./keys"

class BootScene extends Phaser.Scene {
	constructor() {
		super({ key: keys.BOOT_SCENE })
	}
	preload() {
		// map tiles
		this.load.image(
			"tiles",
			"../../../public/MORT/MAPS/Tilesets/Tileset 7.png"
		)

		this.load.image(
			"floor1Tiles",
			"../../../public/MORT/MAPS/Tilesets/Tileset 6+7.png"
		)

		this.load.image(
			"finalFloorTiles",
			"../../../public/MORT/MAPS/Tilesets/Tileset 1.png"
		)

		// map in json format
		this.load.tilemapTiledJSON(
			"map",
			"../../../public/MORT/MAPS/OverworldMapV2.json"
		)

		this.load.tilemapTiledJSON(
			"floor1",
			"../../../public/MORT/MAPS/Tower1V2.json"
		)

		this.load.tilemapTiledJSON(
			"FinalTowerFloor",
			"../../../public/MORT/MAPS/FinalFloor.json"
		)

		// our two characters
		this.load.atlas(
			"battleButz",
			"../../../public/MORT/MORT/BattleMortSpritesheet.png",
			"../../../public/MORT/MORT/BattleMortSpritesheet.json"
		)

		this.load.atlas(
			"skeleman",
			"../../../public/MORT/SKELEMAN/SkeleSpritesheet.png",
			"../../../public/MORT/SKELEMAN/SkeleSpritesheet.json"
		)

		// butz overworld atlas
		this.load.atlas(
			"playerButz",
			"../../../public/MORT/MORT/OverworldMortSpritesheet.png",
			"../../../public/MORT/MORT/OverworldMortSpritesheet.json"
		)

		// Enemies

		this.load.image("whiteWolf", "../../../public/MORT/ENEMIES/10.png")

		this.load.image("goblin", "../../../public/MORT/ENEMIES/5.png")

		this.load.image("ghost", "../../../public/MORT/ENEMIES/46.png")

		this.load.image("spider", "../../../public/MORT/ENEMIES/79.png")
	}

	create() {
		this.scene.start(keys.START_SCENE)
	}
}

export default BootScene
