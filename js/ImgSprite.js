/**
 * @fileOverview This file has functions related to the ImgSprite object.
 * @author Zach Greenvoss
 * @version 1.0
 * Copyright © Zach Greenvoss 
 * Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */
goog.provide('projectStella.ImgSprite');

/**
 * Constructor for an ImgSprite object.
 * @class Acts as a base class for displayable sprites in the system <br>
 *  Handles updates/display/animation.
 * @param {string} img URI to the image to load into this object
 * @param {number} XPos Horizontal position of this sprite in its container
 * @param {number} YPos Vertical position of this sprite in its container
 * @param {number} HPics Number of animation frames
 * @param {number} VPics Number of animation types (each row is defined as a new animation type)
 * @param {number} xSize Width of the image in pixels
 * @param {number} ySize Height of the image in pixels
 * @param {number} currentCol Current frame of animation to display
 * @param {number} currentRow Current animation row to display
 * @param {number} flipSpeed How many milliseconds to wait between animation frames
 * @constructor
 */
projectStella.ImgSprite = function(img,XPos,YPos,HPics,VPics,xSize,ySize,
                   currentCol,currentRow,flipSpeed)
{
    /**
        * Image file this sprite is based on
        * @type {Image}
        * @public
    */
    this.Image = new Image();
    this.Image.src = img;
    
    /**
        * Horizontal position of this sprite in its container
        * @type {number}
        * @public
    */
    this.XPosition = XPos;
    
    /**
        * Vertical position of this sprite in its container
        * @type {number}
        * @public
    */
    this.YPosition = YPos;
    
    /**
        * Number of animation frames
        * @type {number}
        * @public
    */
    this.HPics - HPics;
    
    /**
        * Number of animation types
        * @type {number}
        * @public
    */
    this.VPics = VPics;
    
    /**
        * Width of a single frame of this sprite
        * @type {number}
        * @public
    */
    this.Width = xSize;
    
    /**
        * Height of a single frame of this sprite
        * @type {number}
        * @public
    */
    this.Height = ySize;
    
    /**
        * Current row of animation to display
        * @type {number}
        * @public
    */
    this.CurrentRow = currentRow;
    
    /**
        * Current frame of animation to display
        * @type {number}
        * @public
    */
    this.CurrentCol = currentCol;
    
    /**
        * How many milliseconds to wait between animation frames
        * @type {number}
        * @public
    */
    this.FlipSpeed = flipSpeed;
    
    /**
        * How many milliseconds it has been since last animation flip
        * @type {number}
        * @protected
    */
    this.LastFlippedTime = new Date().getTime();
};

/**
 * Update function - called each timeslice <br>
 *  Manages low-level animation frames
 */
projectStella.ImgSprite.prototype.UpdateState = function()
    {
        var currentTime = new Date().getTime();
        if(this.FlipSpeed > 0)
        {
            if((currentTime - this.LastFlippedTime) > flipSpeed)
            {
                this.CurrentCol++;
                if(this.CurrentCol >= HPics)
                    this.CurrentCol = 0;
                    
                this.LastFlippedTime = new Date().getTime();
            }
        }
    };

/**
 * Draw function - called each timeslice
 * @param {canvas context}context Drawing context
 */
projectStella.ImgSprite.prototype.Draw = function(context)
    {
        context.drawImage(this.Image,
                          (this.CurrentCol * this.Width),
                          (this.CurrentRow * this.Height),
                          this.Width,this.Height,
                          this.XPosition,
                          this.YPosition,
                          this.Width,this.Height);
    };
