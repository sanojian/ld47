
var ChatText = function(scene) {

  var style = {
    font: "16px 'Conv_ladybug px'",
    fill: "#fbf236",
    align: "center",
    backgroundColor: "#3f3f74"
  };

  Phaser.GameObjects.Text.call(this, scene, 0, 0, '', style);
  this.setOrigin(0.5, 1);
};

ChatText.prototype = Object.create(Phaser.GameObjects.Text.prototype);
ChatText.prototype.constructor = ChatText;

ChatText.prototype.showText = function(x, y, text) {
  this.setText(text);
  this.setPosition(x, y);
  this.setActive(true);
  this.setVisible(true);

  this.scene.time.delayedCall(1000 + text.length * 400, function() {
    this.setActive(false);
    this.setVisible(false);
  }, null, this);
};

/*var ChatText = new Phaser.Class({

  Extends: Phaser.GameObjects.Text,

  initialize:

  function ChatText(scene) {

    var style = {
      font: "16px 'Conv_ladybug px'",
      fill: "#0xfbf236",
      wordWrap: true,
      wordWrapWidth: 96,
      align: "center",
      backgroundColor: "#fff"
    };

    Phaser.GameObjects.Text.call(this, scene, 0, 0, 'test text', style);
  },
  showText: function(x, y, text) {
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);
  }

});*/
