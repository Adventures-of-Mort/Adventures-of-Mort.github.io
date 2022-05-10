import Menu from "./Menu"

class EnemiesMenu extends Menu {
	constructor(x, y, scene) {
		super(x, y, scene)
	}
	confirm() {
		console.log("enemy menu firing")
		this.scene.events.emit("Enemy", this.menuItemIndex)
	}
}

export default EnemiesMenu