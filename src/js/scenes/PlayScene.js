var PlayScene = function() {

  Phaser.Scene.call(this, { key: 'playGame' } );

  this.customProps = {};

};

PlayScene.prototype = Object.create(Phaser.Scene.prototype);
PlayScene.prototype.constructor = PlayScene;

PlayScene.prototype.create = function() {

  this.customProps = {
    graphics: this.add.graphics({ lineStyle: { color: 0x00ff00 } }),
    circles: [],
    intersecting: []
  };
  var x, y;
  for (y = 0; y < 3; y++) {
    for (x = 0; x < 4; x++) {

      this.customProps.circles.push({
        geom: new Phaser.Geom.Circle(x*120, y*120, 120),
        selected: false
      });

    }
  }

  var tiles = {};

  for (y = -1; y < 8; y++) {
    for (x = -1; x < 8; x++) {

      addTile(this, tiles, x*120, y*120, 60, 60, 'square', 0);

      addTile(this, tiles, x*120, y*120, 60, 120, 'diamond', 0);
      addTile(this, tiles, x*120, y*120, 120, 60, 'diamond', Math.PI/2);

      addTile(this, tiles, x*120, y*120, 150, 30, 'triangle', 0);
      addTile(this, tiles, x*120, y*120, 150, 90, 'triangle', -Math.PI/2);
      addTile(this, tiles, x*120, y*120, 90, 30, 'triangle', Math.PI/2);
      addTile(this, tiles, x*120, y*120, 90, 90, 'triangle', Math.PI);

    }
  }

  var colors = [
    0x000000,
    0x222034,
    0x45283c,
    0x663931,
    0x8f563b,
    0xdf7126,
    0xd9a066,
    0xeec39a,
    0xfbf236,
    0x99e550,
    0x6abe30,
    0x37946e,
    0x4b692f,
    0x524b24,
    0x323c39,
    0x3f3f74,
    0x306082,
    0x5b6ee1,
    0x639bff,
    0x5fcde4,
    0xcbdbfc,
    0xffffff,
    0x9badb7,
    0x847e87,
    0x696a6a,
    0x595652,
    0x76428a,
    0xac3232,
    0xd96763,
    0xd77bba,
    0x8f974a,
    0x8a6f30
  ];

  function setTint(pointer) {
      g_game.tint = this.custTint;
  }

  for (var i = 0; i < colors.length; i++) {

    x = this.sys.game.scale.gameSize.width - 24*(1 + i%2);
    y = 16 + Math.floor(i / 2) * 20;

    var tile = this.add.image(x, y, 'tile')
      .setTint(colors[i])
      .setInteractive()
      .on('pointerdown', setTint);
    tile.custTint = colors[i];

  }


};

var addTile = function(game, tiles, x, y, tileX, tileY, type, rotation) {

  var newX = x + tileX;
  var newY = y + tileY;
  var name = newX + '_' + newY;

  if (tiles[name]) {
    console.log('already exists');
  }
  else {
    tiles[name] = game.add.image(newX, newY, type);
    tiles[name].rotation = rotation;
    tiles[name].setInteractive({ pixelPerfect: true });
    tiles[name].setTint(0x000000);
    tiles[name].on('pointerdown', function (pointer) {
        this.setTint(g_game.tint);
    });
  }

};
