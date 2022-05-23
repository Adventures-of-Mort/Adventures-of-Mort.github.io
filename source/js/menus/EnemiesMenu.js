import Menu from "./Menu";

class EnemiesMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene);
  }

  confirm(action) {
    // emits when player selects enemy to attack
    this.scene.events.emit("Enemy", { index: this.menuItemIndex, action: action });
  }
  remap(units) {
    this.clear();
    for (let i = 0; i < units.length; i++) {
      const unit = units[i];
      if (unit.type === `'Evil' Princess`) {
        unit.setMenuItem(this.addMenuItem(`${unit.type}`));
      } else {
        unit.setMenuItem(this.addMenuItem(`${unit.type} | lvl ${unit.level}`));
      }
    }
    this.menuItemIndex = 0;
  }
}

export default EnemiesMenu;
