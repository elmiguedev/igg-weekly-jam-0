import * as Phaser from "phaser";

export default class Hud {

    protected mainScene: Phaser.Scene;
    private hudScene: Phaser.Scene;
    private labels = {};
    constructor(scene:Phaser.Scene) {
        this.mainScene = scene;
        this.init();
    }

    init() {
        this.hudScene = new Phaser.Scene({key: "HudScene"});
        this.mainScene.scene.add("HudScene",this.hudScene,true);

        var config:Phaser.Types.GameObjects.BitmapText.RetroFontConfig = {
            "offset.x":0,
            "offset.y":0,
            "spacing.x": 0,
            "spacing.y": 0,
            lineSpacing: 1,
            charsPerRow: 91,
            image: 'namco_font',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
        };

        this.hudScene.cache.bitmapFont.add('namco_font', Phaser.GameObjects.RetroFont.Parse(this.hudScene, config));


    }

    addText(key:string, x:number, y:number) {
        const label = this.hudScene.add.bitmapText(x,y,"namco_font", key + ": ",6);
        this.labels[key] = label;
    }

    setValue(key:string, value:string) {
        this.labels[key].setText(key + ": " + value);
    }


}