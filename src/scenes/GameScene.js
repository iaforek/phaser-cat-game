import Phaser from 'phaser';

const OBSTACLES_TO_RENDER = 5;
const OBSTACLES_SPACER_RANGE = [300, 500];

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.config = {
      width: 928,
      height: 793,
    };

    this.cat = null;
    this.obstacles = null;
    this.jump = false;
    this.START_Y = null;
  }

  recycleObstacles() {
    const lastX = this.obstacles
      .getChildren()
      .reduce((current, o) => Math.max(current, o.x), 0);

    this.obstacles.getChildren().forEach((o) => {
      if (o.getBounds().right <= 0) {
        const OBSTACLES_SPACER = Phaser.Math.Between(...OBSTACLES_SPACER_RANGE);
        o.x = lastX + OBSTACLES_SPACER;
      }
    });
  }

  preload() {
    this.load.image('forest00', 'assets/forest/Layer_0011_0.png');
    this.load.image('forest02', 'assets/forest/Layer_0009_2.png');
    this.load.image('forest03', 'assets/forest/Layer_0008_3.png');
    this.load.image('forest04', 'assets/forest/Layer_0007_Lights.png');
    this.load.image('forest05', 'assets/forest/Layer_0006_4.png');
    this.load.image('forest06', 'assets/forest/Layer_0005_5.png');
    this.load.image('forest07', 'assets/forest/Layer_0004_Lights.png');
    this.load.image('forest08', 'assets/forest/Layer_0003_6.png');
    this.load.image('forest09', 'assets/forest/Layer_0002_7.png');
    this.load.image('forest10', 'assets/forest/Layer_0001_8.png');
    this.load.image('forest11', 'assets/forest/Layer_0000_9.png');

    this.load.image('cat', 'assets/concept.gif');
    this.load.image('cactus', 'assets/cactus.png');
  }

  create() {
    this.background = this.add
      .tileSprite(0, 0, this.config.width, this.config.height, 'forest00')
      .setOrigin(0);

    this.background = this.add
      .tileSprite(0, 0, this.config.width, this.config.height, 'forest02')
      .setOrigin(0);

    this.background = this.add
      .tileSprite(0, 0, this.config.width, this.config.height, 'forest03')
      .setOrigin(0);

    this.treesBack = [];

    const tree1 = this.add
      .tileSprite(0, 0, this.config.width, this.config.height, 'forest04')
      .setOrigin(0);

    const tree2 = this.add
      .tileSprite(0, 0, this.config.width, this.config.height, 'forest05')
      .setOrigin(0);

    const tree3 = this.add
      .tileSprite(0, 0, this.config.width, this.config.height, 'forest06')
      .setOrigin(0);

    this.treesBack.push(tree1);
    this.treesBack.push(tree2);
    this.treesBack.push(tree3);

    this.treesFront = [];
    const tree4 = this.add
      .tileSprite(0, 0, this.config.width, this.config.height, 'forest07')
      .setOrigin(0);
    const tree5 = this.add
      .tileSprite(0, 0, this.config.width, this.config.height, 'forest08')
      .setOrigin(0);
    const tree6 = this.add
      .tileSprite(0, 0, this.config.width, this.config.height, 'forest09')
      .setOrigin(0);

    this.treesFront.push(tree4);
    this.treesFront.push(tree5);
    this.treesFront.push(tree6);

    this.grass = this.add
      .tileSprite(0, 0, this.config.width, this.config.height, 'forest10')
      .setOrigin(0);

    this.cat = this.physics.add
      .sprite(this.config.width / 10, this.config.height / 1.15, 'cat')
      .setOrigin(0);

    this.START_Y = this.cat.y;
    this.cat.body.gravity.y = 1000;

    this.obstacles = this.physics.add.group();

    for (let i = 0; i < OBSTACLES_TO_RENDER; i++) {
      const OBSTACLES_SPACER = Phaser.Math.Between(...OBSTACLES_SPACER_RANGE);

      this.obstacles
        .create(
          this.config.width + i * OBSTACLES_SPACER,
          this.config.height - 100,
          'cactus'
        )
        .setImmovable(true)
        .setOrigin(0);
    }

    this.obstacles.setVelocityX(-200);

    this.foreground = this.add
      .tileSprite(0, 0, this.config.width, this.config.height, 'forest11')
      .setOrigin(0);

    this.input.keyboard.on('keydown_SPACE', () => {
      if (!this.jump) {
        this.cat.y = this.START_Y - 1;
        this.cat.body.velocity.y = -500;
        this.jump = true;
      }
    });

    this.physics.add.collider(
      this.cat,
      this.obstacles,
      this.gameOver,
      null,
      this
    );
  }

  update() {
    this.foreground.setTilePosition((this.foreground.tilePositionX += 4));
    this.grass.setTilePosition((this.grass.tilePositionX += 2));

    this.treesFront.forEach((tree) =>
      tree.setTilePosition((tree.tilePositionX += 1))
    );

    this.treesBack.forEach((tree) =>
      tree.setTilePosition((tree.tilePositionX += 0.5))
    );

    if (this.cat.y >= this.START_Y) {
      this.cat.y = this.START_Y;
      this.cat.body.velocity.y = 0;
      this.jump = false;
    }

    this.recycleObstacles();
  }

  gameOver() {
    this.physics.pause();
    this.cat.setTint(0xff0000);
    alert('GAME OVER');
  }
}

export default GameScene;
