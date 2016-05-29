/**
 *
 * @author 李源哲
 *
 */
class GameScene extends eui.UILayer {
    public constructor() {
        super();
    }


    public goodFood: eui.Image = new eui.Image();
    public badFood: eui.Image = new eui.Image();
    public people: eui.Image = new eui.Image();
    public position;
    
    /*粒子系统定义
    public glowbackImg;
    public glowbackConfig;
    public glowbackSystem: particle.GravityParticleSystem;
    //1是最前面，对应前，2对应中2 ，3对应中。
    public glowfront_1Img;
    public glowfront_1Config;
    public glowfront_1System: particle.GravityParticleSystem;

    public glowfront_2Img;
    public glowfront_2Config;
    public glowfront_2System: particle.GravityParticleSystem;

    public glowfront_3Img;
    public glowfront_3Config;
    public glowfront_3System: particle.GravityParticleSystem;
    
    public starImg;
    public starConfig;
    public starSystem: particle.GravityParticleSystem;
    */
    
    public fireImg;
    public fireConfig;
    public fireSystem: particle.GravityParticleSystem;
    
    //public resultText:eui.BitmapLabel = new eui.BitmapLabel();
    public resultText: eui.Label = new eui.Label();
    //public resultText:egret.TextField = new egret.TextField();
    public touchBtn: eui.Image = new eui.Image();
    public bgimg: eui.Image = new eui.Image();
    public blackline: eui.Image = new eui.Image;
    public tryAgainImg: eui.Image = new eui.Image();
    public logo: eui.Image = new eui.Image();
    public gameScene() {
        //var bgImg:eui.Image = new eui.Image();
        //bgImg.source = "resource/assets/bg.jpg";
        //this.addChild(bgImg);
        
        

        this.bgimg.source = RES.getRes("bg_jpg");
        this.position = RES.getRes("gameConfig_json");
        this.bgimg.horizontalCenter = this.position._logo.horcenter;
        this.addChild(this.bgimg);
        
        this.blackline.source = RES.getRes("blackline_png");
        this.addChild(this.blackline);
        this.blackline.visible = false;


        var items: eui.Image = new eui.Image();
        items.source = RES.getRes("items_png");
        //items.source = "resource/assets/items.png";
        this.addChild(items);
        items.bottom = this.position._items.bottom;
        items.horizontalCenter = this.position._items.horcenter;

        var title: eui.Image = new eui.Image();
        title.source = RES.getRes("slogan_png");
        title.bottom = items.bottom + this.position._title.bottom;
        title.horizontalCenter =this.position._title.horcenter;
        this.addChild(title);

        //this.glowbackImg = RES.getRes("glowback_png");
        //this.glowbackConfig = RES.getRes("glowback_json");
        //this.glowbackSystem = new particle.GravityParticleSystem(this.glowbackImg, this.glowbackConfig);
        //this.glowbackSystem.x = 100;
        //this.glowbackSystem.y = 100;
        //this.addChild(this.glowbackSystem);

        this.people.source = RES.getRes("normal_png")
        this.people.alpha = 1;
        //this.people.source = "resource/assets/normal.png";
        this.people.bottom = items.bottom + this.position._people.bottom;
        this.people.horizontalCenter = this.position._people.horcenter;
        this.addChild(this.people);
        console.log("窗口大小为" + window.screen.height);
        //people.verticalCenter = (-window.screen.height*0.2);	
        console.log(items.bottom);

        this.swapChildren(this.people, items);
        this.swapChildren(items, title);

        var food: eui.Image = new eui.Image();
        food.source = RES.getRes("food_png");
        //food.source = "resource/assets/food.png";
        this.addChild(food);
        food.bottom = items.bottom + this.position._food.bottom;
        food.horizontalCenter = this.position._food.horcenter;

        this.goodFood.source = RES.getRes("goodfood_png");//坑爹啊，找不到也不报错..
        //this.goodFood.source = "resource/assets/goodfood.png";
        this.addChild(this.goodFood);
        this.goodFood.bottom = food.bottom; //+22是为了解决bread边缘问题，此处可以把外围设置透明，就解决了多一块问题
        this.goodFood.horizontalCenter = food.horizontalCenter;//同上

        this.badFood.source = RES.getRes("badfood_png");
        //this.badFood.source = "resource/assets/badfood.png";
        this.addChild(this.badFood);
        this.badFood.bottom = food.bottom; //+22是为了解决bread边缘问题，此处可以把外围设置透明，就解决了多一块问题
        this.badFood.horizontalCenter = food.horizontalCenter;//同上
        this.goodFood.alpha = 0;
        this.badFood.alpha = 0;
        
        //游戏结果判断文字
        //this.resultText.font = RES.getRes("GameFont_fnt");取消位图字体
        this.resultText.bottom = this.position._resultText.bottom;
        this.resultText.width = this.position._resultText.width;
        this.resultText.lineSpacing = this.position._resultText.lineSpacing;
        this.resultText.textAlign = this.position._resultText.textAlign;
        this.resultText.text = this.position._resultText.text;
        this.resultText.textColor = this.position._resultText.textColor;
        this.resultText.horizontalCenter = this.position._resultText.horcenter;
        this.resultText.lineSpacing = 10;
        this.addChild(this.resultText);

        //点击按钮
        this.touchBtn.source = RES.getRes("button_png");
        //this.touchBtn.source = "resource/assets/button.png"
        this.touchBtn.touchEnabled = true;
        this.touchBtn.bottom = this.position._touchBtn.bottom;
        this.touchBtn.horizontalCenter = this.position._touchBtn.horcenter;
        this.addChild(this.touchBtn);
        
        //Logo

        this.logo.source = RES.getRes("logo_png");
        //logo.source = "resource/assets/logo.png"
        this.logo.top = this.position._logo.top;
        this.logo.left = this.position._logo.left;
        this.addChild(this.logo);
        
        this.tryAgainImg.source = RES.getRes("again_png");
        this.tryAgainImg.bottom = this.position._again.bottom;
        this.tryAgainImg.horizontalCenter = this.position._again.horcenter;
        this.addChild(this.tryAgainImg);
        this.tryAgainImg.visible = false;
        //火焰粒子
        this.fireImg = RES.getRes("fireImg_png");
        this.fireConfig = RES.getRes("fireConfig_json");
        this.fireSystem = new particle.GravityParticleSystem(this.fireImg,this.fireConfig);
        this.fireSystem.x = 150;
        this.fireSystem.y = 400;
        this.addChild(this.fireSystem);
        
        /*粒子实验
        var texure = RES.getRes("snow_png");
        var config = RES.getRes("snow_json");
        var system = new particle.GravityParticleSystem(texure,config);
        this.addChild(system);
        system.start();
        */


/*取消粒子
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
        
        this.starImg = RES.getRes("star_png");
        this.starConfig = RES.getRes("star_json");
        this.starSystem = new particle.GravityParticleSystem(this.starImg, this.starConfig);
        var starX = window.screen.width - this.starSystem.width >> 1;
        
        //this.starSystem.y = 100;
        this.addChild(this.starSystem);
        
取消粒子*/




    }

    //share按钮
    public share: eui.Image = new eui.Image();
    public ShareButton() {
        this.share.source = RES.getRes("share_png");
        //this.share.source = "resource/assets/share.png"
        this.share.top = this.position._share.top;
        this.share.right = this.position._share.right;
        this.share.name = "share";
        this.share.alpha = 0;
        this.addChild(this.share);
        egret.Tween.get(this.share).to({ alpha: 1 }, 200, egret.Ease.circIn);
    }

    //黑色LOGO
    public blacklogo: eui.Image = new eui.Image();
    public BlackLogo() {
        this.blacklogo.source = RES.getRes("blacklogo_png");
        //this.share.source = "resource/assets/share.png"
        this.blacklogo.top = this.position._logo.top;
        this.blacklogo.left = this.position._logo.left;
        //this.blacklogo.name = "share";
        this.blacklogo.alpha = 0;
        this.addChild(this.blacklogo);
        this.blacklogo.visible = true;
        egret.Tween.get(this.blacklogo).to({ alpha: 1 },200,egret.Ease.circIn);
    }
    

}
