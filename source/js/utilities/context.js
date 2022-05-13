import { wolf, goblin, ghost, spider } from "../characters/enemies"
import keys from "../scenes/keys"

const context = {
	currentScene: keys.WORLD_SCENE,
	enemiesList: [
		{ zone: keys.WORLD_SCENE, localEnemies: [wolf, goblin] },
		{ zone: keys.TOWER_SCENE, localEnemies: [ghost, spider] },
	],
	currentEnemies: function () {
		return this.enemiesList.filter((enemies) => {
			return enemies.zone === this.currentScene
		})
	},
}

export default context
