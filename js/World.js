/**
 * @fileOverview This file has functions related to the World object.
 * @author Zach Greenvoss
 * @version 1.0
 * Copyright © Zach Greenvoss 
 * Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */
goog.provide('projectStella.World');

goog.require('projectStella.DisplayableCanvas');
goog.require('projectStella.ImgSprite');
goog.require('projectStella.GameSprite');

/**
 * Constructor for a World object.
 * @class Acts as the Controller object for the World canvas.<br>
 *  This is the canvas/controller that displays the level objects and dragon.
 * @param {number} width Horizontal size of the World canvas display in pixels.
 * @param {number} height Vertical size of the World canvas display in pixels.
 * @constructor
 * @extends {projectStella.DisplayableCanvas}
 */
projectStella.World = function(level,sizeX,sizeY)
    {
        /**
        * Level currently being represented by this world object
        * @type {Number}
        * @public
        */
        this.Level = level;
        
        /**
        * Number of cell nodes in the horizontal direction
        * @type {Number}
        * @public
        */
        this.SizeX = sizeX;
        
        /**
        * Number of cell nodes in the vertical direction
        * @type {Number}
        * @public
        */
        this.SizeY = sizeY;
        
        /**
        * Player character icon on the world map
        * @type {projectStella.GameSprite}
        * @public
        */
        this.MainCharacter = null;
        
        /**
        * Gem - represents final square player must get to
        * @type {projectStella.GameSprite}
        * @public
        */
        this.FinalGem = null;
        
        var widthTemp = this.SizeX * 16;
        var heightTemp = this.SizeY * 16;
        
        projectStella.DisplayableCanvas.call(this,widthTemp, heightTemp);
    };

goog.inherits(projectStella.World, projectStella.DisplayableCanvas);

/**
 * Init the canvas object
 * @param {string} canvasID Document ID of the World canvas element.
 * @param {number} level Current level - used to determine what spells to load
 */
projectStella.World.prototype.Init = function(canvasID)
    {
        projectStella.World.superClass_.Init.call(this,canvasID);
        
        //always build basic grass background (for now)
        for(x=0;x<this.SizeX;x++)
        {
             for(y=0;y<this.SizeY;y++)
             {
                 this.DisplayList.push(new projectStella.ImgSprite("img/grass.jpg",(x*16),(y*16),
                                                                    3,5,16,16,Math.floor(Math.random()*3),
                                                                    Math.floor(Math.random()*4),-1));
             }
        }
        
        if(this.Level == 1)
        {
            //Add final Gem location
            this.FinalGem = new projectStella.GameSprite(projectStella.GameSpriteType.Gem,3,0);
            this.DisplayList.push(this.FinalGem);
            
            //Setup main character
            this.MainCharacter = new projectStella.GameSprite(projectStella.GameSpriteType.MainCharacter,3,3);
            this.DisplayList.push(this.MainCharacter);
            
            //create other map elements - TODO
            
        }
    };

/**
 * Display the World Section
 */    
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



