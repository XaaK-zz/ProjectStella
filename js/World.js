// Copyright © Zach Greenvoss 
// Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php

goog.provide('projectStella.World');

goog.require('projectStella.DisplayableCanvas');
goog.require('projectStella.ImgSprite');

projectStella.World = function(width, height)
    {
        projectStella.DisplayableCanvas.call(this,width, height);
    };

goog.inherits(projectStella.World, projectStella.DisplayableCanvas);

projectStella.World.prototype.Display = function()
    {
        projectStella.World.superClass_.Display.call(this);
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
        
projectStella.World.prototype.BuildBackground = function()
    {
       //Build Background
       for(x=0;x<40;x++)
       {
            for(y=0;y<20;y++)
            {
                worldObj.DisplayList.push(new projectStella.ImgSprite("img/grass.jpg" ,  (x*16),(y*16),3,5,16,16,Math.floor(Math.random()*3),Math.floor(Math.random()*4),-1));
            }
       }
        
    };



