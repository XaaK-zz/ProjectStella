// Copyright © Zach Greenvoss 
// Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php

goog.provide('projectStella.SpellIcon');

goog.require('projectStella.ImgSprite');


projectStella.SpellIcon = function(spellType)
{
    this.Selected = false;
    this.SpellType = spellType;
    switch(spellType)
    {
        case 1:
            //Move forward
            projectStella.ImgSprite.call(this,"img/Icon_MoveForward2.jpg",10,20,1,0,32,32,0,0,-1);
            break;
        case 2:
            //Turn Right
            projectStella.ImgSprite.call(this,"img/Icon_TurnRight.jpg",50,20,0,0,32,32,0,0,-1);
            break;
        case 3:
            //Turn Left
            projectStella.ImgSprite.call(this,"img/Icon_TurnLeft.jpg",90,20,0,0,32,32,0,0,-1);
            break;
    }
};

goog.inherits(projectStella.SpellIcon, projectStella.ImgSprite);

projectStella.SpellIcon.prototype.SetSelected = function()
    {
        this.CurrentCol = 1;
        this.Selected = true;
    };
    
projectStella.SpellIcon.prototype.SetUnSelected = function()
    {
        this.CurrentCol = 0;
        this.Selected = false;
    };

projectStella.SpellIcon.prototype.Click = function()
    {
        if(this.Selected)
            this.SetUnSelected();
        else
            this.SetSelected();
    };

