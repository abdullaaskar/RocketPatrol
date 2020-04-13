class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprite
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
    }

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);

        //white rectangle borders
        this.add.rectangle(6,7,628,21,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(6,450,629,21,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(6,110,21,351,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(614,110,21,351,0xFFFFFF).setOrigin(0,0);
        //green UI background
        this.add.rectangle(37,42,566,60,0x00FF00).setOrigin(0,0);
    }

    update(){
        //scroll starfield
        this.starfield.tilePositionX -= 4;      
    }
}