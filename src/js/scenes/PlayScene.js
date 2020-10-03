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

  //addTile(this, tiles, 0, 0, 60, 60, 'square', 0);
  //this.add.image(60, 60, 'square');
  //this.add.image(180, 60, 'square');
  //this.add.image(60, 180, 'square');
  //this.add.image(180, 180, 'square');

  //this.add.image(60, 120, 'diamond');
  //this.add.image(180, 120, 'diamond');
  //this.add.image(120, 60, 'diamond').rotation = Math.PI/2;
  //this.add.image(120, 180, 'diamond').rotation = Math.PI/2;

  /*this.add.image(150, 30, 'triangle');
  this.add.image(150, 90, 'triangle').rotation = -Math.PI/2;
  this.add.image(90, 30, 'triangle').rotation = Math.PI/2;
  this.add.image(90, 90, 'triangle').rotation = Math.PI;
  this.add.image(90, 150, 'triangle').rotation = Math.PI/2;
  this.add.image(90, 210, 'triangle').rotation = Math.PI;
  this.add.image(150, 150, 'triangle');
  this.add.image(150, 210, 'triangle').rotation = -Math.PI/2;
  this.add.image(30, 90, 'triangle').rotation = -Math.PI/2;
  this.add.image(30, 150, 'triangle');

  this.add.image(210, 90, 'triangle').rotation = Math.PI;
  this.add.image(210, 150, 'triangle').rotation = Math.PI/2;*/

};

var addTile = function(game, tiles, x, y, tileX, tileY, type, rotation) {

  var newX = x + tileX;
  var newY = y + tileY;

  if (tiles[newX + '_' + newY]) {
    console.log('already exists');
  }
  else {
    tiles[newX + '_' + newY] = game.add.image(newX, newY, type);
    tiles[newX + '_' + newY].rotation = rotation;
  }

};
