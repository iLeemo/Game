

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    /**
     * 创建场景界面
     * Create scene interface
     */
    private board: GameScene = new GameScene();
    private uiLayer:eui.UILayer;
    private startCreateScene(): void {
    
        console.log("舞台大小为"+this.stage.stageHeight);
        this.board.gameScene();
        this.addChild(this.board);
        this.board.breadmask.alpha =0;
        this.board.touchEnabled = true;
        this.board.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
        this.board.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        
    }
    
    private createBitmapByName(name: string): egret.Bitmap
    {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private onButtonClick(e: egret.TouchEvent) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
    
    private touchStart:number;
    private touchBegin(e:egret.TouchEvent){
        this.touchStart = egret.getTimer();
        console.log("触摸开始"+this.touchStart);
        this.board.breadmask.alpha = 0;
        egret.Tween.get(this.board.breadmask).to({ alpha: 1 },6000,egret.Ease.circIn);
    }
    
    private touchTime:number;
    private touchEnd(e:egret.TouchEvent){
        this.touchTime = egret.getTimer()-this.touchStart;
        egret.Tween.pauseTweens(this.board.breadmask);
        //console.log("触摸结束,触摸时间为"+this.touchTime);
        this.gameManager();
    }
    
    private gameManager(){
        switch(true)
        {
            case this.touchTime >= 1000 && this.touchTime < 2000:
                console.log("触摸结束，触摸时间为" + this.touchTime);
                // textField.text = "哎呀,你太心急了，你得到了一个夹生的蛋糕！"
                this.board.boardText.text = "哎呀,你太心急了，锅还没热呢！";
                //this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
                // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime < 1000:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                //this.board.boardText.text = "窗口大小为"+this.board.height;
                this.board.boardText.text = "同学，你在逗我吧..";
               // this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 2000 && this.touchTime < 3000:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                this.board.boardText.text = "你太心急了，面包才刚开始烘焙！";
               // this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 3000 && this.touchTime < 3500:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                this.board.boardText.text = "经过不懈的努力，你获得了五分熟的面包，打败了全国32%的面包师!";
             //   this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
              //  this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 3500 && this.touchTime < 4100:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                this.board.boardText.text = "经过不懈的努力，你获得了六分熟的面包，打败了全国53%的面包师";
             //   this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
              //  this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 4100 && this.touchTime < 4500:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                this.board.boardText.text = "经过不懈的努力，你获得了七分熟的面包，打败了全国60%的面包师";
               // this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 4500 && this.touchTime < 4800:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                this.board.boardText.text = "经过不懈的努力，你获得了八分熟的面包，打败了全国80%的面包师！";
              //  this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 4800 && this.touchTime < 4950:
                console.log("触摸结束,触摸时间不为" + this.touchTime);
                this.board.boardText.text = "天呐！经过不懈的努力，你获得了九分熟的面包，打败了全国90%的面包师！";
               // this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 4950 && this.touchTime < 5050:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                this.board.boardText.text = "简直完美，经过不懈的努力，你获得了色香味俱全的黄金面包，打败了全国99%的面包师！";
               // this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 5050 && this.touchTime < 5300:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                this.board.boardText.text = "经过你不懈的努力，你获得了略微烤糊的面包，超过了全国60%的面包师";
                //this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 5300 && this.touchTime < 6000:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                this.board.boardText.text = "太遗憾了，面包烤的太久了，你获得了烤焦了的面包"
                //this.overText.text = "天呐！世上真的有这样的面包师，你居然做出了品质为10的绝世面包，据说，这种品质的面包已经有1000年没有出世了！";
               // this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 6000:                                //&& this.touchTime < 7000:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                this.board.boardText.text = "糟糕，烤的时间太长了，面包都快被烤成炭了！";
                //this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break; 
        
    }
}
}
