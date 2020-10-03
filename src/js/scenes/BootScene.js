var BootScene = function() {


  Phaser.Scene.call(this, { key: 'bootGame' });
};

BootScene.prototype = Object.create(Phaser.Scene.prototype);
BootScene.prototype.constructor = BootScene;

BootScene.prototype.create = function() {

  this.add.text(20, 20, 'Loading game...');

  this.scene.start('playGame');

};
