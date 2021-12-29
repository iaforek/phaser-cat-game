import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

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
  scene: [GameScene],
};

new Phaser.Game(config);
