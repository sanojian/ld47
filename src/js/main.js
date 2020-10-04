
var g_game = {
  tint: 0xffffff
};

function initGame() {

  var config = {
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [BootScene, PlayScene, PaletteScene],
    backgroundColor: 0x333333
  };

  var game = new Phaser.Game(config);

}
