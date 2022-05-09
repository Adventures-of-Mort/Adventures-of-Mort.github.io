import BootScene from "./scenes/BootScene"
import WorldScene from "./scenes/WorldScene"
import StartScene from "./scenes/StartScene"
import BattleUIScene from "./scenes/BattleUIScene.js"
import StartUIScene from "./scenes/StartUIScene.js"
import BattleScene from "./scenes/BattleScene"

const config = {
	type: Phaser.AUTO,
	parent: "content",
	width: 320,
	height: 240,
	zoom: 2,
	pixelArt: true,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
			debug: false, // set to true to view zones
		},
	},
	scene: [
		BootScene,
		StartScene,
		StartUIScene,
		WorldScene,
		BattleScene,
		BattleUIScene,
	],
}

export default config
