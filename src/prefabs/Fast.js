// Fast prefab
class Fast extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene, displayList, updateList
        this.points = pointValue;   // store pointValue
    }

    update() {
        // move spaceship left
        this.x -= game.settings.spaceshipSpeed+3;
        // wraparound from left to right edge
        if (this.x <= 80-this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width-80;
    }
}