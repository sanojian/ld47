var BootScene = function() {


  Phaser.Scene.call(this, { key: 'bootGame' });
};

BootScene.prototype = Object.create(Phaser.Scene.prototype);
BootScene.prototype.constructor = BootScene;

BootScene.prototype.preload = function() {

  this.load.image('square', 'assets/gfx/square.png');
  this.load.image('triangle', 'assets/gfx/triangle.png');
  this.load.image('diamond', 'assets/gfx/diamond.png');
  this.load.image('tile', 'assets/gfx/tile.png');
  this.load.image('selection', 'assets/gfx/selected.png');
  this.load.image('title', 'assets/gfx/title.png');

};


BootScene.prototype.create = function() {

  this.add.text(20, 20, 'Loading game...');

  this.time.delayedCall(500, function() {
    this.scene.start('splash');
  }, null, this);


};
