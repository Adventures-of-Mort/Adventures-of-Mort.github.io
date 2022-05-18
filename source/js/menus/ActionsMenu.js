import Menu from "./Menu"

class ActionsMenu extends Menu {
	constructor(x, y, scene) {
		super(x, y, scene)
		this.battleScene = scene
		this.addMenuItem("Attack")
	}
	confirm() {
		// emit when player selects action
		this.battleScene.events.emit("SelectAction")
	}
}

export default ActionsMenu
