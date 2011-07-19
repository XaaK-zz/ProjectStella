// Copyright © Zach Greenvoss 
// Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php

goog.provide('projectStella.Game');

goog.require('projectStella.DisplayableCanvas');
goog.require('projectStella.ImgSprite');
goog.require('projectStella.ActionSection');
goog.require('projectStella.SpellBook');
goog.require('goog.dom');

projectStella.Game = function(level)
    {
        this.Level = level;
        
        //Create canvas dom objects///////////////////
        var section = document.getElementById('playSpace');
        var worldCanvas = goog.dom.createDom('canvas', {'id':'worldCanvas','width': '640', 'height':'320'});
        goog.dom.appendChild(section, worldCanvas);
        goog.dom.appendChild(section, goog.dom.createDom('br'));
        
        var nobrElem = goog.dom.createDom('nobr');
        goog.dom.appendChild(section, nobrElem);
                             
        var actionCanvas = goog.dom.createDom('canvas', {'id':'actionCanvas','width': '490', 'height':'200'});
        goog.dom.appendChild(nobrElem, actionCanvas);
        
        goog.dom.appendChild(nobrElem, goog.dom.createTextNode('\u00a0\u00a0'));
        
        var spellBookCanvas = goog.dom.createDom('canvas', {'id':'spellBookCanvas','width': '132', 'height':'100'});
        goog.dom.appendChild(nobrElem, spellBookCanvas);
        //////////////////////////////////////////
        
        //Create various objects for controlling game
        this.WorldObj = new projectStella.World();
        this.WorldObj.Init("worldCanvas");
        this.WorldObj.BuildBackground();
        
        this.ActionSection= new projectStella.ActionSection(490,200);
        this.ActionSection.Init("actionCanvas");
        goog.events.listen(this.ActionSection.canvasItem, goog.events.EventType.CLICK, this.HandleActionClick, false, this);
        
        this.SpellBook = new projectStella.SpellBook(132,100);
        this.SpellBook.Init("spellBookCanvas");
        goog.events.listen(this.SpellBook.canvasItem, goog.events.EventType.CLICK, this.HandleSpellbookClick, false, this);
        
        this.SpellItemSelected = null;
        
        //setup update/display loop
        var myself = this;
        function callUpdate() {myself.Update();}
        
        setInterval(callUpdate, 100)
        
    };

projectStella.Game.prototype.Update = function()
    {
        this.WorldObj.Update();
        this.SpellBook.Update();
        this.ActionSection.Update();
        
        this.Display();
    };
    
projectStella.Game.prototype.Update = function()
    {
        this.WorldObj.Display();
        this.SpellBook.Display();
        this.ActionSection.Display();
    };

projectStella.Game.prototype.HandleSpellbookClick = function(e)
    {
        this.SpellBook.HandleClick(e);
    };

projectStella.Game.prototype.HandleActionClick = function(e)
    {
        this.ActionSection.HandleClick(e,this.SpellBook.SelectedItem);
    };