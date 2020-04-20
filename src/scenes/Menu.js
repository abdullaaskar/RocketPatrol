class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('cover', './assets/Front Title.png');
    }

    create() {

      this.cover = this.add.tileSprite(0,0,640,480,'cover').setOrigin(0,0);

        //menu display
    let menuConfig = {
        fontFamily: 'Papyrus',
        fontSize: '22px',
        backgroundColor: '#632e0d',
        color: '#faf7f5',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
    }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY- textSpacer, 'Archer Simulator', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use L&R arrows to aim & (F) to shoot the arrow', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00ff00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard',menuConfig).setOrigin(0.5);
    
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
    }
}