// Copyright © Zach Greenvoss 
// Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php

function World()
{
    this.context = null;
    this.DisplayList = [];
    this.Init = function(canvasID){this.context = document.getElementById(canvasID).getContext('2d');}
    this.Update = function()
        {
            for(x=0;x<this.DisplayList.length;x++)
            {
                this.DisplayList[x].UpdateState(this.context);
            }
        };
    
    this.Display = function()
        {
            for(x=0;x<this.DisplayList.length;x++)
            {
                this.DisplayList[x].Draw(this.context);
            }
            //Draw grid
            this.context.strokeStyle = "#EEE";
            for(x=0;x<20;x++)
            {
                for(y=0;y<10;y++)
                {
                    this.context.strokeRect((x*32), (y*32), 32, 32);
                }
            }
        };
        
    this.BuildBackground = function()
        {
           //Build Background
           for(x=0;x<40;x++)
           {
                for(y=0;y<20;y++)
                {
                    worldObj.DisplayList.push(new ImgSprite("img/grass.jpg" ,  (x*16),(y*16),3,5,16,16,Math.floor(Math.random()*3),Math.floor(Math.random()*4),-1));
                }
           }
            
        };
}

function SpellBook(width, height)
{
    this.width = width;
    this.height = height;
    this.context = null;
    this.DisplayList = [];
    this.SelectedIndex = -1;
    this.Init = function(canvasID)
        {
            this.CanvasID = canvasID;
            this.context = document.getElementById(canvasID).getContext('2d');
            var moveForwardIcon = new ImgSprite("img/Icon_MoveForward2.jpg",10,20,1,0,32,32,0,0,-1);
            moveForwardIcon.Click = function ()
            {
                if(this.CurrentCol == 1)
                    this.CurrentCol = 0;
                else
                    this.CurrentCol = 1; 
            };
            this.DisplayList.push(moveForwardIcon);
            this.DisplayList.push(new ImgSprite("img/Icon_TurnRight.jpg",50,20,0,0,32,32,0,0,-1));
            this.DisplayList.push(new ImgSprite("img/Icon_TurnLeft.jpg",90,20,0,0,32,32,0,0,-1));
            
            
        }
        
    this.Update = function()
        {
            for(x=0;x<this.DisplayList.length;x++)
            {
                this.DisplayList[x].UpdateState(this.context);
            }
        };
    
    this.Display = function()
        {
            this.context.fillStyle = "#e3ceaf";
            this.context.fillRect(0, 0, this.width, this.height);
            
            this.context.font = "15px Arial";
            this.context.fillStyle = "#000";
            this.context.fillText("Spells",48,14)
            for(x=0;x<this.DisplayList.length;x++)
            {
                this.DisplayList[x].Draw(this.context);
            }
            
        };
        
    this.HandleClick = function(e)
        {
            var ClickLeft = e.offsetX;
            var ClickTop = e.offsetY;
            //this.context.fillStyle = "rgb(255,255,255)";
            //this.context.fillRect(x, y, 20, 20);
            for(x=0;x<this.DisplayList.length;x++)
            {
                var x0 = Math.max(this.DisplayList[x].XPosition, ClickLeft);
                var x1 = Math.min(this.DisplayList[x].XPosition + this.DisplayList[x].Width, ClickLeft + 10);
                if (x0 <= x1)
                {
                    var y0 = Math.max(this.DisplayList[x].YPosition, ClickTop);
                    var y1 = Math.min(this.DisplayList[x].YPosition + this.DisplayList[x].Height, ClickTop + 10);
                    if (y0 <= y1)
                    {
                        this.DisplayList[x].Click();
                        return;
                    }
                }
                
            }
        };
}


function ActionSection(width, height)
{
    this.width = width;
    this.height = height;
    this.context = null;
    this.DisplayList = [];
    this.Init = function(canvasID)
        {
            this.context = document.getElementById(canvasID).getContext('2d');
        }
        
    this.Update = function()
        {
            for(x=0;x<this.DisplayList.length;x++)
            {
                this.DisplayList[x].UpdateState(this.context);
            }
        };
    
    this.Display = function()
        {
            this.context.fillStyle = "#999";
            this.context.fillRect(0, 0, this.width, this.height);
            
            this.context.strokeStyle = "#EEE";
            for(x=0;x<10;x++)
            {
                for(y=0;y<4;y++)
                {
                    this.context.strokeRect(15 + (x*32) + (x*15), 15 + (y*32) + (y*15), 32, 32);
                }
            }
            
            for(x=0;x<this.DisplayList.length;x++)
            {
                this.DisplayList[x].Draw(this.context);
            }
            
        };
    
    this.HandleClick = function(e)
        {
           //TODO
        };
}

function DisplayObject(initFX, updateFX, drawFX)
{
    this.Init = initFX;
    this.UpdateState = updateFX;
    this.Draw = drawFX;
}

function ImgSprite(img,XPos,YPos,HPics,VPics,xSize,ySize,
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
}
