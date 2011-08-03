/**
 * @fileOverview This file has functions related to the Game object.
 * @author Zach Greenvoss
 * @version 1.0
 * Copyright © Zach Greenvoss 
 * Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
 */

goog.provide('projectStella');
goog.provide('projectStella.Game');

goog.require('projectStella.DisplayableCanvas');
goog.require('projectStella.ImgSprite');
goog.require('projectStella.ActionSection');
goog.require('projectStella.SpellBook');
goog.require('goog.dom');
goog.require('goog.ui.Button');
/**
 * @namespace Base namespace for the projectStella library.  
 * @const
 */
var projectStella = projectStella || {}; // Identifies this file as the Closure base.

/**
 * Constructor for an Game object.
 * @class Primary object for controlling the user interaction and game logic.<br>
 *  Hosts all other projectStella classes in some way or another.
 * @param {number} level Level to load data for.
 * @constructor
 */
projectStella.Game = function(level)
    {
        /**
            * Level of the current game
            * @type {number}
            * @public
        */
        this.Level = level;
        
        var worldWidth;
        var worldHeight;
        var worldCellX;
        var worldCellY;
        
        var actionSectionWidth;
        var actionSectionHeight;
        
        //Figure out world sizes based on level
        switch(this.Level)
        {
            case 1:
                worldCellX = 20;
                worldCellY = 10;
                worldWidth = (worldCellX * 16);
                worldHeight = (worldCellY * 16);
                
                actionSectionCellX = 5;
                actionSectionCellY = 2;
                
                break;
        }
        
        //Create various objects for controlling game
        /**
            * Controller object for the game level canvas
            * @type {projectStella.World}
            * @public
        */
        this.WorldObj = new projectStella.World(level,worldCellX,worldCellY);
        
         /**
            * Controller object for the action section canvas
            * @type {projectStella.ActionSection}
            * @public
        */
        this.ActionSection= new projectStella.ActionSection(actionSectionCellX,actionSectionCellY);
        
        /**
            * Controller object for the spellbook canvas
            * @type {projectStella.SpellBook}
            * @public
        */
        this.SpellBook = new projectStella.SpellBook(132,100);
        
        /**
            * Boolean flag indicating if we are currently showing the results of a computation
            * @type {boolean}
            * @public
        */
        this.CurrentlyAnimating = false;
        
        //Create canvas dom objects///////////////////
        var section = document.getElementById('playSpace');
        var worldCanvas = goog.dom.createDom('canvas', {'id':'worldCanvas','width': this.WorldObj.width, 'height':this.WorldObj.height});
        goog.dom.appendChild(section, worldCanvas);
        goog.dom.appendChild(section, goog.dom.createDom('br'));
        
        var nobrElem = goog.dom.createDom('nobr');
        goog.dom.appendChild(section, nobrElem);
                             
        var actionCanvas = goog.dom.createDom('canvas', {'id':'actionCanvas','width': this.ActionSection.width, 'height':this.ActionSection.height});
        goog.dom.appendChild(nobrElem, actionCanvas);
        
        goog.dom.appendChild(nobrElem, goog.dom.createTextNode('\u00a0\u00a0'));
        
        var spellBookCanvas = goog.dom.createDom('canvas', {'id':'spellBookCanvas','width': '132', 'height':'100'});
        goog.dom.appendChild(nobrElem, spellBookCanvas);
        
        goog.dom.appendChild(section, goog.dom.createDom('br'));
        var buttonGo = goog.dom.createDom('button', {'type':'button','id':'goButton','class':'GoButton'});
        goog.dom.appendChild(buttonGo, goog.dom.createTextNode('GO!'));
        goog.dom.appendChild(section, buttonGo);
        
        goog.events.listen(buttonGo, goog.events.EventType.CLICK, this.HandleGoClick,false,this);
 
        //////////////////////////////////////////
        
        //Now init various objects...
        this.WorldObj.Init("worldCanvas");
        
        this.ActionSection.Init("actionCanvas");
        goog.events.listen(this.ActionSection.canvasItem, goog.events.EventType.CLICK, this.HandleActionClick, false, this);
        
        this.SpellBook.Init("spellBookCanvas",level);
        goog.events.listen(this.SpellBook.canvasItem, goog.events.EventType.CLICK, this.HandleSpellbookClick, false, this);
        
        /**
            * Represents the currently selected spell icon (if any)
            * @type {projectStella.SpellIcon}
            * @public
        */
        this.SpellItemSelected = null;
        
        //setup update/display loop
        var myself = this;
        function callUpdate() {myself.Update();}
        
        setInterval(callUpdate, 100)
        
    };

/**
 * Update function - called each timeslice
 */
projectStella.Game.prototype.Update = function()
    {
        this.WorldObj.Update();
        this.SpellBook.Update();
        this.ActionSection.Update();
        
        this.Display();
    };

/**
 * Display function - called each timeslice, after the Update function
 */  
projectStella.Game.prototype.Display = function()
    {
        this.WorldObj.Display();
        this.SpellBook.Display();
        this.ActionSection.Display();
    };

/**
 * Kicks off the current stored computation
 */  
projectStella.Game.prototype.StartAnimation = function()
    {
        //Flip flag to indicate we are busy
        this.CurrentlyAnimating = true;
        
        //Select the first cell as the active spell
        this.ActionSection.HighlightNextSpell();
        
        //Tell the main character to "do" the first action
        this.WorldObj.MainCharacter.ApplySpell(this.ActionSection,this.DoneMoving,this);
    };
  
/**
 * Callback function - called when the current spell is done animating
 */  
projectStella.Game.prototype.DoneMoving = function()
    {
        //try to highlight the next cell
        if(this.ActionSection.HighlightNextSpell())
        {
            //Tell the main character to "do" the next action
            this.WorldObj.MainCharacter.ApplySpell(this.ActionSection,this.DoneMoving,this);
        }
        else
        {
            //no next action - finish
            this.CurrentlyAnimating = false;
            this.ActionSection.Reset();
        }
    };
    
/**
 * Handler function - called when the user clicks on the Spellbook canvas
 * @param {event}e MouseClick event argument 
 */
projectStella.Game.prototype.HandleSpellbookClick = function(e)
    {
        this.SpellBook.HandleClick(e);
    };

/**
 * Handler function - called when the user clicks on the Action canvas
 * @param {event}e MouseClick event argument 
 */
projectStella.Game.prototype.HandleActionClick = function(e)
    {
        this.ActionSection.HandleClick(e,this.SpellBook.SelectedItem);
    };
    
/**
 * Handler function - called when the user clicks on the GO button
 *  Should kick off computation
 * @param {event}e MouseClick event argument 
 */
projectStella.Game.prototype.HandleGoClick = function(e)
    {
        if(this.CurrentlyAnimating)
            return; //Don't do anything if in the middle of animation
        else
        {
            this.StartAnimation();
        }
    };