import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import PreloadScene from './scenes/PreloadScene';

const config = {
  type: Phaser.AUTO,
  width: 928,
  height: 793,
  backgroundColor: '#DDDDDD',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: [PreloadScene, GameScene],
};

new Phaser.Game(config);
