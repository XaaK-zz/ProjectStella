// Copyright © Zach Greenvoss 
// Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php

goog.provide('projectStella.ActionIcon');
goog.require('projectStella.SpellIcon');
goog.require('projectStella.ImgSprite');


projectStella.ActionIcon = function(spellIcon,nodeIndex,locationRect)
{
    //this.SpellIcon = spellIcon;
    this.NodeIndex = nodeIndex;
    this.SpellIcon = new projectStella.SpellIcon(spellIcon.SpellType);
    
    this.SpellIcon.XPosition = locationRect.left;
    this.SpellIcon.YPosition = locationRect.top;
    this.SpellIcon.Width = locationRect.width;
    this.SpellIcon.Height = locationRect.height;
};

goog.inherits(projectStella.ActionIcon, projectStella.ImgSprite);

projectStella.ActionIcon.prototype.Draw = function(context)
    {
        //projectStella.ActionIcon.superClass_.Draw.call(context);
        if(this.SpellIcon)
            this.SpellIcon.Draw(context);
    };