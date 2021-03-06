var PaletteScene = function() {


  Phaser.Scene.call(this, { key: 'palette' });
};

PaletteScene.prototype = Object.create(Phaser.Scene.prototype);
PaletteScene.prototype.constructor = PaletteScene;

PaletteScene.prototype.preload = function() {

  this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
};

PaletteScene.prototype.create = function() {

  var colors = [
    0x000000, 0x222034, 0x45283c, 0x663931, 0x8f563b, 0xdf7126,
    0xd9a066, 0xeec39a, 0xfbf236, 0x99e550, 0x6abe30, 0x37946e,
    0x4b692f, 0x524b24, 0x323c39, 0x3f3f74, 0x306082, 0x5b6ee1,
    0x639bff, 0x5fcde4, 0xcbdbfc, 0xffffff, 0x9badb7, 0x847e87,
    0x696a6a, 0x595652, 0x76428a, 0xac3232, 0xd96763, 0xd77bba,
    0x8f974a, 0x8a6f30
  ];

  function setTint(pointer) {
      g_game.tint = this.custTint;

      for (var i = 0; i < g_game.selectTiles.length; i++) {
        g_game.selectTiles[i].tint = 0x000000;
      }

      g_game.selectTiles[this.custSelected].tint = 0xffffff;
  }

  g_game.selectTiles = [];

  for (var i = 0; i < colors.length; i++) {

    var x = this.sys.game.scale.gameSize.width - 32*(1 + i%2);
    var y = 24 + Math.floor(i / 2) * 32;

    var selection = this.add.image(x, y, 'selection');
    selection.tint = 0x000000;

    g_game.selectTiles.push(selection);

    var tile = this.add.image(x, y, 'tile')
      .setTint(colors[i])
      .setInteractive()
      .on('pointerdown', setTint);
    tile.custTint = colors[i];
    tile.custSelected = i;

  }

  //g_game.chatForm = this.add.dom(this.sys.game.scale.gameSize.width/2, this.sys.game.scale.gameSize.height - 64).createFromCache('chatForm');
  g_game.chatForm = this.add.rexInputText(
    this.sys.game.scale.gameSize.width/2,
    this.sys.game.scale.gameSize.height - 64,
    512,
    48,
    {
      placeholder: 'chat here',
      backgroundColor: '#cbdbfc',
      color: '#45283c',
      fontFamily: 'Conv_ladybug px',
      fontSize: 20
    }
  );
  g_game.chatForm.alpha = 0;


  var self = this;

  var keyObj = this.input.keyboard.addKey('ENTER');
  keyObj.on('down', function(event) {

    if (g_game.textInputMode) {
      g_game.textInputMode = false;
      g_game.chatForm.alpha = 0;
      g_game.chatForm.setBlur();

      if (g_game.chatForm.text) {
        gameSocket.emit('chat', { x: self.input.activePointer.worldX, y: self.input.activePointer.worldY, message: g_game.chatForm.text });
        g_game.chatForm.setText('');
      }
    }
    else {
      g_game.chatForm.alpha = 1;
      // has to delay for some reason before focus
      g_game.chatForm.scene.time.delayedCall(100, function() {
        this.node.focus();
        // this.setFocus();
      }, null, g_game.chatForm);

      //document.getElementById('chatForm').focus();
      g_game.textInputMode = true;
    }
  });
};
