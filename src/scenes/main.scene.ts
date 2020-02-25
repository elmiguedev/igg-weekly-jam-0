import * as Phaser from "phaser";

export default class MainScene extends Phaser.Scene {

    // properties 
    // ----------------------

    private ant: Phaser.GameObjects.Sprite;
    private keys: any;

    // constructor 
    // ----------------------


    constructor() {
        super({
            key: "MainScene"
        })
    }

    // methods 
    // ----------------------

    init() {
        // set background
        this.cameras.main.setBackgroundColor("#97DE90");

        this.createGrass();
        this.createKeys();
        this.createAnt();
    }

    createAnt() {
        this.anims.create({
            key: "ant_walk",
            frames: this.anims.generateFrameNames("tiles", { start: 4, end: 5 }),
            frameRate: 20
        });
        const x = this.game.canvas.width / 2;
        const y = this.game.canvas.height / 2;
        this.ant = this.add.sprite(x, y, "tiles", 4);

        this.cameras.main.startFollow(this.ant);
    }

    createKeys() {
        this.keys = {
            up: this.input.keyboard.addKey("up"),
            down: this.input.keyboard.addKey("down"),
            left: this.input.keyboard.addKey("left"),
            right: this.input.keyboard.addKey("right"),
        }
    }

    createGrass() {
        for (let i = 0; i < 20; i++) {
            const x = Phaser.Math.Between(20, 300);
            const y = Phaser.Math.Between(20, 180);
            this.add.image(x, y, "grass");
        }
    }

    update() {
        if (this.keys.up.isDown) {
            this.ant.y -= 1;
            this.ant.anims.play("ant_walk", true);
        }
        if (this.keys.down.isDown) {
            this.ant.y += 1;
            this.ant.anims.play("ant_walk", true);

        }
        if (this.keys.left.isDown) {
            this.ant.x -= 1;
            this.ant.anims.play("ant_walk", true);

        }
        if (this.keys.right.isDown) {
            this.ant.x += 1;
            this.ant.anims.play("ant_walk", true);

        }
    }

}