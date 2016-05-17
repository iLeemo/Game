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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    p.createView = function () {
        this.uiLayer = new eui.UILayer;
        this.addChild(this.uiLayer);
        this.progresImg = new eui.Image();
        this.progresImg.source = "resource/assets/blacklogo.png";
        this.progresImg.verticalCenter = -150;
        this.progresImg.horizontalCenter = 0;
        this.uiLayer.addChild(this.progresImg);
        // this.progressMake = new eui.Image();
        // this.progressMake.source = "resource/assets/ProgressMask.png";
        // this.uiLayer.addChild(this.progressMake);
        this.textField = new eui.Label();
        //this.progressMake.verticalCenter = 0;
        // this.progressMake.horizontalCenter = 0;
        //this.progresImg.x = this.stage.stageWidth- this.progresImg.width<<1;
        this.textField.verticalCenter = -50;
        this.textField.horizontalCenter = 0;
        this.textField.width = 500;
        this.textField.textAlign = "center";
        this.textField.size = 28;
        this.textField.textColor = 0x373737;
        //this.textField.x = CONST.S -this.textField.width/2;
        this.uiLayer.addChild(this.textField);
    };
    p.setProgress = function (current, total) {
        //this.textField.text = "Loading..." + current + "/" + total;
        this.textField.text = "请稍等，精彩即将展现......" + Math.round(current / total * 100) + "%";
        this.textField.x = this.stage.stageWidth - this.textField.width << 1;
        //进度条Mask
        //var per: number = current / total;
        //this.maskRect = new egret.Rectangle(0,0,per * 152,20);
        //this.progressMake.mask = this.maskRect;
    };
    return LoadingUI;
}(egret.DisplayObjectContainer));
egret.registerClass(LoadingUI,'LoadingUI');
