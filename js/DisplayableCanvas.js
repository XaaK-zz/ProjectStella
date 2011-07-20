/**
 * @fileOverview This file has functions related to the DisplayableCanvas object.
 * @author Zach Greenvoss
 * @version 1.0
 * Copyright © Zach Greenvoss 
 * Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */

goog.provide('projectStella.DisplayableCanvas');

/**
 * Constructor for a DisplayableCanvas object.
 * @class Base class for code to control a canvas object
 * @param {number} width Horizontal size of base canvas object - in pixels
 * @param {number} height Vertical size of base canvas object - in pixels
 * @constructor
 */
projectStella.DisplayableCanvas = function(width, height)
    {
        /**
        * Width of the canvas object - in pixels
        * @type {number}
        * @protected
        */
        this.width = width;
        
        /**
        * Height of the canvas object - in pixels
        * @type {number}
        * @protected
        */
        this.height = height;
        
        /**
        * 2D drawing context of the canvas object
        * @type {2D context}
        * @protected
        */
        this.context = null;
        
        /**
        * DOM object containing the reference to the canvas object
        * @type {DOM Element}
        * @protected
        */
        this.canvasItem = null;
        
        /**
        * List of contained sprites to update and display at each timeslice
        * @type {Array}
        * @protected
        */
        this.DisplayList = [];
    };

/**
 * Init function - called to initialize the drawing context data
 * @param {string}canvasID Name of the HTML5 canvas tag for this object
 */
projectStella.DisplayableCanvas.prototype.Init = function(canvasID)
    {
        this.context = document.getElementById(canvasID).getContext('2d');
        this.canvasItem = document.getElementById(canvasID);
    };

/**
 * Update function - called each timeslice.<br>
 *  Updates the contained sprites
 */
projectStella.DisplayableCanvas.prototype.Update = function()
    {
        for(x=0;x<this.DisplayList.length;x++)
        {
            this.DisplayList[x].UpdateState(this.context);
        }
    };

/**
 * Draw function - called each timeslice.<br>
 *  Draws the contained sprites
 */
projectStella.DisplayableCanvas.prototype.Display = function()
    {
        for(x=0;x<this.DisplayList.length;x++)
        {
            this.DisplayList[x].Draw(this.context);
        }
    };


