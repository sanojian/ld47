var PlayScene = function() {

  Phaser.Scene.call(this, { key: 'playGame' } );

  this.customProps = {};

};

PlayScene.prototype = Object.create(Phaser.Scene.prototype);
PlayScene.prototype.constructor = PlayScene;

PlayScene.prototype.create = function() {

  this.cameras.main.setBounds(0, 0, 4000, 4000);

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

  for (y = -1; y < Math.ceil(this.sys.game.scale.gameSize.width / 120); y++) {
    for (x = -1; x < Math.ceil(this.sys.game.scale.gameSize.width / 120); x++) {

      addTile(this, tiles, x*120, y*120, 60, 60, 'square', 0);

      addTile(this, tiles, x*120, y*120, 60, 120, 'diamond', 0);
      addTile(this, tiles, x*120, y*120, 120, 60, 'diamond', Math.PI/2);

      addTile(this, tiles, x*120, y*120, 150, 30, 'triangle', 0);
      addTile(this, tiles, x*120, y*120, 150, 90, 'triangle', -Math.PI/2);
      addTile(this, tiles, x*120, y*120, 90, 30, 'triangle', Math.PI/2);
      addTile(this, tiles, x*120, y*120, 90, 90, 'triangle', Math.PI);

    }
  }


  var controlConfig = {
        camera: this.cameras.main,
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
    };

    this.customProps.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

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

PlayScene.prototype.update = function(time, delta) {

  this.customProps.controls.update(delta);

};
