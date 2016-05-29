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
    private gameScene: GameScene = new GameScene();
    private uiLayer:eui.UILayer;
    private startCreateScene(): void {
    
        console.log("舞台大小为"+this.stage.stageHeight);
        this.gameScene.gameScene();
        this.addChild(this.gameScene);
        this.gameScene.touchEnabled = true;
        this.gameScene.touchBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
        this.gameScene.touchBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.gameScene.touchBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEnd,this);
        
    }
    
    private createBitmapByName(name: string): egret.Bitmap
    {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


    
    private touchStart:number;
    private touchTime: number;
    private workTimer:egret.Timer = new egret.Timer(3000,1);
   
    private touchBegin(e:egret.TouchEvent){
        this.gameScene.bgimg.source = RES.getRes("bg_jpg");
        this.touchStart = egret.getTimer();
        this.gameScene.people.source = "resource/assets/normal.png";
        this.gameScene.touchBtn.source = RES.getRes("buttonpre_png");
        this.gameScene.resultText.text ="Tip:长按上面的“火”按钮开始烧烤，松开即结束烧烤，注意观察并确定烧烤时间哦。";
        console.log("触摸开始"+this.touchStart);
        this.gameScene.goodFood.alpha = 0;
        this.gameScene.badFood.alpha = 0;
        this.gameScene.blackline.visible = false;
        this.gameScene.blacklogo.alpha = 0;
        this.gameScene.tryAgainImg.visible = false;

        //this.gameScene.glowfront_3System.stop();
        // this.gameScene.glowfront_2System.stop();
        //this.gameScene.glowfront_1System.stop();
        //this.gameScene.glowbackSystem.stop();
        //this.gameScene.starSystem.stop();
        this.workTimer.reset();
        this.gameScene.fireSystem.start();
        if(this.gameScene.getChildByName("share"))
        {
            this.gameScene.removeChild(this.gameScene.share);//要不要检查为空？,哈哈，果然需要
        }
      //  this.gameScene.removeChild(this.gameScene.share);//要不要检查为空？,哈哈，果然需要
     //   this.gameScene.share.
        egret.Tween.get(this.gameScene.goodFood).to({ alpha: 1 },5000,egret.Ease.circIn).call(this.badResult,this);
        
    }

    private timeText:eui.Label = new eui.Label();
    
    private touchEnd(e:egret.TouchEvent){
       this.touchOver();
    }
    
    private touchOver(){
        this.touchTime = egret.getTimer() - this.touchStart;
        egret.Tween.pauseTweens(this.gameScene.goodFood);
        egret.Tween.pauseTweens(this.gameScene.badFood);
        this.gameScene.fireSystem.stop();
        this.gameScene.tryAgainImg.visible = true;
        this.gameScene.touchBtn.source = RES.getRes("button_png");
        this.gameScene.ShareButton();
        //console.log("触摸结束,触摸时间为"+this.touchTime);
        this.gameManager();
        this.workTimer.reset();
    }
    
    private badResult(){
        this.gameScene.badFood.alpha=0;
        egret.Tween.get(this.gameScene.badFood).to({ alpha: 1 },1500,egret.Ease.circIn);
        
        this.workTimer.addEventListener(egret.TimerEvent.TIMER,this.touchOver,this);
        this.workTimer.start();
    }
    

    private gameManager(){
        switch(true)
        {
            
            case this.touchTime < 1000 :
                console.log("触摸结束，触摸时间为" + this.touchTime);
                // textField.text = "哎呀,你太心急了，你得到了一个夹生的蛋糕！"
                //this.gameScene.resultText.text = "哇哦，经过了" + (this.touchTime / 1000).toFixed(2) + "秒，打败了全国" + (this.touchTime / 5000 * 100) + "%"               
                this.gameScene.resultText.textFlow = <Array<egret.ITextElement>>[
                    { text: "同学，你在逗我吧！才开始" },
                    { text: (this.touchTime / 1000).toFixed(2) + "秒",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "，伤心的是，全国还有" },
                    { text: (this.touchTime / 5000 * 100).toFixed(2) + "%",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "的玩家和你一样欺负我。" }
                    
                ]; 
                this.gameScene.people.source = RES.getRes("fail_png");
                
                this.gameScene.bgimg.source = RES.getRes("bg_jpg");
                //this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
                // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;
                
            
            case this.touchTime >= 1000 && this.touchTime < 2000:
                console.log("触摸结束，触摸时间为" + this.touchTime);
                // textField.text = "哎呀,你太心急了，你得到了一个夹生的蛋糕！"
                //this.gameScene.resultText.text = "哇哦，经过了" + (this.touchTime / 1000).toFixed(2) + "秒，打败了全国" + (this.touchTime / 5000 * 100) + "%"               
                this.gameScene.resultText.textFlow = <Array<egret.ITextElement>>[
                    { text: "哎呀，你太心急啦！才开始" },
                    { text: (this.touchTime / 1000).toFixed(2) + "秒",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "，烤架还没热呢！不过别灰心，全国还有" },
                    { text: (this.touchTime / 5000 * 100).toFixed(2) + "%",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "的玩家停留在刚点着火的水平。" }
                ];
                
                //this.gameScene.bgimg.source = RES.getRes("bg_jpg");
                //this.gameScene.resultText.text = "哎呀,你太心急了，火才刚升起来！";
                this.gameScene.people.source = RES.getRes("fail_png");
                //this.gameScene.people.source = "resource/assets/fail.png";
                //this.gameScene.ShareButton();
                //this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
                // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 2000 && this.touchTime < 3000:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                //this.gameScene.resultText.text = "你太心急了，羊排才刚放在烤架上";
                this.gameScene.resultText.textFlow = <Array<egret.ITextElement>>[
                    { text: "还是太心急了！才进行了" },
                    { text: (this.touchTime / 1000).toFixed(2) + "秒",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "，注意观察羊排的样子哦！不过别灰心，全国还有" },
                    { text: (this.touchTime / 5000 * 100).toFixed(2) + "%",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "的玩家和你保持了同一水平。" }
                ];
                //this.gameScene.bgimg.source = RES.getRes("bg_jpg");
                this.gameScene.people.source = RES.getRes("fail_png");
                //this.gameScene.people.source = "resource/assets/fail.png";
                //this.gameScene.ShareButton();
               // this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 3000 && this.touchTime < 4100:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                //this.gameScene.resultText.text = "骚年，不要心急，羊排才烤没多久呢";
                this.gameScene.resultText.textFlow = <Array<egret.ITextElement>>[
                    { text: "真遗憾，马上就好了，你得到了" },
                    { text: "夹生的烤羊排",style: { "textColor": 0xFF5722,"bold": true,"size": 30 } },
                    { text: "，用时" },
                    { text: (this.touchTime / 1000).toFixed(2) + "秒",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "。别灰心，全国有" },
                    { text: (this.touchTime / 5000 * 100).toFixed(2) + "%",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "的玩家在考虑让谁吃下这块夹生的烤羊排！" }
                ];
                //this.gameScene.bgimg.source = RES.getRes("bg_jpg");
                this.gameScene.people.source = RES.getRes("fail_png");
                //this.gameScene.people.source = "resource/assets/fail.png";
               // this.gameScene.ShareButton();
             //   this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
              //  this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            //case this.touchTime >= 3500 && this.touchTime < 4100:
             //   console.log("触摸结束,触摸时间为" + this.touchTime);
             //   this.gameScene.resultText.text = "经过不懈的努力，你获得了六分熟的羊腿，打败了全国53%的面包师";
             //   this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
              //  this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                //break;

            case this.touchTime >= 4100 && this.touchTime < 4600:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                //this.gameScene.resultText.text = "哇哦，经过了"+(this.touchTime/1000).toFixed(2)+"秒，打败了全国"+(this.touchTime/5000*100)+"%";
                //this.gameScene.resultText.text = "哇哦，一番努力后，你获得了六分熟的烤羊排，打败了全国61%的厨师！哪位勇士来尝一下？";
                
                this.gameScene.resultText.textFlow = <Array<egret.ITextElement>>[
                    { text: "哇哦，经过一番努力，你烤出了" },
                    { text: "六分熟的烤羊排",style: { "textColor": 0xFF5722,"bold": true,"size": 30 } },
                    { text: "。用时" },
                    { text: (this.touchTime / 1000).toFixed(2) + "秒",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "，打败了全国" },
                    { text: (this.touchTime / 5000 * 100).toFixed(2) + "%",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "的玩家，继续努力吧！" }
                ];
                this.gameScene.bgimg.source = RES.getRes("bgsuccess_jpg");  
                this.gameScene.people.source = RES.getRes("success_png");
                //this.gameScene.people.source = "resource/assets/success.png";
               // this.gameScene.ShareButton();
               // this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 4600 && this.touchTime < 4850:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                //this.gameScene.resultText.text = "可以呀，一番努力后，你获得了八分熟的羊排，打败了全国83%的厨师！";
                this.gameScene.resultText.textFlow = <Array<egret.ITextElement>>[
                    { text: "可以呀，经过一番努力，你烤出了" },
                    { text: "八分熟的烤羊排",style: { "textColor": 0xFF5722,"bold": true,"size": 30 } },
                    { text: "。用时" },
                    { text: (this.touchTime / 1000).toFixed(2) + "秒",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "，打败了全国" },
                    { text: (this.touchTime / 5000 * 100).toFixed(2) + "%",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "的玩家。进步很快呀！" }
                ];
                this.gameScene.bgimg.source = RES.getRes("bgsuccess_jpg");  
                this.gameScene.people.source = RES.getRes("success_png");
                //this.gameScene.people.source = "resource/assets/success.png";
                //this.gameScene.ShareButton();
              //  this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 4850 && this.touchTime < 4980:
                console.log("触摸结束,触摸时间不为" + this.touchTime);
                //this.gameScene.resultText.text = "太好啦！一番努力后，你获得了九分熟的烤羊排，打败了全国92%的厨师！吃货可以上啦！";
                this.gameScene.resultText.textFlow = <Array<egret.ITextElement>>[
                    { text: "太好啦！经过一番努力，你烤出了" },
                    { text: "九分熟的羊排",style: { "textColor": 0xFF5722,"bold": true,"size": 30 } },
                    { text: "。用时" },
                    { text: (this.touchTime / 1000).toFixed(2) + "秒",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "，打败了全国" },
                    { text: (this.touchTime / 5000 * 100).toFixed(2) + "%",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "的玩家。离完美只差一步，继续挑战吧！" }
                ];
                this.gameScene.bgimg.source = RES.getRes("bgsuccess_jpg");  
                this.gameScene.people.source = RES.getRes("success_png");
                //this.gameScene.people.source = "resource/assets/success.png";
                //this.gameScene.ShareButton();
               // this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;
            //case this.touchTime < 1000:
            case this.touchTime >=4980 && this.touchTime < 5000:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                //this.gameScene.resultText.text = "吃货之神！一番努力后，你获得了色香味俱全的完美黄金烤羊排，打败了全国99%的厨师！赶紧开个烧烤店走向人生巅峰吧";
                this.gameScene.resultText.textFlow = <Array<egret.ITextElement>>[
                    { text: "天呐，吃货之神！你烤出了" },
                    { text: "黄金级完美烤羊排",style: { "textColor": 0xFF5722,"bold": true,"size": 30 } },
                    { text: "，凌驾于全国" },
                    { text: (this.touchTime / 5000 * 100).toFixed(2) + "%",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "的玩家！无论你在做什么，开个烧烤店绝对是你的最佳选择!" }
                ];
               // this.gameScene.logo.visible = false;
                this.gameScene.BlackLogo();
                this.gameScene.bgimg.source = RES.getRes("bgprefect_jpg");  
                this.gameScene.people.source = RES.getRes("prefect_png");
                //this.gameScene.people.source = "resource/assets/prefect.png";
               // this.gameScene.ShareButton();
               // egret.Tween.get(this.gameScene.logo).to({ alpha: 1 },500,egret.Ease.circIn);
               // this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
               // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 5000 && this.touchTime < 5300:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                //this.gameScene.resultText.text = "哎呀，烤太过了，你只得到了烤糊了的羊排";
                this.gameScene.resultText.textFlow = <Array<egret.ITextElement>>[
                    { text: "哎呀，烤太过了，你得到了" },
                    { text: "烤糊的羊排",style: { "textColor": 0xFF5722,"bold": true,"size": 30 } },
                    { text: "，用时" },
                    { text: (this.touchTime / 1000).toFixed(2) + "秒",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "，全国有" },
                    { text: ((this.touchTime - 4000)/ 5000 * 100).toFixed(2) + "%",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "的玩家和你犯了同样的错误！" }
                ];
                //this.gameScene.bgimg.source = RES.getRes("bg_jpg");
                this.gameScene.people.source = RES.getRes("bad_png");
                this.gameScene.blackline.visible = true;
                //this.gameScene.people.source = "resource/assets/bad.png";
                //this.gameScene.ShareButton();
                //this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
                //this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break;

            case this.touchTime >= 5300 && this.touchTime < 6300:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                //this.gameScene.resultText.text = "太遗憾了，羊排烤的太久了，羊排都被你烤焦了"
                this.gameScene.resultText.textFlow = <Array<egret.ITextElement>>[
                    { text: "哎呀，烤太久了，你得到了" },
                    { text: "烤焦的羊排",style: { "textColor": 0xFF5722,"bold": true,"size": 30 } },
                    { text: "，用时" },
                    { text: (this.touchTime / 1000).toFixed(2) + "秒",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "，全国有" },
                    { text: ((this.touchTime - 4000) / 5000 * 100).toFixed(2) + "%",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "的玩家和你犯了同样的错误！" }
                ];
                this.gameScene.people.source = RES.getRes("bad_png");
                this.gameScene.blackline.visible = true;
               
                //this.gameScene.people.source = "resource/assets/bad.png";
                //this.gameScene.ShareButton();
                break;

            case this.touchTime >= 6300 && this.touchTime < 7000:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                //this.gameScene.resultText.text = "亲，你是木炭烤羊排还是羊排烤木炭，再折腾下，羊排就成炭了！";
                this.gameScene.resultText.textFlow = <Array<egret.ITextElement>>[
                    { text: "亲，我们这烤的是羊排不是碳，再折腾下羊排就成炭了" },
                   
                    { text: "，不过你不是孤独的，全国有" },
                    { text: ((this.touchTime - 4000) / 5000 * 100).toFixed(2) + "%",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "的玩家想把烤羊排变成烧炭！" }
                ];
                this.gameScene.people.source = RES.getRes("bad_png");
                this.gameScene.blackline.visible = true;
                //this.gameScene.people.source = "resource/assets/bad.png";
                //this.gameScene.ShareButton();
                //this.overText.x = this.stage.stageWidth - this.overText.width >> 1;
                // this.overText.y = this.stage.stageHeight - this.stage.stageHeight / 5;
                break; 
                
            case this.touchTime >= 7000:
                console.log("触摸结束,触摸时间为" + this.touchTime);
                //this.gameScene.resultText.text = "亲，别烤了，都成炭了，不行下次给你开发个烧炭游戏吧。";
                this.gameScene.resultText.textFlow = <Array<egret.ITextElement>>[
                    { text: "亲，别烤了，都成" },
                    { text: "炭",style: { "textColor": 0xFF5722,"bold": true,"size": 30 } },
                    { text: "了，不行下次给你开发个烧炭游戏吧" },
                    { text: "。算上你，全国有" },
                    { text: ((this.touchTime - 6000) / 5000 * 100).toFixed(2) + "%",style: { "textColor": 0xFF5722,"bold": true,"size": 35 } },
                    { text: "的玩家对烧炭游戏感兴趣！" }
                ];
                this.gameScene.blackline.visible = true;
                this.gameScene.people.source = RES.getRes("bad_png");
                //this.gameScene.people.source = "resource/assets/bad.png";
                //this.gameScene.ShareButton();
                break; 
             
    }
}
    /*粒子启动
    private timerStart(){
        console.log("粒子启动");
        this.gameScene.glowbackSystem.start();
        this.gameScene.glowfront_3System.start();
        this.gameScene.glowfront_2System.start();
        this.gameScene.glowfront_1System.start();
    }
    粒子启动*/
    
    /*粒子暂停
    private timerComplete(){
        this.gameScene.glowbackSystem.stop();
        this.gameScene.glowfront_3System.stop();
        this.gameScene.glowfront_2System.stop();
        this.gameScene.glowfront_1System.stop();
    }
    */
    
}
