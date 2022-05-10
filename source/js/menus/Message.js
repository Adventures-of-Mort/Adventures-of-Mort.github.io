import * as Phaser from "../phaser.min.js"

export default class Message extends Phaser.GameObjects.Container {
	constructor(scene, events) {
		super(scene, 160, 30)
		const graphics = this.scene.add.graphics()
		this.add(graphics)

		graphics.lineStyle(1, 0xffffff, 0.8)
		graphics.fillStyle(0x031f4c, 0.3)
		graphics.strokeRect(-90, -15, 180, 30)
		graphics.fillRect(-90, -15, 180, 30)

		this.text = new Phaser.GameObjects.Text(scene, 0, 0, "", {
			color: "#ffffff",
			align: "center",
			fontSize: 13,
			wordWrap: { width: 160, useAdvancedWrap: true },
		}).setOrigin(0.5)
		this.add(this.text)

		console.log("Message Menu reporting in")

		events.on("Message", this.showMessage, this)
		this.visible = false
	}

	showMessage(text) {
		console.log("Show menu method is being called")
		this.text.setText(text)
		this.visible = true
		if (this.hideEvent) {
			this.hideEvent.remove(false)
		}
		this.hideEvent = this.scene.time.addEvent({
			delay: 2000,
			callback: this.hideMessage,
			callbackScope: this,
		})
	}

	hideMessage() {
		this.hideEvent = null
		this.visible = false
	}
}
