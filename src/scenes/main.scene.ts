import * as Phaser from "phaser";

import Ant from "../entities/ant";
import AntHud from "../entities/ant.hud";
import Rock from "../entities/rock";
import AcidParticle from "../entities/acid.particle";
import Anthill from "../entities/anthill";
import RedAnt from "../entities/redant";

export default class MainScene extends Phaser.Scene {

    // properties 
    // ----------------------

    private ant: Ant;
    private keys: any;
    private mapLayers: {
        map: Phaser.Tilemaps.Tilemap,
        background: Phaser.Tilemaps.StaticTilemapLayer,
        obstacles: Phaser.Tilemaps.StaticTilemapLayer,
        overlayer: Phaser.Tilemaps.StaticTilemapLayer,
        objects: Phaser.Tilemaps.ObjectLayer,
    };

    private playerCamera: any;
    private hud: AntHud;
    private rocks: Phaser.Physics.Arcade.Group;
    private redAntsGroup: Phaser.Physics.Arcade.Group;


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
        this.createMap();
        this.createKeys();
        this.createAnt();
        this.configureCamera();
        this.createHud();

        this.createRocks();
        this.createAnthills();

        this.createCollisions();
    }

    createHud() {
        this.hud = new AntHud(this);
        this.hud.update(this.ant);
    }

    createMap() {
        const map = this.make.tilemap({ key: "l_1" });
        const tileset = map.addTilesetImage("map_tiles", "map_tiles", 8, 8, 0, 0);
        const background = map.createStaticLayer("background", tileset, 0, 0);
        const obstacles = map.createStaticLayer("obstacles", tileset, 0, 0).setDepth(5);
        const overlayer = map.createStaticLayer("overlayer", tileset, 0, 0).setDepth(10);
        const objects = map.getObjectLayer("objects");


        this.mapLayers = {
            map: map,
            background: background,
            obstacles: obstacles,
            overlayer: overlayer,
            objects: objects
        }
    }

    createCollisions() {
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.physics.world.bounds.width = this.mapLayers.background.width;
        this.physics.world.bounds.height = this.mapLayers.background.height;
        this.mapLayers.obstacles.setCollisionByProperty({
            collides: true
        })
        this.physics.add.collider(this.ant, this.mapLayers.obstacles);
        this.physics.add.collider(this.ant.acid, this.mapLayers.obstacles, (a: AcidParticle, o) => {
            a.hit();
        })

        this.physics.add.collider(this.ant, this.rocks);
        this.physics.add.collider(this.ant.acid, this.rocks, (a: AcidParticle, r: Rock) => {
            a.hit();
            r.hit();
        })

        this.physics.add.collider(this.redAntsGroup, this.mapLayers.obstacles);
        this.physics.world.on('worldbounds', (body) => {
            if (body.gameObject instanceof RedAnt) {
                body.gameObject.kill();
            }
        });

    }


    configureCamera() {
        // this is a fix for tiles jitter
        this.playerCamera = new Phaser.Geom.Point(this.ant.x, this.ant.y);
        this.cameras.main.startFollow(this.playerCamera);
        this.cameras.main.setBounds(
            0,
            0,
            this.mapLayers.map.widthInPixels,
            this.mapLayers.map.heightInPixels
        );
    }

    createAnt() {

        // change with map checkpoint
        const x = this.mapLayers.map.widthInPixels / 2;
        const y = this.mapLayers.map.heightInPixels - 8;

        this.ant = new Ant(this);
        this.ant.setPosition(x, y);
    }

    createKeys() {
        this.keys = {
            up: this.input.keyboard.addKey("up"),
            down: this.input.keyboard.addKey("down"),
            left: this.input.keyboard.addKey("left"),
            right: this.input.keyboard.addKey("right"),
            space: this.input.keyboard.addKey("space")
        }
    }

    createGrass() {
        for (let i = 0; i < 20; i++) {
            const x = Phaser.Math.Between(20, 300);
            const y = Phaser.Math.Between(20, 180);
            this.add.image(x, y, "grass");
        }
    }

    createRocks() {
        this.rocks = this.physics.add.group({
            maxSize: 20,
            classType: Rock,
            immovable: true
        });
        // r.setImmovable(true);
        const r1 = new Rock(this).setVisible(true).setActive(true).setPosition(20, 740);
        const r2 = new Rock(this).setVisible(true).setActive(true).setPosition(30, 740);
        const r3 = new Rock(this).setVisible(true).setActive(true).setPosition(25, 750);

        this.rocks.addMultiple([r1, r2, r3]);
    }

    createAnthills() {
        this.redAntsGroup = this.physics.add.group({
            classType: RedAnt,
            maxSize: 50,
            collideWorldBounds: true
        });
        for (let i = 0; i < 50; i++) {
            const a = new RedAnt(this);
            a.kill();
            this.redAntsGroup.add(a);
        }
        const anthillsTiles = this.mapLayers.objects.objects.filter(o => o.type == "anthill");
        for (let i = 0; i < anthillsTiles.length; i++) {
            const a = new Anthill(this, this.redAntsGroup);
            a.setPosition(anthillsTiles[i].x, anthillsTiles[i].y);
        }
    }

    // update methods
    // -----------------------------


    update() {
        this.checkCamera();
        this.checkInput();
        this.hud.update(this.ant);
        //    this.checkDebugInfo();
    }

    checkInput() {
        if (this.keys.up.isDown) {
            this.ant.move("up");
        } else if (this.keys.down.isDown) {
            this.ant.move("down");
        } else {
            this.ant.stop("vertical");
        }

        if (this.keys.left.isDown) {
            this.ant.move("left");
        } else if (this.keys.right.isDown) {
            this.ant.move("right");
        } else {
            this.ant.stop("horizontal");
        }

        if (this.keys.space.isDown) {
            this.ant.throwAcid();

        }
    }

    checkCamera() {
        this.playerCamera.x = Math.floor(this.ant.x);
        this.playerCamera.y = Math.floor(this.ant.y);
    }

    checkDebugInfo() {
        this.hud.setValue("ant x", this.ant.x.toString());
        this.hud.setValue("ant y", this.ant.y.toString());
    }

}