// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      scene.add.existing(this);   // add to existing, displayList, updateList
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
      this.isFiring = false;    //track rocket's firing
    }

    update() {
        //left/right movement
        
        if(keyLEFT.isDown && this.x >= 70){
            this.x -= 2;
        }else if (keyRIGHT.isDown && this.x <= 530){
            this.x += 2;
        }
        
        // fire button (NOT spacebar)
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
        }
        // if fired, move up
        if (this.isFiring && this.y >= 108){
            this.y -= 2;
        }
        //reset on miss
        if (this.y <= 108){
            this.reset();
        }
    }
    //reset rocket to "ground"
    reset(){
        this.isFiring = false;
        this.y = 431;
    }
  }
