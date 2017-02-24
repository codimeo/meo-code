/*

    meo.js

    Private module for Meo-Studio

    written by Nizr AYED
    nizar.ayed@upgrade-code.org

    Copyright (C) 2017 by Nizar AYED

    This file is part of Meo-Studio in extension of Snap!

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    prerequisites:
    --------------
    needs gui.js
*/

// Global settings /////////////////////////////////////////////////////

/*global modules, BoxMorph, HandleMorph, PushButtonMorph, SyntaxElementMorph,
Color, Point, WatcherMorph, StringMorph, SpriteMorph, ScrollFrameMorph,
CellMorph, ArrowMorph, MenuMorph, snapEquals, Morph, isNil, localize,
MorphicPreferences, TableDialogMorph, SpriteBubbleMorph, SpeechBubbleMorph,
TableFrameMorph, TableMorph, Variable, isSnapObject*/

// Global stuff ////////////////////////////////////////////////////////

modules.meo = '2017-February-24';

// Declarations

var Meo_Morph;

// Meo_Morph inherits from IDE_Morph:

Meo_Morph.prototype = new IDE_Morph();
Meo_Morph.prototype.constructor = Meo_Morph;
Meo_Morph.uber = IDE_Morph.prototype;

// IDE_Morph instance creation:

function Meo_Morph(isAutoFill) {
  this.init(isAutoFill);
}

Meo_Morph.prototype.init = function (isAutoFill) {
    // initialize inherited properties:
    Meo_Morph.uber.init.call(this);

    // override inherited properites:
    this.logoURL = this.resourceURL('meo-logo-12x43.png');
}
