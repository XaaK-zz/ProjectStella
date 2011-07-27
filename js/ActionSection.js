/**
 * @fileOverview This file has functions related to the ActionSection object.
 * @author Zach Greenvoss
 * @version 1.0
 * Copyright © Zach Greenvoss 
 * Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */

goog.provide('projectStella.ActionSection');

goog.require('projectStella.DisplayableCanvas');
goog.require('projectStella.ImgSprite');
goog.require('projectStella.ActionIcon');

/**
 * Constructor for an ActionSection object.
 * @class Acts as the Controller object for the Action Section canvas
 * @param {number} width Horizontal size of the ActionSection canvas display in pixels.
 * @param {number} height Vertical size of the ActionSection canvas display in pixels.
 * @constructor
 * @extends {projectStella.DisplayableCanvas}
 */
projectStella.ActionSection = function(sizeX, sizeY)
    {
        //rendering settings
        /**
            * OffsetStartX.
            * @type {number}
            * @protected
        */
        this.OffsetStartX = 15;
        /**
            * OffsetStartY.
            * @type {number}
            * @protected
        */
        this.OffsetStartY = 15;
        /**
            * Size of the action squares.
            * @type {number}
            * @protected
        */
        this.SquareSize = 32;
        /**
            * Number of action squares horizontally.
            * @type {number}
            * @protected
        */
        this.NumberSquaresX = sizeX;
        /**
            * Number of action squares vertically
            * @type {number}
            * @protected
        */
        this.NumberSquaresY = sizeY;
        
        /**
            * Collection of placed action icons.
            * @type {Array.<projectStella.ActionIcon>}
            * @protected
        */
        this.ActionList = [];
        
        /**
            * Collection of valid placement nodes
            * @type {Array.<number>}
            * @protected
        */
        this.ValidPlacement = [];
        
        var widthTemp = (this.NumberSquaresX * this.SquareSize) + ((this.NumberSquaresX+1) * this.OffsetStartX);
        var heightTemp = (this.NumberSquaresY * this.SquareSize) + ((this.NumberSquaresY+1) * this.OffsetStartX);
        
        projectStella.DisplayableCanvas.call(this,widthTemp, heightTemp);
       
    };
goog.inherits(projectStella.ActionSection, projectStella.DisplayableCanvas);

/**
 * Init the canvas object
 * @param {string}canvasID Document ID of the ActionSection canvas element.
 */
projectStella.ActionSection.prototype.Init = function(canvasID)
    {
        projectStella.ActionSection.superClass_.Init.call(this,canvasID);
        
        //Add first valid location
        var ballIcon = new projectStella.ImgSprite("img/GreenBall.gif",1,25,0,0,13,13,0,0,-1);
        this.DisplayList.push(ballIcon);
        
        this.ValidPlacement.push(0);
    };

/**
 * Display the Action Section
 */
projectStella.ActionSection.prototype.Display = function()
    {
        this.context.fillStyle = "#999";
        this.context.fillRect(0, 0, this.width, this.height);
        
        this.context.strokeStyle = "#EEE";
        for(x=0;x<this.NumberSquaresX;x++)
        {
            for(y=0;y<this.NumberSquaresY;y++)
            {
                //Check to see if this is an active square
                if(this.ValidPlacement.indexOf((this.NumberSquaresX*y)+x) != -1)
                {
                    this.context.fillStyle = "rgb(175,175,175)";
                    this.context.fillRect(this.OffsetStartX + (x*this.SquareSize) + (x*this.OffsetStartX),
                                        this.OffsetStartY + (y*this.SquareSize) + (y*this.OffsetStartY),
                                        this.SquareSize, 
                                        this.SquareSize);
                    this.context.strokeRect(this.OffsetStartX + (x*this.SquareSize) + (x*this.OffsetStartX),
                                        this.OffsetStartY + (y*this.SquareSize) + (y*this.OffsetStartY),
                                        this.SquareSize, 
                                        this.SquareSize);
                }
                else
                {
                    this.context.strokeRect(this.OffsetStartX + (x*this.SquareSize) + (x*this.OffsetStartX),
                                        this.OffsetStartY + (y*this.SquareSize) + (y*this.OffsetStartY),
                                        this.SquareSize, 
                                        this.SquareSize);
                    //Debug Code
                    //this.context.fillStyle = "#000";
                    //this.context.fillText(((this.NumberSquaresX*y)+x),
                    //                    this.OffsetStartX + (x*this.SquareSize) + (x*this.OffsetStartX),
                    //                    this.OffsetStartY + (y*this.SquareSize) + (y*this.OffsetStartY));
                                        
                }
            }
        }
        
        //Call super class to display any contained display list items
        projectStella.ActionSection.superClass_.Display.call(this);
    };

/**
 * Called by the framework when the user clicks on the action section.
 *  Checks to see if a valid action can be placed
 *  Adds the action icon if valid
 * @param {Event}e Event object from the click event.
 * @param {projectStella.SpellIcon}selectedSpell Spell currently selected by the user.
 */
projectStella.ActionSection.prototype.HandleClick = function(e,selectedSpell)
    {
        //if no spell - return
        if(!selectedSpell)
            return;
        if(!selectedSpell.Selected)
            return;
        
        //Check to see if we are in a valid square
        var clickRect = new goog.math.Rect(e.offsetX,e.offsetY,10,10);
        for(y=0;y<this.NumberSquaresY;y++)
        {
            for(x=0;x<this.NumberSquaresX;x++)
            {
                //Check that this is a valid "next step"
                if(this.ValidPlacement.indexOf((this.NumberSquaresX*y)+x) != -1)
                {
                    var displayRect = new goog.math.Rect(this.OffsetStartX + (x*this.SquareSize) + (x*this.OffsetStartX),
                                                        this.OffsetStartY + (y*this.SquareSize) + (y*this.OffsetStartY),
                                                        this.SquareSize, 
                                                        this.SquareSize);
                    if(clickRect.intersects(displayRect))
                    {
                        //found a match inside a square - now check to see if a valid placement
                        var actionIcon = new projectStella.ActionIcon(selectedSpell,(this.NumberSquaresX*y)+x,displayRect);
                        this.DisplayList.push(actionIcon);
                        
                        selectedSpell.SetUnSelected();
                        
                        //Add next indicator
                        var ballIcon = new projectStella.ImgSprite("img/GreenBall.gif",
                                                    this.OffsetStartX + ((x+1)*this.SquareSize) + ((x+1)*this.OffsetStartX) - 14,
                                                    this.OffsetStartY + (y*this.SquareSize) + (y*this.OffsetStartY) + 10,
                                                    0,0,13,13,0,0,-1);
                        
                        this.DisplayList.push(ballIcon);
                        
                        this.ValidPlacement.splice(this.ValidPlacement.indexOf((this.NumberSquaresX*y)+x));
                        this.ValidPlacement.push((this.NumberSquaresY*y)+x+1);
                    }
                }
            }
        }
    };
    
    