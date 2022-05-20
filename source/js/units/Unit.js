import mort from "../characters/mort";
import skeleman from "../characters/skelemen";
import hanzIV from "../characters/hanzIV";

class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage, maxHP, experience, attack) {
    super(scene, x, y, texture, frame);
    this.type = type;
    this.maxHP = maxHP;
    this.hp = hp;
    this.damage = damage; // default damage
    this.living = true;
    this.menuItem = null;
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

  takeDamage(damage) {
    this.hp -= damage;
    if (this.type === mort.type) mort.currentHP -= damage;
    if (this.type === skeleman.type) skeleman.currentHP -= damage;
    if (this.type === hanzIV.type) hanzIV.currentHP -= damage;

    if (this.hp <= 0) {
      if (this.type === mort.type) mort.currentHP = 0;
      if (this.type === skeleman.type) skeleman.currentHP = 0;
      if (this.type === hanzIV.type) hanzIV.currentHP = 0;
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

      if (this.type === hanzIV.type) {
        hanzIV.currentHP += healAmount;
        if (this.hp > maxHP) {
          this.hp = maxHP;
          hanzIV.currentHP = maxHP;
        }
        this.scene.events.emit("Message", `${this.type} healed for ${healAmount} hp!`);
      }
    }
  }

  earnExp(experience) {
    mort.experience += experience;
    skeleman.experience += experience;
    hanzIV.experience += experience;
  }

  levelUp() {
    const heroes = [mort, skeleman, hanzIV];
    for (let i = 0; i < heroes.length; i++) {
      const curHero = heroes[i];
      curHero.maxHP += Math.ceil(curHero.maxHP * 0.15);
      curHero.attack += Math.ceil(curHero.attack * 0.15);
      curHero.toNextLevel += Math.ceil(curHero.toNextLevel * 0.2);
      curHero.level++;
      curHero.currentHP = curHero.maxHP;
      curHero.experience = 0;
    }
  }
}

export default Unit;
