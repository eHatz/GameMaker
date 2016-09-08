var game = new Phaser.Game(640, 480, Phaser.AUTO, 'something', GameState);
var cursors;
var map;
var coins;

var layer;
var player;
var GameState = {
	preload : function(){
		game.load.tilemap('theMap', 'assets/newMap.json', null, Phaser.Tilemap.TILED_JSON);

		game.load.image('background', 'assets/images/sky.png'); //load the images to be used and give them a key to be called
		game.load.image('star', 'assets/images/star.png');
		
		game.load.image('tileset', 'assets/images/tileset.png');
		game.load.spritesheet('player', 'assets/images/dude.png', 32, 48);
	},
	create: function() { 
		map = game.add.tilemap('theMap');
		map.addTilesetImage('tileset', 'tileset');
		map.setCollisionBetween(1, 12);

		layer = map.createLayer('Tile Layer 1');
		
		layer.resizeWorld();

		game.physics.startSystem(Phaser.Physics.ARCADE);
		//this.background = this.game.add.sprite(0,0, 'background'); //sets the sky.png as the background image
		// this.star = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'star'); //centers star sprite in the middle of the game

		// this.star.anchor.setTo(0.5); //changes anchor point to the center of the image
		// this.star.scale.setTo(3); //triples the size of the star sprite
		// //this.star.scale.setTo(3, -3) //flip image on x or y by setting x,y to - number
		// this.star.angle = 90; //rotates image around anchor point

		player = game.add.sprite(260, 100, 'player');
		player.anchor.set(0.5);

		game.physics.arcade.enable(player);

		player.body.setSize(32, 32, 0, 0);
		player.body.maxAngular = 500;

		player.body.angularDrag = 50;

		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);

		game.camera.follow(player);
		//this.physics.enable(this.player, Phaser.Physics.ARCADE);
		// this.game.camera.follow(this.player) // camera follows player sprite

		//this.cursors = this.input.keyboard.createCursorKeys();
		cursors = game.input.keyboard.createCursorKeys();
	},
	update: function() {
		game.physics.arcade.collide(player, layer);
		// this.star.angle += 50 //makes object constantly rotate
		// this.player.body.velocity.x = 0;
		// this.player.body.velocity.y = 0;
		player.body.velocity.x = 0;
    	player.body.velocity.y = 0;
    	player.body.angularVelocity = 0;
		if(cursors.left.isDown) {
			player.body.velocity.x = -200;
			player.animations.play('left');
		};
		if(cursors.right.isDown) {
			player.body.velocity.x = 200;
			player.animations.play('right');
		};
		if(cursors.up.isDown) {
			player.body.velocity.y = -200;
		};
		if(cursors.down.isDown) {
			player.body.velocity.y = 200;
		}
		if(cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp) {
			player.animations.stop();
			player.frame = 4;
		}
	}
};

game.state.add('GameState', GameState);

game.state.start('GameState');
