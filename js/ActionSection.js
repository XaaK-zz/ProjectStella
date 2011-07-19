// Copyright © Zach Greenvoss 
// Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php

goog.provide('projectStella.ActionSection');

goog.require('projectStella.DisplayableCanvas');
goog.require('projectStella.ImgSprite');
goog.require('projectStella.ActionIcon');

projectStella.ActionSection = function(width, height)
    {
        projectStella.DisplayableCanvas.call(this,width, height);
        
        //rendering settings
        this.OffsetStartX = 15;
        this.OffsetStartY = 15;
        this.SquareSize = 32;
        this.NumberSquaresX = 10;
        this.NumberSquaresY = 4;
        
        //collection of stored spells
        this.ActionList = [];
    };

goog.inherits(projectStella.ActionSection, projectStella.DisplayableCanvas);

projectStella.ActionSection.prototype.Init = function(canvasID)
    {
        projectStella.ActionSection.superClass_.Init.call(this,canvasID);
           
        
        
    };

projectStella.ActionSection.prototype.Display = function()
    {
        this.context.fillStyle = "#999";
        this.context.fillRect(0, 0, this.width, this.height);
        
        this.context.strokeStyle = "#EEE";
        for(x=0;x<this.NumberSquaresX;x++)
        {
            for(y=0;y<this.NumberSquaresY;y++)
            {
                this.context.strokeRect(this.OffsetStartX + (x*this.SquareSize) + (x*this.OffsetStartX),
                                        this.OffsetStartY + (y*this.SquareSize) + (y*this.OffsetStartY),
                                        this.SquareSize, 
                                        this.SquareSize);
            }
        }
        
        projectStella.ActionSection.superClass_.Display.call(this);
    };

projectStella.ActionSection.prototype.HandleClick = function(e,selectedSpell)
    {
        //Check to see if we are in a valid square
        var clickRect = new goog.math.Rect(e.offsetX,e.offsetY,10,10);
        for(x=0;x<this.NumberSquaresX;x++)
        {
            for(y=0;y<this.NumberSquaresY;y++)
            {
                var displayRect = new goog.math.Rect(this.OffsetStartX + (x*this.SquareSize) + (x*this.OffsetStartX),
                                                    this.OffsetStartY + (y*this.SquareSize) + (y*this.OffsetStartY),
                                                    this.SquareSize, 
                                                    this.SquareSize);
                if(clickRect.intersects(displayRect))
                {
                    //found a match inside a square - now check to see if a valid placement
                    var actionIcon = new projectStella.ActionIcon(selectedSpell,(x*y)+x,displayRect);
                    this.DisplayList.push(actionIcon);
                    
                    selectedSpell.SetUnSelected();
                }
            }
        }
        
        
            
       
    };