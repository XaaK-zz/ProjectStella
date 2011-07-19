// Copyright © Zach Greenvoss 
// Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php

goog.provide('projectStella.SpellBook');


goog.require('projectStella.DisplayableCanvas');
goog.require('projectStella.ImgSprite');
goog.require('projectStella.SpellIcon');

goog.require('goog.events');
goog.require('goog.math.Rect');

projectStella.SpellBook = function(width, height)
    {
        projectStella.DisplayableCanvas.call(this,width, height);
    };

goog.inherits(projectStella.SpellBook, projectStella.DisplayableCanvas);

projectStella.SpellBook.prototype.Init = function(canvasID,level)
    {
        projectStella.SpellBook.superClass_.Init.call(this,canvasID);
        
        //var moveForwardIcon = new projectStella.ImgSprite("img/Icon_MoveForward2.jpg",10,20,1,0,32,32,0,0,-1);
        //var moveForwardIcon = new projectStella.SpellIcon(1);
        
        this.DisplayList.push(new projectStella.SpellIcon(1));
        //this.DisplayList.push(new projectStella.ImgSprite("img/Icon_TurnRight.jpg",50,20,0,0,32,32,0,0,-1));
        //this.DisplayList.push(new projectStella.ImgSprite("img/Icon_TurnLeft.jpg",90,20,0,0,32,32,0,0,-1));
        this.DisplayList.push(new projectStella.SpellIcon(2));
        this.DisplayList.push(new projectStella.SpellIcon(3));
        this.SelectedItem = null;
        
    };

projectStella.SpellBook.prototype.Display = function()
    {
        this.context.fillStyle = "#e3ceaf";
        this.context.fillRect(0, 0, this.width, this.height);
        
        this.context.font = "15px Arial";
        this.context.fillStyle = "#000";
        this.context.fillText("Spells",48,14)
        
        projectStella.SpellBook.superClass_.Display.call(this);
    };

projectStella.SpellBook.prototype.HandleClick = function(e)
    {
        var clickRect = new goog.math.Rect(e.offsetX,e.offsetY,10,10);
        //this.context.fillStyle = "rgb(255,255,255)";
        //this.context.fillRect(x, y, 20, 20);
        for(x=0;x<this.DisplayList.length;x++)
        {
            var displayRect = new goog.math.Rect(this.DisplayList[x].XPosition,
                                                 this.DisplayList[x].YPosition,
                                                 this.DisplayList[x].Width,
                                                 this.DisplayList[x].Height);
            if(clickRect.intersects(displayRect))
            {
                //Push click to sprite
                this.DisplayList[x].Click();
                //Handle logic for selecting item
                this.SelectedItem = this.DisplayList[x];
                return;   
            }
            
        }
        this.SelectedItem = null;
    };
