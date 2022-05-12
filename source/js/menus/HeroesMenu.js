import Menu from "./Menu"

class HeroesMenu extends Menu {
	constructor(x, y, scene) {
		super(x, y, scene)
	}
	remap(units) {
		this.clear()
		for (let i = 0; i < units.length; i++) {
			console.log("Menu : Remap")
			const unit = units[i]
			unit.setMenuItem(
				this.addMenuItem(`${unit.type} | ${unit.hp} / ${unit.maxHP}`)
			)
		}
		this.menuItemIndex = 0
	}
	// This doesnt do anything at the moment
}

export default HeroesMenu
