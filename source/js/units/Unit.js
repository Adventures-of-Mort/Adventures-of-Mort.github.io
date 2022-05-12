import mort from "../characters/mort"

class Unit extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame, type, hp, damage, maxHP) {
		super(scene, x, y, texture, frame)
		this.type = type
		this.maxHP = maxHP
		this.hp = hp
		this.damage = damage // default damage
		this.living = true
		this.menuItem = null
	}
	setMenuItem(item) {
		this.menuItem = item
	}
	attack(target) {
		if (target.living) {
			console.log(`${this.type} made an attack against ${target.type}`)
			target.takeDamage(this.damage)
			this.scene.events.emit(
				"Message",
				this.type +
					" attacks " +
					target.type +
					" for " +
					this.damage +
					" damage"
			)
		}
	}
	takeDamage(damage) {
		this.hp -= damage
		if (this.type === mort.type) mort.currentHP -= damage
		console.log(`${mort.type} has ${mort.currentHP} hit points remaining`)
		if (this.hp <= 0) {
			this.hp = 0
			this.menuItem.unitKilled()
			this.living = false
			this.visible = false
			this.menuItem = null
		}
		console.log(`${this.type} has ${this.hp} hit points remaining`)
	}
}

export default Unit
