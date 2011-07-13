// Copyright © Zach Greenvoss 
// Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php

goog.provide('projectStella.ImgSprite');

projectStella.ImgSprite = function(img,XPos,YPos,HPics,VPics,xSize,ySize,
                   currentCol,currentRow,flipSpeed)
{
    this.Image = new Image();
    this.Image.src = img;
    this.XPosition = XPos;
    this.YPosition = YPos;
    this.HPics - HPics;
    this.VPics = VPics;
    this.Width = xSize;
    this.Height = ySize;
    this.CurrentRow = currentRow;
    this.CurrentCol = currentCol;
    this.FlipSpeed = flipSpeed;
    this.LastFlippedTime = new Date().getTime();
    
    this.UpdateState = function()
        {
            var currentTime = new Date().getTime();
            if(this.FlipSpeed > 0)
            {
                if((currentTime - this.LastFlippedTime) > flipSpeed)
                {
                    this.CurrentCol++;
                    if(this.CurrentCol >= HPics)
                        this.CurrentCol = 0;
                        
                    this.LastFlippedTime = new Date().getTime();
                }
            }
        };
    
    this.Draw = function(context)
        {
            context.drawImage(this.Image,
                              (this.CurrentCol * this.Width),
                              (this.CurrentRow * this.Height),
                              this.Width,this.Height,
                              this.XPosition,
                              this.YPosition,
                              this.Width,this.Height);
        };
};