/**
 * @fileOverview This file has functions related to the ActionIcon object.
 * @author Zach Greenvoss
 * @version 1.0
 * Copyright © Zach Greenvoss 
 * Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */
goog.provide('projectStella.ActionIcon');
goog.require('projectStella.SpellIcon');
goog.require('projectStella.ImgSprite');

/**
 * Constructor for an ActionIcon object.
 * @class Object for displaying dragon actions in the game
 * @param {projectStella.SpellIcon} spellIcon Spell this action is based on
 * @param {number} nodeIndex Index of the cell the user clicked on
 * @param {goog.Rect} locationRect Display rectangle to use
 * @constructor
 * @extends {projectStella.ImgSprite}
 */
projectStella.ActionIcon = function(spellIcon,nodeIndex,locationRect)
{
    /**
        * Index of this action item
        * @type {number}
        * @public
    */
    this.NodeIndex = nodeIndex;
    
    /**
        * Spell this action is based on
        * @type {projectStella.SpellIcon}
        * @public
    */
    this.SpellIcon = new projectStella.SpellIcon(spellIcon.SpellType);
    
    this.SpellIcon.XPosition = locationRect.left;
    this.SpellIcon.YPosition = locationRect.top;
    this.SpellIcon.Width = locationRect.width;
    this.SpellIcon.Height = locationRect.height;
};
goog.inherits(projectStella.ActionIcon, projectStella.ImgSprite);

/**
 * Draw function - called each timeslice
 * @param {canvas context}context Drawing context
 */
projectStella.ActionIcon.prototype.Draw = function(context)
    {
        //Draw the contained spell icon
        if(this.SpellIcon)
            this.SpellIcon.Draw(context);
    };