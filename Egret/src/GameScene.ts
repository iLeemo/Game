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
    	
    	
    	var items:eui.Image = new eui.Image();
    	items.source = "resource/assets/items.png";
    	this.addChild(items);
    	items.bottom = 320;
    	items.horizontalCenter =0; 	
      
    	
    	this.people.source = "resource/assets/normal.png";
        this.people.bottom = items.bottom + 100;
        this.people.horizontalCenter = 15;
    	this.addChild(this.people);
    	console.log("窗口大小为"+window.screen.height);
    	//people.verticalCenter = (-window.screen.height*0.2);	
    	console.log(items.bottom);
    	
        this.swapChildren(this.people,items);
    	
    	var food: eui.Image = new eui.Image();
    	food.source = "resource/assets/food.png";
    	this.addChild(food);
    	food.bottom = items.bottom+55 ;
    	food.horizontalCenter = 85;
    	
    	this.goodFood.source = "resource/assets/goodfood.png";
    	this.addChild(this.goodFood);
    	this.goodFood.bottom = food.bottom; //+22是为了解决bread边缘问题，此处可以把外围设置透明，就解决了多一块问题
        this.goodFood.horizontalCenter = food.horizontalCenter;//同上
        
        this.badFood.source = "resource/assets/badfood.png";
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
    	this.resultText.text = "Come On！来给路可烤个羊排吧！";
    	this.addChild(this.resultText);

    	//this.resultText.bottom = items.bottom+200;
    	this.resultText.horizontalCenter =0;
    	
    	//点击按钮
    	this.touchBtn.source = "resource/assets/button.png"
    	this.touchBtn.touchEnabled = true;
    	this.touchBtn.bottom = 150;
    	this.touchBtn.horizontalCenter=0;
    	this.addChild(this.touchBtn);
    	
    	var logo :eui.Image = new eui.Image();
        logo.source = "resource/assets/logo.png"
        logo.top = 5;
        logo.left =5;
        this.addChild(logo);
        
        var share:eui.Image = new eui.Image();
        share.source = "resource/assets/share.png"
    	share.top=5;
    	share.right=5;
    	this.addChild(share);
        
    	
	}
	

}
