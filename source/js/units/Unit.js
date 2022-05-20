import mort from "../characters/mort";
import skeleman from "../characters/skelemen";

class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage, maxHP, int, experience, attack) {
    super(scene, x, y, texture, frame);
    console.log("constuct ", int);
    this.type = type;
    this.maxHP = maxHP;
    this.hp = hp;
    this.damage = damage; // default damage
    this.living = true;
    this.menuItem = null;
    this.int = int;
  }
  setMenuItem(item) {
    this.menuItem = item;
  }
  attack(target) {
    if (target.living) {
      target.takeDamage(this.damage);
      this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + this.damage + " damage");
    }
  }

  useMagic(target, spell) {
    console.log("int: ", this.int);
    let damage = this.int * 1.5;
    if (target.living) {
      target.takeDamage(damage);
      this.scene.events.emit("Message", `${this.type} casts ${spell} on ${target.type} for ${damage} damage`);
    }
  }

  takeDamage(damage) {
    this.hp -= damage;
    if (this.type === mort.type) mort.currentHP -= damage;
    if (this.type === skeleman.type) skeleman.currentHP -= damage;

    if (this.hp <= 0) {
      this.hp = 0;
      this.menuItem.unitKilled();
      this.living = false;
      this.visible = false;
      this.menuItem = null;
    }
  }

  heal(maxHP) {
    let healAmount = Math.ceil((maxHP - this.hp) * 0.25);

    if (this.hp === maxHP) {
      this.scene.events.emit("Message", `You can't rest. HP is already full!`);
      this.scene.events.emit("HealSelect");
    } else {
      this.hp += healAmount;

      if (this.type === mort.type) {
        mort.currentHP += healAmount;
        if (this.hp > maxHP) {
          this.hp = maxHP;
          mort.currentHP = maxHP;
        }

        this.scene.events.emit("Message", `${this.type} healed for ${healAmount} hp!`);
      }

      if (this.type === skeleman.type) {
        skeleman.currentHP += healAmount;
        if (this.hp > maxHP) {
          this.hp = maxHP;
          skeleman.currentHP = maxHP;
        }
        this.scene.events.emit("Message", `${this.type} healed for ${healAmount} hp!`);
      }
    }
  }

  earnExp(experience) {
    mort.experience += experience;
    skeleman.experience += experience;
  }

  levelUp() {
    let mortIncrease = Math.ceil(mort.maxHP * 0.15);
    mort.maxHP += mortIncrease;
    mortIncrease = Math.ceil(mort.attack * 0.15);
    mort.attack += mortIncrease;
    mortIncrease = Math.ceil(mort.toNextLevel * 0.2);
    mort.toNextLevel += mortIncrease;
    let skelemanIncrease = Math.ceil(skeleman.maxHP * 0.15);
    skeleman.maxHP += skelemanIncrease;
    skelemanIncrease = Math.ceil(skeleman.attack * 0.15);
    skeleman.attack += skelemanIncrease;
    skelemanIncrease = Math.ceil(skeleman.toNextLevel * 0.2);
    skeleman.toNextLevel += skelemanIncrease;
    mort.currentHP = mort.maxHP;
    skeleman.currentHP = skeleman.maxHP;
    mort.level++;
    skeleman.level++;
    mort.experience = 0;
    skeleman.experience = 0;
  }
}

export default Unit;
