/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

class SimpleGame {

    private game: Phaser.Game;
    private background: Phaser.Sprite;
    private player: Phaser.Sprite;


    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }
    preload() {
        this.game.load.atlasJSONArray('chlapec', './media/chlapec.png', './media/chlapec.json');
        this.game.load.image('city', './media/city-4.png')
    }

    create() {
        let game = this.game;

        this.background = game.add.sprite(0, 150, 'city');
        this.background.height = game.world.height / 1.5;
        // this.background.width = 2 * game.world.width;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.time.desiredFps = 30;

        this.player = game.add.sprite(game.world.centerX, this.game.world.height - 164,'chlapec');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.animations.add('run');
        this.player.animations.play('run', 20, true);

    }

}

let game: SimpleGame;

if(document.readyState === 'complete') {
  game = new SimpleGame();
} else {
  window.addEventListener('load', () => {
    game = new SimpleGame();
  });
}