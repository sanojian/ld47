var PlayScene = function() {

  Phaser.Scene.call(this, { key: 'playGame' } );

  this.customProps = {};

};

PlayScene.prototype = Object.create(Phaser.Scene.prototype);
PlayScene.prototype.constructor = PlayScene;

PlayScene.prototype.create = function() {

  this.cameras.main.setBounds(0, 0, 4000, 4000);

  this.customProps = {
    graphics: this.add.graphics({ lineStyle: { color: 0x00ff00 } })
  };

  var tiles = {};

  for (y = -1; y < Math.ceil(4000 / 120); y++) {
    for (x = -1; x < Math.ceil(4000 / 120); x++) {

      addTile(this, tiles, x*120, y*120, 60, 60, 'square', 0);

      addTile(this, tiles, x*120, y*120, 60, 120, 'diamond', 0);
      addTile(this, tiles, x*120, y*120, 120, 60, 'diamond', Math.PI/2);

      addTile(this, tiles, x*120, y*120, 150, 30, 'triangle', 0);
      addTile(this, tiles, x*120, y*120, 150, 90, 'triangle', -Math.PI/2);
      addTile(this, tiles, x*120, y*120, 90, 30, 'triangle', Math.PI/2);
      addTile(this, tiles, x*120, y*120, 90, 90, 'triangle', Math.PI);

    }
  }

  g_game.tiles = tiles;

  var cursors = this.input.keyboard.createCursorKeys();
  var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.4,
        drag: 0.01,
        maxSpeed: 2.0
    };

    this.customProps.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    g_game.chatText = this.add.group({
      classType: ChatText,
      maxSize: 16,
      runChildUpdate: true
    });

    initNetworking(function() {

    });

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
        gameSocket.emit('color', { id: name, tint: g_game.tint });
    });
  }

};

PlayScene.prototype.update = function(time, delta) {

  this.customProps.controls.update(delta);

};
