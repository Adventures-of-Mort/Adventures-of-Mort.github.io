import Menu from "./Menu"

class ActionsMenu extends Menu {
	constructor(x, y, scene) {
		super(x, y, scene)
		this.battleScene = scene
		this.addMenuItem("Attack")
	}
	confirm() {
		// do something when the player selects an action
		console.log("action menu firing")
		this.battleScene.events.emit("SelectAction")
	}
}

export default ActionsMenu
