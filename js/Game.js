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
goog.require('goog.ui.Dialog');

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
                worldCellX = 10;
                worldCellY = 5;
                
                actionSectionCellX = 5;
                actionSectionCellY = 2;
                
                var dialog1 = new goog.ui.Dialog();
                dialog1.setContent('Your first spell is a basic Move.<br>It will move your Dragon one space forward the way it is facing.');
                dialog1.setTitle('Move Forward Spell');
                dialog1.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
                dialog1.setVisible(true);
                
                break;
            
            case 2:
                worldCellX = 10;
                worldCellY = 5;
                
                actionSectionCellX = 5;
                actionSectionCellY = 2;
                
                break;
            
            case 3:
                worldCellX = 10;
                worldCellY = 5;
                
                actionSectionCellX = 5;
                actionSectionCellY = 2;
                
                var dialog1 = new goog.ui.Dialog();
                dialog1.setContent('You have earned the turn spells.<br>These will rotate your Dragon to the right/left.');
                dialog1.setTitle('Turn Spells');
                dialog1.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
                dialog1.setVisible(true);
                
                break;
            
             case 4:
                worldCellX = 10;
                worldCellY = 5;
                
                actionSectionCellX = 5;
                actionSectionCellY = 2;
                
                break;
            
        }
        
        worldWidth = (worldCellX * 16);
        worldHeight = (worldCellY * 16);
                
        this.ValidActionSection = true;
                
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
        
         /**
            * Boolean flag indicating if the current spellbook is valid.
            *   This gets set to false when the player tries to cast but fails to get to the goal.
            *   A reset must be done
            * @type {boolean}
            * @public
        */
        this.ValidActionSection = true;
        
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
        
        goog.dom.appendChild(section, goog.dom.createTextNode('\u00a0\u00a0'));
        var buttonReset = goog.dom.createDom('button', {'type':'button','id':'resetButton','class':'GoButton'});
        goog.dom.appendChild(buttonReset, goog.dom.createTextNode('Reset'));
        goog.dom.appendChild(section, buttonReset);
        
        goog.events.listen(buttonGo, goog.events.EventType.CLICK, this.HandleGoClick,false,this);
        goog.events.listen(buttonReset, goog.events.EventType.CLICK, this.HandleResetClick,false,this);
 
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
            
            //Check to see if we are on destination square
            if(this.WorldObj.FinalGem.CellX == this.WorldObj.MainCharacter.CellX &&
               this.WorldObj.FinalGem.CellY == this.WorldObj.MainCharacter.CellY)
            {
                //Finish!
                var dialog1 = new goog.ui.Dialog();
                dialog1.setContent('You reached the goal!');
                dialog1.setTitle('Good Job!');
                dialog1.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
                goog.events.listen(dialog1, goog.ui.Dialog.EventType.SELECT, function(e)
                {
                    var newLevel = this.Level+1;
                    window.location.href = "PlayLevel.html?Level=" + String(newLevel);
                },false,this);
                dialog1.setVisible(true);
            }
            else
            {
                //Failed to find goal - need to tell player and disable Go button
                this.ValidActionSection = false;
                
                var dialog1 = new goog.ui.Dialog();
                dialog1.setContent('You did not reach the goal.<br>Try again!');
                dialog1.setTitle('Try again!');
                dialog1.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
                dialog1.setVisible(true);
            }
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
        else if(!this.ValidActionSection)
        {
            var dialog1 = new goog.ui.Dialog();
            dialog1.setContent('Your Dragon needs to reach the goal with a single set of spells.<br>You will need to Reset and try again.');
            dialog1.setTitle('Click Reset');
            dialog1.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
            dialog1.setVisible(true);
        }
        else
        {
            this.StartAnimation();
        }
    };
    
/**
 * Handler function - called when the user clicks on the Reset button
 *  Reset the current level
 * @param {event}e MouseClick event argument 
 */
projectStella.Game.prototype.HandleResetClick = function(e)
    {
        this.CurrentlyAnimating = false;
        this.SpellItemSelected = null;
        this.WorldObj.Init("worldCanvas");
        this.ActionSection.Init("actionCanvas");
        //this.ActionSection.DisplayList = [];
        if(this.SpellBook.SelectedItem)
        {
            this.SpellBook.SelectedItem.SetUnSelected();
            this.SpellBook.SelectedItem = null;
        }
        this.ValidActionSection = true;
        
    };