
var g_game = {
  tint: 0xffffff
};

function initGame() {

  var config = {
    width: 800,
    height: 600,
    scene: [BootScene, PlayScene],
    backgroundColor: 0x333333
  };

  var game = new Phaser.Game(config);

}
