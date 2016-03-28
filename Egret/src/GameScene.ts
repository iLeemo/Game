/**
 *
 * @author 
 *
 */
class GameScene extends eui.UILayer{
	public constructor() {
    	super();
	}
	

	 public breadmask:eui.Image = new eui.Image();
	 public boardText:eui.BitmapLabel = new eui.BitmapLabel();
	 public gameScene(){
    	var bgImg:eui.Image = new eui.Image();
    	bgImg.source = "resource/assets/bg.jpg";
    	this.addChild(bgImg);
    	var board:eui.Image = new eui.Image();
    
    	board.source = "resource/assets/board.png";
    	this.addChild(board);
    	board.bottom = 100;
    	board.horizontalCenter =0; 	
      
    	var people:eui.Image = new eui.Image();
    	people.source = "resource/assets/people.png";
    	this.addChild(people);
    	console.log("窗口大小为"+window.screen.height);
    	//people.verticalCenter = (-window.screen.height*0.2);
    	people.bottom = board.bottom+500;
    	people.horizontalCenter = -5;
    	console.log(board.bottom);
    	
        this.swapChildren(people,board);
    	
    	var bread: eui.Image = new eui.Image();
    	bread.source = "resource/assets/bread.png";
    	this.addChild(bread);
    	bread.bottom = board.bottom + 262;
    	bread.horizontalCenter = 0;
    	
    	this.breadmask.source = "resource/assets/bread_mask.png";
    	this.addChild(this.breadmask);
    	this.breadmask.bottom = bread.bottom + 22; //+22是为了解决bread边缘问题，此处可以把外围设置透明，就解决了多一块问题
    	this.breadmask.horizontalCenter = 1;//同上
    	
    	this.boardText.font = RES.getRes("GameFont_fnt");
        this.boardText.bottom = board.bottom + 150;
        this.boardText.width = 400;
        this.boardText.textAlign = "center";
    	this.boardText.text = "来吧，与分辨率战斗到底！";
    	this.addChild(this.boardText);

    	//this.boardText.bottom = board.bottom+200;
    	this.boardText.horizontalCenter =0;
        
    	
	}
	

}
