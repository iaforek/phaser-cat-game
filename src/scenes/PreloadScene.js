import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
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

    this.load.spritesheet('hero', 'assets/hero.png', {
      frameWidth: 21,
      frameHeight: 34,
    });

    this.load.image('cactus', 'assets/cactus.png');
    this.load.image('ground', 'assets/ground.png');
  }

  create() {
    this.scene.start('GameScene');
  }
}

export default PreloadScene;
