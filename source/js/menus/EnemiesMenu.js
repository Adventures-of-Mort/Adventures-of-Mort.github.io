import Menu from "./Menu"

class EnemiesMenu extends Menu {
	constructor(x, y, scene) {
		super(x, y, scene)
	}
	moveSelectionUp() {
		this.menuItems[this.menuItemIndex].deselect()
		do {
			console.log("Menu : moveSelectionUp")
			this.menuItemIndex--
			if (this.menuItemIndex < 0)
				this.menuItemIndex = this.menuItems.length - 1
		} while (!this.menuItems[this.menuItemIndex].active)
		this.menuItems[this.menuItemIndex].select()
	}
	moveSelectionDown() {
		this.menuItems[this.menuItemIndex].deselect()
		do {
			console.log("Menu : moveSelectionDown")
			this.menuItemIndex++
			if (this.menuItemIndex >= this.menuItems.length)
				this.menuItemIndex = 0
		} while (!this.menuItems[this.menuItemIndex].active)
		this.menuItems[this.menuItemIndex].select()
	}
	confirm() {
		// emits when player selects enemy to attack
		this.scene.events.emit("Enemy", this.menuItemIndex)
	}
	remap(units) {
		this.clear()
		for (let i = 0; i < units.length; i++) {
			console.log("Menu : Remap")
			const unit = units[i]
			unit.setMenuItem(this.addMenuItem(unit.type))
		}
		this.menuItemIndex = 0
	}
}

export default EnemiesMenu
