import MenuItem from "../menus/MenuItem";

class Menu extends Phaser.GameObjects.Container {
  constructor(x, y, scene, heroes) {
    super(scene, x, y);
    this.menuItems = [];
    this.menuItemIndex = 0;
    this.heroes = heroes;
    this.x = x;
    this.y = y;
    this.selected = false;
  }
  addMenuItem(unit) {
    let menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
    this.menuItems.push(menuItem);
    this.add(menuItem);
    return menuItem;
  }
  moveSelectionUp() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex--;
    if (this.menuItemIndex < 0) this.menuItemIndex = this.menuItems.length - 1;
    this.menuItems[this.menuItemIndex].select();
  }
  moveSelectionDown() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex++;
    if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
    this.menuItems[this.menuItemIndex].select();
  }
  // select the menu as a whole and an element with index from it
  select(index) {
    if (!index) index = 0;

    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;

    while (!this.menuItems[this.menuItemIndex].active) {
      this.menuItemIndex++;
      if (this.menuItemIndex >= this.menuItems.length) {
        this.menuItemIndex = 0;
      }
      if (this.menuItemIndex === index) {
        return;
      }
    }
    this.menuItems[this.menuItemIndex].select();
    this.selected = true;
  }
  // deselect this menu
  deselect() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
    this.selected = false;
  }
  // confirm() {
  // 	// wen the player confirms his slection, do the action
  // }
  clear() {
    for (let i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i].destroy();
    }
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  }
}

export default Menu;
