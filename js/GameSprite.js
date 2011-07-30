/**
 * @fileOverview This file has functions related to the GameSprite object.
 * @author Zach Greenvoss
 * @version 1.0
 * Copyright © Zach Greenvoss 
 * Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */
goog.provide('projectStella.GameSprite');
goog.require('projectStella.ImgSprite');

/**
 * Constructor for an GameSprite object.
 * @class Object for displaying sprites on the game board
 * @param {projectStella.SpellIcon} spellIcon Spell this action is based on
 * @param {number} nodeIndex Index of the cell the user clicked on
 * @param {goog.Rect} locationRect Display rectangle to use
 * @constructor
 * @extends {projectStella.ImgSprite}
 */
projectStella.GameSprite = function(spriteType,cellX,cellY)
{
    /**
        * Type of sprite
        * @type {projectStella.GameSpriteType}
        * @public
    */
    this.SpriteType = spriteType;
    
    /**
        * X-index of current cell position on map
        * @type {number}
        * @public
    */
    this.CellX = cellX;
    
    /**
        * Y-index of current cell position on map
        * @type {number}
        * @public
    */
    this.CellY = cellY;

    switch(spriteType)
    {
        case projectStella.GameSpriteType.MainCharacter:
            //Main Character sprite
            projectStella.ImgSprite.call(this,"img/knight.gif",(this.CellX * 32),(this.CellY * 32),2,3,16,18,0,0,100);
            break;
    }
};
goog.inherits(projectStella.GameSprite, projectStella.ImgSprite);


/**
 * Enumeration used to indicate the type of spell icon
 * @enum {number}
 */
projectStella.GameSpriteType =
{
  /**
   * Dragon character
   */
  MainCharacter: 1,
  
  /**
   * Tree
   */
  Tree: 2,
  
  /**
   * Wall
   */
  Wall: 3
  
};

