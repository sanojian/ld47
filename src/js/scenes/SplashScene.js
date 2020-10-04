var SplashScene = function() {


  Phaser.Scene.call(this, { key: 'splash' });
};

SplashScene.prototype = Object.create(Phaser.Scene.prototype);
SplashScene.prototype.constructor = SplashScene;


SplashScene.prototype.create = function() {

  this.add.image(this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height / 3, 'title');

  var style = {
    font: "32px 'Conv_ladybug px'",
    fill: "#fbf236",
    align: "center"
  };

  this.add.text(this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height - 180, '...', style);


  this.time.delayedCall(500, function() {

    this.add.text(this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height - 128, 'ENTER to chat', style).setOrigin(0.5);
    this.add.text(this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height - 64, 'CLICK to start...', style).setOrigin(0.5);

  }, null, this);


  var self = this;
  this.input.on('pointerdown', function() {

    self.scene.start('playGame');
    self.scene.start('palette');
  });


};
