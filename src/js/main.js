
var g_game = {
  tint: 0xffffff
};

function initGame() {

  var config = {
    parent: 'gameDiv',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [BootScene, SplashScene, PlayScene, PaletteScene],
    backgroundColor: 0x333333,
    dom: {
      createContainer: true
    }
  };

  var game = new Phaser.Game(config);

}
