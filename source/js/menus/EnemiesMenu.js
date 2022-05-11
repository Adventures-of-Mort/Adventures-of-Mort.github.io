import Menu from "./Menu"

class EnemiesMenu extends Menu {
	constructor(x, y, scene) {
		super(x, y, scene)
	}
	confirm() {
		// emits when player selects enemy to attack
		this.scene.events.emit("Enemy", this.menuItemIndex)
	}
}

export default EnemiesMenu
