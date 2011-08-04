/**
 * @fileOverview This file has functions related to the SpellIcon object.
 * @author Zach Greenvoss
 * @version 1.0
 * Copyright © Zach Greenvoss 
 * Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */
goog.provide('projectStella.SpellIcon');
goog.provide('projectStella.SpellIconType');
goog.require('projectStella.ImgSprite');

/**
 * Constructor for a SpellIcon object.
 * @class Object for displaying spell icons in the game
 * @param {projectStella.SpellIconType} spellType Type of spell icon to create
 * @constructor
 * @extends {projectStella.ImgSprite}
 */
projectStella.SpellIcon = function(spellType)
{
    /**
        * Indicates if this is a selected icon
        * @type {bool}
        * @public
    */
    this.Selected = false;
    
    /**
        * Type of spell icon
        * @type {projectStella.SpellIconType}
        * @public
    */
    this.SpellType = spellType;
    
    switch(spellType)
    {
        case projectStella.SpellIconType.MoveForward:
            //Move forward
            projectStella.ImgSprite.call(this,"img/Icon_MoveForward2.jpg",10,20,1,0,32,32,0,0,-1);
            break;
        case projectStella.SpellIconType.TurnRight:
            //Turn Right
            projectStella.ImgSprite.call(this,"img/Icon_TurnRight2.jpg",50,20,1,0,32,32,0,0,-1);
            break;
        case projectStella.SpellIconType.TurnLeft:
            //Turn Left
            projectStella.ImgSprite.call(this,"img/Icon_TurnLeft2.jpg",90,20,1,0,32,32,0,0,-1);
            break;
    }
};
goog.inherits(projectStella.SpellIcon, projectStella.ImgSprite);

/**
 * Sets the spell to selected
 */
projectStella.SpellIcon.prototype.SetSelected = function()
    {
        this.CurrentCol = 1;
        this.Selected = true;
    };

/**
 * Sets the spell to non-selected
 */
projectStella.SpellIcon.prototype.SetUnSelected = function()
    {
        this.CurrentCol = 0;
        this.Selected = false;
    };

/**
 * Handles the click event from the user.<br>
 *  Sets to selected/unselected depending on state
 */
projectStella.SpellIcon.prototype.Click = function()
    {
        if(this.Selected)
            this.SetUnSelected();
        else
            this.SetSelected();
    };


/**
 * Enumeration used to indicate the type of spell icon
 * @enum {number}
 */
projectStella.SpellIconType =
{
  /**
   * Basic move forward icon
   */
  MoveForward: 1,
  
  /**
   * Turn right icon
   */
  TurnRight: 2,
  
  /**
   * Turn left icon
   */
  TurnLeft: 3
  
};
