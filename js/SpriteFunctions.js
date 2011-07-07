// Copyright © Zach Greenvoss 
// Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php

function World()
{
    this.context = null;
    this.DisplayList = [];
    this.Init = InitWorld;
    this.Update = UpdateWorld;
    this.Display = DisplayWorld;
}

function InitWorld(canvasID)
{
    this.context = document.getElementById(canvasID).getContext('2d');
}

function UpdateWorld()
{
    for(x=0;x<this.DisplayList.length;x++)
    {
        this.DisplayList[x].UpdateState(this.context);
    }
}

function DisplayWorld()
{
    for(x=0;x<this.DisplayList.length;x++)
    {
        this.DisplayList[x].Draw(this.context);
    }
}

function Sprite(initFX, updateFX, drawFX)
{
    this.Init = initFX;
    this.UpdateState = updateFX;
    this.Draw = drawFX;
}

