// Copyright © Zach Greenvoss 
// Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php

goog.provide('projectStella.ActionSection');

goog.require('projectStella.DisplayableCanvas');
goog.require('projectStella.ImgSprite');

projectStella.ActionSection = function(width, height)
    {
        projectStella.DisplayableCanvas.call(this,width, height);
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
        for(x=0;x<10;x++)
        {
            for(y=0;y<4;y++)
            {
                this.context.strokeRect(15 + (x*32) + (x*15), 15 + (y*32) + (y*15), 32, 32);
            }
        }
        
        projectStella.ActionSection.superClass_.Display.call(this);
    };

projectStella.ActionSection.prototype.HandleClick = function(e)
    {
        alert('click');
    };