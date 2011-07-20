/**
 * @fileOverview This file has functions related to the SpellBook object.
 * @author Zach Greenvoss
 * @version 1.0
 * Copyright © Zach Greenvoss 
 * Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */
goog.provide('projectStella.SpellBook');

goog.require('projectStella.DisplayableCanvas');
goog.require('projectStella.ImgSprite');
goog.require('projectStella.SpellIcon');
goog.require('projectStella.SpellIconType');

goog.require('goog.events');
goog.require('goog.math.Rect');

/**
 * Constructor for an SpellBook object.
 * @class Acts as the Controller object for the Spellbook canvas
 * @param {number} width Horizontal size of the Spellbook canvas display in pixels.
 * @param {number} height Vertical size of the Spellbook canvas display in pixels.
 * @constructor
 * @extends {projectStella.DisplayableCanvas}
 */
projectStella.SpellBook = function(width, height)
    {
        projectStella.DisplayableCanvas.call(this,width, height);
    };
goog.inherits(projectStella.SpellBook, projectStella.DisplayableCanvas);

/**
 * Init the canvas object
 * @param {string} canvasID Document ID of the Spellbook canvas element.
 * @param {number} level Current level - used to determine what spells to load
 */
projectStella.SpellBook.prototype.Init = function(canvasID,level)
    {
        projectStella.SpellBook.superClass_.Init.call(this,canvasID);
        
        if(level == 1)
        {
            //Load defaults
            this.DisplayList.push(new projectStella.SpellIcon(projectStella.SpellIconType.MoveForward));
            this.DisplayList.push(new projectStella.SpellIcon(projectStella.SpellIconType.TurnRight));
            this.DisplayList.push(new projectStella.SpellIcon(projectStella.SpellIconType.TurnLeft));
        }
        
        this.SelectedItem = null;
        
    };

/**
 * Display the Spellbook Section
 */
projectStella.SpellBook.prototype.Display = function()
    {
        this.context.fillStyle = "#e3ceaf";
        this.context.fillRect(0, 0, this.width, this.height);
        
        this.context.font = "15px Arial";
        this.context.fillStyle = "#000";
        this.context.fillText("Spells",48,14)
        
        projectStella.SpellBook.superClass_.Display.call(this);
    };

/**
 * Called by the framework when the user clicks on the Spellbook section.<br>
 *  Checks to see if the user clicked on a valid spell.<br>
 *  Sets the selected spell as selected.
 * @param {Event}e Event object from the click event.
 */
projectStella.SpellBook.prototype.HandleClick = function(e)
    {
        var clickRect = new goog.math.Rect(e.offsetX,e.offsetY,10,10);
        
        for(x=0;x<this.DisplayList.length;x++)
        {
            var displayRect = new goog.math.Rect(this.DisplayList[x].XPosition,
                                                 this.DisplayList[x].YPosition,
                                                 this.DisplayList[x].Width,
                                                 this.DisplayList[x].Height);
            if(clickRect.intersects(displayRect))
            {
                //Push click to sprite
                this.DisplayList[x].Click();
                //Handle logic for selecting item
                this.SelectedItem = this.DisplayList[x];
                return;   
            }
            
        }
        this.SelectedItem = null;
    };
