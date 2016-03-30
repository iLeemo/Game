//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.DisplayObjectContainer
{

    public constructor()
    {
        super();
        this.createView();
    }

    private textField: eui.Label;
    private uiLayer: eui.UILayer;
    private progresImg: eui.Image;
    private progressMake: eui.Image;
    private maskRect;

    private createView(): void
    {

        this.uiLayer = new eui.UILayer;
        this.addChild(this.uiLayer);
        this.progresImg = new eui.Image();
        this.progresImg.source = "resource/assets/ProgressBars.png";
        this.uiLayer.addChild(this.progresImg);
        this.progressMake = new eui.Image();
        this.progressMake.source = "resource/assets/ProgressMask.png";
        this.uiLayer.addChild(this.progressMake);
        this.progresImg.verticalCenter = 0;
        this.progresImg.horizontalCenter = 0;

        this.textField = new eui.Label();
        this.progressMake.verticalCenter = 0;
        this.progressMake.horizontalCenter = 0;
        //this.progresImg.x = this.stage.stageWidth- this.progresImg.width<<1;
        this.uiLayer.addChild(this.textField);
        //this.textField.x = CONST.S -this.textField.width/2;
        
        this.textField.verticalCenter = -50;
        this.textField.horizontalCenter = 0;
        this.textField.width = 400;
        this.textField.textAlign = "center";
        this.textField.size = 20;



    }

    public setProgress(current,total): void
    {
        //this.textField.text = "Loading..." + current + "/" + total;
        this.textField.text = "请稍等，精彩即将展现......" + Math.round(current / total * 100) + "%";
        this.textField.x = this.stage.stageWidth - this.textField.width << 1;

        var per: number = current / total;
        this.maskRect = new egret.Rectangle(0,0,per * 152,20);
        this.progressMake.mask = this.maskRect;
    }
}
