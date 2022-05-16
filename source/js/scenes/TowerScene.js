import keys from "./keys";

class TowerScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.TOWER_SCENE });
  }

  preload() {}

  create() {
    // create the map
    const map = this.make.tilemap({ key: "floor1" });

    // first parameter is the name of the tilemap in tiled
    // var tiles = map.addTilesetImage("Tileset 7", "tiles");
    const tiles = map.addTilesetImage("Floor1", "floor1Tiles");

    // creating the layers
    const collisionLayer = map.createLayer("Collision", tiles);
    const doorLayer = map.createLayer("Door", tiles);
    const exitLayer = map.createLayer("Exit", tiles);
    const groundLayer = map.createLayer("Floor", tiles);
    const objectLayer = map.createLayer("Objects", tiles);

    const debugGraphics = this.add.graphics().setAlpha(0.75);

    this.cameras.main.fadeIn(500, 0, 0, 0);

    // make all tiles in obstacles collidable
    collisionLayer.setCollisionByExclusion([-1]);
    doorLayer.setCollisionByProperty({ door: true });
    exitLayer.setCollisionByProperty({ exit: true });

    // make all tiles in obstacles collidable
    collisionLayer.setCollisionByExclusion([-1]);
    doorLayer.setCollisionByProperty({ door: true });
    exitLayer.setCollisionByProperty({ exit: true });

    //audio
    this.music = this.sound.add("doomcastle");
    this.music.play({ volume: 0.2 });

    this.events.on("sleep", () => {
      console.log(this.scene);
      this.music.stop();
    });

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
    this.player = this.physics.add.sprite(455, 410, "playerMort");
    const frameNames = this.textures.get("playerMort").getFrameNames();

    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // don't walk on into the water
    this.physics.add.collider(this.player, collisionLayer);

    //set up collision detection for door
    this.physics.add.collider(this.player, doorLayer, this.hitDoorLayer.bind(this));

    this.physics.add.collider(this.player, exitLayer, this.hitExitLayer.bind(this));

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
    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);

    this.entrance = this.physics.add.group({
      classType: Phaser.GameObjects.Zone,
    });

    //doors to next level
    // this.entrance.create(455, 375, 16, 16);
    // this.entrance.create(48, 20, 16, 16);

    this.physics.add.overlap(this.player, this.entrance, this.hitDoorLayer, false, this);

    this.physics.add.overlap(this.player, this.entrance, this.hitExitLayer, false, this);

    this.sys.events.on(
      "wake",
      () => {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.music.play({ volume: 0.2 });
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
    this.cameras.main.fadeOut(500, 0, 0, 0);

    let context = this.registry.get("context");
    context.currentScene = keys.WORLD_SCENE;
    this.registry.set("context", context);

    this.music.pause();
    this.scene.switch(keys.WORLD_SCENE);
  }

  hitExitLayer(player, target) {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    // change context.currentScene to FINAL_SCENE
    this.scene.switch(keys.FINAL_SCENE);
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

export default TowerScene;
