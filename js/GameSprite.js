/**
 * @fileOverview This file has functions related to the GameSprite object.
 * @author Zach Greenvoss
 * @version 1.0
 * Copyright © Zach Greenvoss 
 * Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */
goog.provide('projectStella.GameSprite');
goog.require('projectStella.ImgSprite');
goog.require('projectStella.ActionSection');

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

    this.Facing = projectStella.SpriteFacing.North;
    
    this.MoveSpeed = 0; //Not moving
    this.DestinationCellX = -1;
    this.DestinationCellY = -1;
    this.CallBackFunction = null;
    this.GameObj = null;
    
    switch(spriteType)
    {
        case projectStella.GameSpriteType.MainCharacter:
            //Main Character sprite
            projectStella.ImgSprite.call(this,"img/knight.gif",(this.CellX * 32),(this.CellY * 32),2,3,16,18,0,0,100);
            break;
    }
};
goog.inherits(projectStella.GameSprite, projectStella.ImgSprite);

projectStella.GameSprite.prototype.UpdateState = function()
{
    if(this.MoveSpeed > 0)
    {
        switch(this.Facing)
        {
            case projectStella.SpriteFacing.North:
                this.YPosition -= this.MoveSpeed;
                if(this.YPosition <= (this.DestinationCellY * 32))
                {
                    this.CellY = this.DestinationCellY;
                    this.YPosition = (this.DestinationCellY * 32);
                    this.MoveSpeed = 0;
                    //this.CallBackFunction();
                    this.CallBackFunction.call(this.GameObj);
                }
                break;
        }
    }
    
    //Call super class to update state 
    projectStella.GameSprite.superClass_.UpdateState.call(this);
};
    
projectStella.GameSprite.prototype.ApplySpell = function(actionSection,callback,gameObj)
{
    if(actionSection.ActiveCell != -1)
    {
        //alert('ApplySpell');
        var currentSpellIcon = actionSection.ActionList[actionSection.ActiveCell];
        if(currentSpellIcon && currentSpellIcon.SpellIcon)
        {
            var currentSpell = currentSpellIcon.SpellIcon.SpellType;
            switch(currentSpell)
            {
                case projectStella.SpellIconType.MoveForward:
                    this.MoveSpeed = 5;
                    this.DestinationCellY = this.CellY - 1;
                    break;
                
                case projectStella.SpellIconType.TurnRight:
                    
                    break;
                
                case projectStella.SpellIconType.TurnLeft:
                    
                    break;
            }
            
            this.GameObj = gameObj;
            this.CallBackFunction = callback;
        }
    }
    
};

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

projectStella.SpriteFacing =
{
    North: 0,
    East: 1,
    South: 2,
    West: 3
};
