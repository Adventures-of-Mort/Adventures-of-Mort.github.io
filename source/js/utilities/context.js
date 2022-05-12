// import {Paladin, Wizard, Archer, Warrior} from ./enemies
import keys from "../scenes/keys"

const context = {
	currentScene: keys.WORLD_SCENE,
	currentEnemies: this.enemiesList.filter(
		(enemies) => enemies.zone === context.currentScene
	),
	enemiesList: [
		{ zone: keys.WORLD_SCENE, localEnemies: [Warrior, Archer] },
		{ zone: keys.TOWER_SCENE, localEnemies: [Paladin, Wizard] },
	],
}

export default context
