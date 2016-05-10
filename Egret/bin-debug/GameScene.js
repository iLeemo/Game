/**
 *
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.goodFood = new eui.Image();
        this.badFood = new eui.Image();
        this.people = new eui.Image();
        //public resultText:eui.BitmapLabel = new eui.BitmapLabel();
        this.resultText = new eui.Label();
        //public resultText:egret.TextField = new egret.TextField();
        this.touchBtn = new eui.Image();
        //share按钮
        this.share = new eui.Image();
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.gameScene = function () {
        //var bgImg:eui.Image = new eui.Image();
        //bgImg.source = "resource/assets/bg.jpg";
        //this.addChild(bgImg);
        var bgimg = new eui.Image();
        bgimg.source = RES.getRes("bg_png");
        this.position = RES.getRes("gameConfig_json");
        bgimg.horizontalCenter = this.position._logo.horcenter;
        this.addChild(bgimg);
        var items = new eui.Image();
        items.source = RES.getRes("items_png");
        //items.source = "resource/assets/items.png";
        this.addChild(items);
        items.bottom = this.position._items.bottom;
        items.horizontalCenter = this.position._items.horcenter;
        var title = new eui.Image();
        title.source = RES.getRes("slogan_png");
        title.bottom = items.bottom + this.position._title.bottom;
        this.addChild(title);
        this.glowbackImg = RES.getRes("glowback_png");
        this.glowbackConfig = RES.getRes("glowback_json");
        this.glowbackSystem = new particle.GravityParticleSystem(this.glowbackImg, this.glowbackConfig);
        this.glowbackSystem.x = 100;
        this.glowbackSystem.y = 100;
        this.addChild(this.glowbackSystem);
        this.people.source = RES.getRes("normal_png");
        //this.people.source = "resource/assets/normal.png";
        this.people.bottom = items.bottom + this.position._people.bottom;
        this.people.horizontalCenter = this.position._people.horcenter;
        this.addChild(this.people);
        console.log("窗口大小为" + window.screen.height);
        //people.verticalCenter = (-window.screen.height*0.2);	
        console.log(items.bottom);
        this.swapChildren(this.people, items);
        this.swapChildren(items, title);
        var food = new eui.Image();
        food.source = RES.getRes("food_png");
        //food.source = "resource/assets/food.png";
        this.addChild(food);
        food.bottom = items.bottom + this.position._food.bottom;
        food.horizontalCenter = this.position._food.horcenter;
        this.goodFood.source = RES.getRes("goodfood_png"); //坑爹啊，找不到也不报错..
        //this.goodFood.source = "resource/assets/goodfood.png";
        this.addChild(this.goodFood);
        this.goodFood.bottom = food.bottom; //+22是为了解决bread边缘问题，此处可以把外围设置透明，就解决了多一块问题
        this.goodFood.horizontalCenter = food.horizontalCenter; //同上
        this.badFood.source = RES.getRes("badfood_png");
        //this.badFood.source = "resource/assets/badfood.png";
        this.addChild(this.badFood);
        this.badFood.bottom = food.bottom; //+22是为了解决bread边缘问题，此处可以把外围设置透明，就解决了多一块问题
        this.badFood.horizontalCenter = food.horizontalCenter; //同上
        this.goodFood.alpha = 0;
        this.badFood.alpha = 0;
        //this.resultText.font = RES.getRes("GameFont_fnt");
        this.resultText.bottom = this.position._resultText.bottom;
        this.resultText.width = this.position._resultText.width;
        this.resultText.lineSpacing = this.position._resultText.lineSpacing;
        this.resultText.textAlign = this.position._resultText.textAlign;
        this.resultText.text = this.position._resultText.text;
        this.resultText.textColor = this.position._resultText.textColor;
        this.resultText.horizontalCenter = this.position._resultText.horcenter;
        this.addChild(this.resultText);
        //点击按钮
        this.touchBtn.source = RES.getRes("button_png");
        //this.touchBtn.source = "resource/assets/button.png"
        this.touchBtn.touchEnabled = true;
        this.touchBtn.bottom = this.position._touchBtn.bottom;
        this.touchBtn.horizontalCenter = this.position._touchBtn.horcenter;
        this.addChild(this.touchBtn);
        var logo = new eui.Image();
        logo.source = RES.getRes("logo_png");
        //logo.source = "resource/assets/logo.png"
        logo.top = this.position._logo.top;
        logo.left = this.position._logo.left;
        this.addChild(logo);
        /*粒子实验
        var texure = RES.getRes("snow_png");
        var config = RES.getRes("snow_json");
        var system = new particle.GravityParticleSystem(texure,config);
        this.addChild(system);
        system.start();
        */
        this.glowfront_3Img = RES.getRes("glowfront_3_png");
        this.glowfront_3Config = RES.getRes("glowfront_3_json");
        this.glowfront_3System = new particle.GravityParticleSystem(this.glowfront_3Img, this.glowfront_3Config);
        this.glowfront_3System.x = 100;
        this.glowfront_3System.y = 100;
        this.addChild(this.glowfront_3System);
        this.glowfront_2Img = RES.getRes("glowfront_2_png");
        this.glowfront_2Config = RES.getRes("glowfront_2_json");
        this.glowfront_2System = new particle.GravityParticleSystem(this.glowfront_2Img, this.glowfront_2Config);
        this.glowfront_2System.x = 100;
        this.glowfront_2System.y = 100;
        this.addChild(this.glowfront_2System);
        this.glowfront_1Img = RES.getRes("glowfront_1_png");
        this.glowfront_1Config = RES.getRes("glowfront_1_json");
        this.glowfront_1System = new particle.GravityParticleSystem(this.glowfront_1Img, this.glowfront_1Config);
        this.glowfront_1System.x = 100;
        this.glowfront_1System.y = 100;
        this.addChild(this.glowfront_1System);
        this.fireImg = RES.getRes("fireImg_png");
        this.fireConfig = RES.getRes("fireConfig_json");
        this.fireSystem = new particle.GravityParticleSystem(this.fireImg, this.fireConfig);
        this.fireSystem.x = 150;
        this.fireSystem.y = 400;
        this.addChild(this.fireSystem);
    };
    ;
    p.ShareButton = function () {
        this.share.source = RES.getRes("share_png");
        //this.share.source = "resource/assets/share.png"
        this.share.top = this.position._share.top;
        this.share.right = this.position._share.right;
        this.share.name = "share";
        this.share.alpha = 0;
        this.addChild(this.share);
        egret.Tween.get(this.share).to({ alpha: 1 }, 200, egret.Ease.circIn);
    };
    return GameScene;
}(eui.UILayer));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map