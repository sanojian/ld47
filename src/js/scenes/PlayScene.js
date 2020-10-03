var PlayScene = function() {

  Phaser.Scene.call(this, 'playGame');

  this.customProps = {};

};

PlayScene.prototype = Object.create(Phaser.Scene.prototype);
PlayScene.prototype.constructor = PlayScene;

PlayScene.prototype.create = function() {

  this.customProps.graphics = this.add.graphics({
    lineStyle: { color: 0x00ff00 }
  });

  //this.add.text(20, 20, "Playing the game now");

  this.customProps.circles = [];

  for (var y = 1; y < 5; y++) {
    for (var x = 1; x < 6; x++) {

      this.customProps.circles.push({
        geom: new Phaser.Geom.Circle(x*120, y*120, 120),
        selected: false
      });

    }
  }

  var self = this;
  this.input.on('pointerdown', function(pointer) {

    for (var i = 0; i < self.customProps.circles.length; i++) {

      var geom = self.customProps.circles[i].geom;

      if (Math.sqrt(Math.pow(geom.x - pointer.x, 2) + Math.pow(geom.y - pointer.y, 2)) < geom.radius) {
        self.customProps.circles[i].selected = true;
      }
      else {
        self.customProps.circles[i].selected = false;
      }
    }
  });

};

PlayScene.prototype.update = function() {

  this.customProps.graphics.clear();

  this.customProps.graphics.lineStyle(1, 0xff0000);
  //this.customProps.graphics.beginPath();

  var geom, i;
  for (i = 0; i < this.customProps.circles.length; i++) {

    geom = this.customProps.circles[i].geom;

    if (this.customProps.circles[i].selected) {
      this.customProps.graphics.lineStyle(1, 0xff0000);
    }
    else {
      this.customProps.graphics.lineStyle(1, 0x00ff00);
    }

    //this.customProps.graphics.moveTo(geom.x, geom.y);
    //this.customProps.graphics.arc(geom.x, geom.y, geom.radius, 0, 2*Math.PI);
    this.customProps.graphics.strokeCircleShape(geom);
  }


};
