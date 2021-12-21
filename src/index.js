import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 928,
  height: 793,
  backgroundColor: '#DDDDDD',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const OBSTACLES_TO_RENDER = 5;
const OBSTACLES_SPACER = 500;

// Loading assets, such as images, music, animations ....
function preload() {
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

  this.load.image('cat', 'assets/cat.png');
  this.load.image('cactus', 'assets/cactus.png');
}

let cat;
let cactus;
let START_Y;
let jump = false;
let obstacles;

// Creating instances of the objects
function create() {
  this.background = this.add
    .tileSprite(0, 0, config.width, config.height, 'forest00')
    .setOrigin(0);

  this.background = this.add
    .tileSprite(0, 0, config.width, config.height, 'forest02')
    .setOrigin(0);

  this.background = this.add
    .tileSprite(0, 0, config.width, config.height, 'forest03')
    .setOrigin(0);

  this.treesBack = [];

  const tree1 = this.add
    .tileSprite(0, 0, config.width, config.height, 'forest04')
    .setOrigin(0);

  const tree2 = this.add
    .tileSprite(0, 0, config.width, config.height, 'forest05')
    .setOrigin(0);

  const tree3 = this.add
    .tileSprite(0, 0, config.width, config.height, 'forest06')
    .setOrigin(0);

  this.treesBack.push(tree1);
  this.treesBack.push(tree2);
  this.treesBack.push(tree3);

  this.treesFront = [];
  const tree4 = this.add
    .tileSprite(0, 0, config.width, config.height, 'forest07')
    .setOrigin(0);
  const tree5 = this.add
    .tileSprite(0, 0, config.width, config.height, 'forest08')
    .setOrigin(0);
  const tree6 = this.add
    .tileSprite(0, 0, config.width, config.height, 'forest09')
    .setOrigin(0);

  this.treesFront.push(tree4);
  this.treesFront.push(tree5);
  this.treesFront.push(tree6);

  this.grass = this.add
    .tileSprite(0, 0, config.width, config.height, 'forest10')
    .setOrigin(0);

  cat = this.physics.add
    .sprite(config.width / 10, config.height / 1.1, 'cat')
    .setOrigin(0);

  START_Y = cat.y;
  cat.body.gravity.y = 1000;

  obstacles = this.physics.add.group();

  for (let i = 0; i < OBSTACLES_TO_RENDER; i++) {
    obstacles
      .create(
        config.width + i * OBSTACLES_SPACER,
        config.height - 100,
        'cactus'
      )
      .setOrigin(0);
  }

  obstacles.setVelocityX(-200);

  this.foreground = this.add
    .tileSprite(0, 0, config.width, config.height, 'forest11')
    .setOrigin(0);

  this.input.keyboard.on('keydown_SPACE', () => {
    if (!jump) {
      cat.y = START_Y - 1;
      cat.body.velocity.y = -500;
      jump = true;
    }
  });
}

function update() {
  this.foreground.setTilePosition((this.foreground.tilePositionX += 4));
  this.grass.setTilePosition((this.grass.tilePositionX += 2));

  this.treesFront.forEach((tree) =>
    tree.setTilePosition((tree.tilePositionX += 1))
  );

  this.treesBack.forEach((tree) =>
    tree.setTilePosition((tree.tilePositionX += 0.5))
  );

  // cactus.x -= 2;

  if (cat.y >= START_Y) {
    cat.y = START_Y;
    cat.body.velocity.y = 0;
    jump = false;
  }
}

new Phaser.Game(config);
