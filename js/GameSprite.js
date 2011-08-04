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
            projectStella.ImgSprite.call(this,"img/dragon2.png",(this.CellX * 32),(this.CellY * 32),4,4,32,32,0,0,300);
            break;
         case projectStella.GameSpriteType.Gem:
            //Gem Sprite
            projectStella.ImgSprite.call(this,"img/Gem.png",(this.CellX * 32),(this.CellY * 32),0,0,32,32,0,0,-1);
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
                    this.FlipSpeed = 300;
                    //this.CallBackFunction();
                    this.CallBackFunction.call(this.GameObj);
                }
                break;
            case projectStella.SpriteFacing.East:
                this.XPosition += this.MoveSpeed;
                if(this.XPosition >= (this.DestinationCellX * 32))
                {
                    this.CellX = this.DestinationCellX;
                    this.XPosition = (this.DestinationCellX * 32);
                    this.MoveSpeed = 0;
                    this.FlipSpeed = 300;
                    //this.CallBackFunction();
                    this.CallBackFunction.call(this.GameObj);
                }
                break;
            case projectStella.SpriteFacing.South:
                this.YPosition += this.MoveSpeed;
                if(this.YPosition >= (this.DestinationCellY * 32))
                {
                    this.CellY = this.DestinationCellY;
                    this.YPosition = (this.DestinationCellY * 32);
                    this.MoveSpeed = 0;
                    this.FlipSpeed = 300;
                    //this.CallBackFunction();
                    this.CallBackFunction.call(this.GameObj);
                }
                break;
            case projectStella.SpriteFacing.West:
                this.XPosition -= this.MoveSpeed;
                if(this.XPosition <= (this.DestinationCellX * 32))
                {
                    this.CellX = this.DestinationCellX;
                    this.XPosition = (this.DestinationCellX * 32);
                    this.MoveSpeed = 0;
                    this.FlipSpeed = 300;
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
                    this.FlipSpeed = 100;
                    
                    switch(this.Facing)
                    {
                        case projectStella.SpriteFacing.North:
                            this.DestinationCellY = this.CellY - 1;
                            break;
                         case projectStella.SpriteFacing.East:
                            this.DestinationCellX = this.CellX + 1;
                            break;
                         case projectStella.SpriteFacing.South:
                            this.DestinationCellY = this.CellY + 1;
                            break;
                         case projectStella.SpriteFacing.West:
                            this.DestinationCellX = this.CellX - 1;
                            break;
                    }
                    
                    
                    break;
                
                case projectStella.SpellIconType.TurnRight:
                    if(this.Facing == projectStella.SpriteFacing.North)
                    {
                        this.Facing = projectStella.SpriteFacing.East;
                        this.CurrentRow = 1;
                    }
                    else if(this.Facing == projectStella.SpriteFacing.East)
                    {
                        this.Facing = projectStella.SpriteFacing.South;
                        this.CurrentRow = 2;
                    }
                    else if(this.Facing == projectStella.SpriteFacing.South)
                    {
                        this.Facing = projectStella.SpriteFacing.West;
                        this.CurrentRow = 3;
                    }
                    else if(this.Facing == projectStella.SpriteFacing.West)
                    {
                        this.Facing = projectStella.SpriteFacing.North;
                        this.CurrentRow = 0;
                    }
                    callback.call(gameObj);
                    break;
                
                case projectStella.SpellIconType.TurnLeft:
                    if(this.Facing == projectStella.SpriteFacing.North)
                    {
                        this.Facing = projectStella.SpriteFacing.West;
                        this.CurrentRow = 3;
                    }
                    else if(this.Facing == projectStella.SpriteFacing.East)
                    {
                        this.Facing = projectStella.SpriteFacing.North;
                        this.CurrentRow = 0;
                    }
                    else if(this.Facing == projectStella.SpriteFacing.South)
                    {
                        this.Facing = projectStella.SpriteFacing.East;
                        this.CurrentRow = 1;
                    }
                    else if(this.Facing == projectStella.SpriteFacing.West)
                    {
                        this.Facing = projectStella.SpriteFacing.South;
                        this.CurrentRow = 2;
                    }
                    callback.call(gameObj);
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
  Gem: 2,
  
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
