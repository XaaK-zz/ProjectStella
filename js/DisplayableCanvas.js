// Copyright © Zach Greenvoss 
// Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php

goog.provide('projectStella');
goog.provide('projectStella.DisplayableCanvas');

projectStella.DisplayableCanvas = function(width, height)
    {
        this.width = width;
        this.height = height;
        this.context = null;
        this.canvasItem = null;
        this.DisplayList = [];
    };

projectStella.DisplayableCanvas.prototype.Init = function(canvasID)
    {
        this.context = document.getElementById(canvasID).getContext('2d');
        this.canvasItem = document.getElementById(canvasID);
    };

projectStella.DisplayableCanvas.prototype.Update = function()
    {
        for(x=0;x<this.DisplayList.length;x++)
        {
            this.DisplayList[x].UpdateState(this.context);
        }
    };

projectStella.DisplayableCanvas.prototype.Display = function()
    {
        for(x=0;x<this.DisplayList.length;x++)
        {
            this.DisplayList[x].Draw(this.context);
        }
    };


