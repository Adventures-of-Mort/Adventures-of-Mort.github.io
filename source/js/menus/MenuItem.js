import * as Phaser from "../phaser.js"

class MenuItem extends Phaser.GameObjects.Text {
	constructor(x, y, text, scene) {
		super(scene, x, y, text, {
			color: "#ffffff",
			align: "left",
			fontSize: 10,
		})
	}
	select() {
		this.setColor("#f8ff38")
	}

	deselect() {
		this.setColor("#ffffff")
	}
	unitKilled() {
		this.active = false
		this.visible = false
	}
}

export default MenuItem
