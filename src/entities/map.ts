import * as Phaser from "phaser";

export default class Map {

    // props
    // -------------------
    private mainScene: Phaser.Scene;
    private mapKey: string;
    private mapLayers: {
        map: Phaser.Tilemaps.Tilemap,
        background: Phaser.Tilemaps.StaticTilemapLayer,
        obstacles: Phaser.Tilemaps.StaticTilemapLayer,
        overlayer: Phaser.Tilemaps.StaticTilemapLayer,
    };


    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, mapKey: string) {
        this.mainScene = scene;
        this.init();
    }

    // game methods
    // -------------------

    init() {
        const map = this.mainScene.make.tilemap({ key: this.mapKey });
        const tileset = map.addTilesetImage("map_tiles", "map_tiles", 8, 8, 0, 0);
        const background = map.createStaticLayer("background", tileset, 0, 0);
        const obstacles = map.createStaticLayer("obstacles", tileset, 0, 0).setDepth(5);
        const overlayer = map.createStaticLayer("overlayer", tileset, 0, 0).setDepth(10);

        this.mapLayers = {
            map: map,
            background: background,
            obstacles: obstacles,
            overlayer: overlayer,
        }
    }

    update() {

    }


    // methods
    // -------------------






}