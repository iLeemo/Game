/**
 *
 * @author 
 *
 */
class GameScene extends eui.UILayer{
	public constructor() {
    	super();
	}
	

	 public goodFood:eui.Image = new eui.Image();
	 public badFood:eui.Image = new eui.Image();
	 public people: eui.Image = new eui.Image();
	 //public resultText:eui.BitmapLabel = new eui.BitmapLabel();
     public resultText: eui.Label = new eui.Label();
	 //public resultText:egret.TextField = new egret.TextField();
	 public touchBtn: eui.Image = new eui.Image();
	 public gameScene(){
    	//var bgImg:eui.Image = new eui.Image();
    	//bgImg.source = "resource/assets/bg.jpg";
    	//this.addChild(bgImg);
    	
    	 var bgimg:eui.Image = new eui.Image();
         bgimg.source = RES.getRes("bg_png");
         bgimg.horizontalCenter = 0
         this.addChild(bgimg);
    	
    	var items:eui.Image = new eui.Image();
    	items.source = RES.getRes("items_png");
    	//items.source = "resource/assets/items.png";
    	this.addChild(items);
    	items.bottom = 180;
    	items.horizontalCenter =0; 	
        
    	var tittle:eui.Image = new eui.Image();
        tittle.source = RES.getRes("slogan_png");
        tittle.bottom = items.bottom+160;
        this.addChild(tittle);
        
    	this.people.source = RES.getRes("normal_png")
    	//this.people.source = "resource/assets/normal.png";
        this.people.bottom = items.bottom + 280;
        this.people.horizontalCenter = 35;
    	this.addChild(this.people);
    	console.log("窗口大小为"+window.screen.height);
    	//people.verticalCenter = (-window.screen.height*0.2);	
    	console.log(items.bottom);
    	
        this.swapChildren(this.people,items);
        this.swapChildren(items,tittle);
    	
    	var food: eui.Image = new eui.Image();
    	food.source = RES.getRes("food_png");
    	//food.source = "resource/assets/food.png";
    	this.addChild(food);
    	food.bottom = items.bottom+225 ;
    	food.horizontalCenter = 85;
    	
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
        this.goodFood.alpha =0;
        this.badFood.alpha =0;
        
    	//this.resultText.font = RES.getRes("GameFont_fnt");
        this.resultText.bottom = 50;
        this.resultText.width = 610;
        this.resultText.textColor =0x373737;
        this.resultText.lineSpacing=5;
        this.resultText.textAlign = "center";
    	this.resultText.text = "Tip:长按上面的“火”按钮开始烧烤，松开即结束烧烤，注意观察并确定烧烤时间哦";
    	this.resultText.textColor = 0xFFFFFF;
    	this.addChild(this.resultText);

    	//this.resultText.bottom = items.bottom+200;
    	this.resultText.horizontalCenter =0;
    	
    	//点击按钮
    	this.touchBtn.source = RES.getRes("button_png");
    	//this.touchBtn.source = "resource/assets/button.png"
    	this.touchBtn.touchEnabled = true;
    	this.touchBtn.bottom = 150;
    	this.touchBtn.horizontalCenter=0;
    	this.addChild(this.touchBtn);
    	
    	var logo :eui.Image = new eui.Image();
    	logo.source = RES.getRes("logo_png");
        //logo.source = "resource/assets/logo.png"
        logo.top = 5;
        logo.left =5;
        this.addChild(logo);
        

        
    	
	}
	
	//share按钮
    public share: eui.Image = new eui.Image();;
	public ShareButton(){
        this.share.source = RES.getRes("share_png");
        //this.share.source = "resource/assets/share.png"
        this.share.top = 5;
        this.share.right = 5;
        this.share.name ="share";
        this.share.alpha = 0;
        this.addChild(this.share);
        egret.Tween.get(this.share).to({ alpha: 1 },200,egret.Ease.circIn);
	}
	

}
