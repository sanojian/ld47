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

  g_game.chatText = this.add.group({
    classType: ChatText,
    maxSize: 16,
    runChildUpdate: true
  });

  // scroll to middle of world
  this.cameras.main.setScroll(2000, 2000);

  initNetworking(function() {

  });

};

var addTile = function(scene, tiles, x, y, tileX, tileY, type, rotation) {

  var newX = x + tileX;
  var newY = y + tileY;
  var name = newX + '_' + newY;

  if (tiles[name]) {
    console.log('already exists');
  }
  else {
    var tile = scene.add.image(newX, newY, type);
    tile.rotation = rotation;
    tile.setInteractive({ pixelPerfect: true });
    tile.setTint(0x000000);
    tile.on('pointerdown', function (pointer) {
      g_game.dragStartX = pointer.x;
      g_game.dragStartY = pointer.y;
      g_game.camStartX = scene.cameras.main.scrollX;
      g_game.camStartY = scene.cameras.main.scrollY;
      g_game.isDragging = true;
    });
    tile.on('pointerup', function (pointer) {
      g_game.isDragging = false;

      var dx = scene.input.activePointer.x - g_game.dragStartX;
      var dy = scene.input.activePointer.y - g_game.dragStartY;

      // click or drag?
      if (Math.abs(dx) + Math.abs(dy) < 10) {
        this.setTint(g_game.tint);
        gameSocket.emit('color', { id: name, tint: g_game.tint });
      }
    });

    tiles[name] = tile;
  }

};

PlayScene.prototype.update = function(time, delta) {


  if (g_game.isDragging) {
    // disance
    var dx = this.input.activePointer.x - g_game.dragStartX;
    var dy = this.input.activePointer.y - g_game.dragStartY;

    // position camera
    this.cameras.main.setScroll(g_game.camStartX - dx, g_game.camStartY - dy);

  }

};
