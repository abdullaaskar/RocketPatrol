class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprite
        this.load.image('rocket', './assets/bullet.png');
        this.load.image('fast', './assets/fast.png');
        this.load.image('spaceship', './assets/target.png');
        this.load.image('starfield', './assets/grass.png');
        this.load.image('archer', './assets/jian.png');
        this.load.image('top', './assets/top.png');
        this.load.image('rightedge', './assets/right.png');
        this.load.image('leftedge', './assets/left.png');
        this.load.image('clock', './assets/clock.png');
        this.load.image('pointmark', './assets/pointmark.png');
        this.load.audio('bcmusic', './assets/bgmusic.mp3');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);
        this.archer = this.add.tileSprite(20,430,600,60,'archer').setOrigin(0,0);
        this.top = this.add.tileSprite(0,0,640,40,'top').setOrigin(0,0);
        this.rightedge = this.add.tileSprite(600,0,40,480,'rightedge').setOrigin(0,0);
        this.leftedge = this.add.tileSprite(0,0,40,480,'leftedge').setOrigin(0,0);
        this.clock = this.add.tileSprite(450,44,50,50,'clock').setOrigin(0,0);
        
        //add background music
        this.sound.play('bcmusic');


        //add rocket (p1)
        this.p1Rocket = new Rocket(this,game.config.width/2, 431, 'rocket').setOrigin(0,0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width - 80, 150, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width - 186, 210, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width - 282, 282, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship04 = new Fast(this, game.config.width - 80, 100, 'fast', 0, 50).setScale(0.8,0.7).setOrigin(0,0);
     
    
        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        //animation config 
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion',{ start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //score
        this.p1Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '22px',
            backgroundColor: '#e0e0e0',
            color: '#242121',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69,54,this.p1Score, scoreConfig);
        this.pointmark = this.add.tileSprite(70,50,40,40,'pointmark').setOrigin(0,0);
        

        //game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64,'(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //create a timer on screen 

        this.onscreenTimer = this.add.text(531, 54, '', scoreConfig).setOrigin(1,0);
        this.onscreenTimer.text = game.settings.gameTimer/1000;

        var timer = this.time.addEvent({
            delay: 800,
            callback:this.isTiming,
            callbackScope: this,
            repeat:(game.settings.gameTimer/1000)-1
        });
    }

    update(){
        
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.restart(this.p1Score);
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        
        //scroll starfield
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver){ 
        //update rocket
            this.p1Rocket.update();
        // update spaceships (x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        
    // check collisions
    if(this.checkCollision(this.p1Rocket, this.ship04)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship04);
    }
    if(this.checkCollision(this.p1Rocket, this.ship03)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship03);
    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship01);
    }


    }
    



    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship){
        ship.alpha = 0;  //temporarily hide ship
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');  //play explode animation
        boom.on('animationcomplete',() => { // callback after animation completes
            ship.reset(); // reset ship position
            ship.alpha = 1; // make ship visible again
            boom.destroy(); // remove explosion sprite
        });
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }

    isTiming(){
        this.onscreenTimer.text--;
    }
}