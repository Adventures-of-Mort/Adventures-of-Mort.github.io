import keys from "./keys";

class FinalBossScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.FINAL_SCENE });
  }

  preload() {
    this.load.image(
      "finalFloorBackground",
      "../../../public/MORT/MAPS/Tilesets/stars.jpg"
    );
  }

  create() {
    // create the map
    const map = this.make.tilemap({ key: "FinalTowerFloor" });

    // first parameter is the name of the tilemap in tiled

    const tiles = map.addTilesetImage("Tileset1", "finalFloorTiles");

    // creating the layers
    let background = this.add.image(500, 500, "finalFloorBackground");
    background.displayWidth = 1000;
    background.displayHeight = 1000;
    // const stars = map.createLayer("Image Layer 1");
    const collisionLayer = map.createLayer("Collision", tiles);
    const doorLayer = map.createLayer("door", tiles);
    const groundLayer = map.createLayer("Base Floor", tiles);
    const statueLayer = map.createLayer("Statues", tiles);

    const debugGraphics = this.add.graphics().setAlpha(0.75);

    // make all tiles in obstacles collidable
    collisionLayer.setCollisionByExclusion([-1]);
    doorLayer.setCollisionByProperty({ door: true });

    //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    this.anims.create({
      key: "left",
      frames: [
        { key: "playerMort", frame: "MortWalkSide1.png" },
        { key: "playerMort", frame: "MortWalkSide2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    // animation with key 'right'
    this.anims.create({
      key: "right",
      frames: [
        { key: "playerMort", frame: "MortWalkSide1.png" },
        { key: "playerMort", frame: "MortWalkSide2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: [
        { key: "playerMort", frame: "MortWalkUp1.png" },
        { key: "playerMort", frame: "MortWalkUp2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: [
        { key: "playerMort", frame: "MortWalkDown1.png" },
        { key: "playerMort", frame: "MortWalkDown2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    // our player sprite created through the phycis system
    //OG Starting POINT 456,450
    this.player = this.physics.add.sprite(385, 778, "playerMort");
    const frameNames = this.textures.get("playerMort").getFrameNames();

    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // don't walk on into the water
    this.physics.add.collider(this.player, collisionLayer);

    //set up collision detection for door
    this.physics.add.collider(
      this.player,
      doorLayer,
      this.hitDoorLayer.bind(this)
    );

    // limit camera to map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true; // avoid tile bleed

    // user input
    this.cursors = this.input.keyboard.createCursorKeys();

    // where the enemies will be
    this.spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Zone,
    });
    for (var i = 0; i < 15; i++) {
      var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height
      this.spawns.create(x, y, 20, 20);
    }

    // add collider
    this.physics.add.overlap(
      this.player,
      this.spawns,
      this.onMeetEnemy,
      false,
      this
    );

    //doors to next level
    this.physics.add.overlap(
      this.player,
      this.entrance,
      this.hitDoorLayer,
      false,
      this
    );

    this.sys.events.on(
      "wake",
      () => {
        this.cameras.main.fadeIn(500, 0, 0, 0);
      },
      this
    );
  }

  onMeetEnemy(player, zone) {
    // we move the zone to some other location
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // shake the world
    this.cameras.main.shake(200);

    // start battle
    this.scene.switch(keys.BATTLE_SCENE);
  }

  hitDoorLayer(player, target) {
    console.log("DOOR HIT");
    this.cameras.main.fadeOut(500, 0, 0, 0);

    this.scene.switch(keys.TOWER_SCENE);
  }

  update(time, delta) {
    // this.controls.update(delta);

    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.player.anims.play("left", true);
      this.player.flipX = false;
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("right", true);
      this.player.flipX = true;
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("down", true);
    } else {
      this.player.anims.stop();
    }
  }
}

export default FinalBossScene;
