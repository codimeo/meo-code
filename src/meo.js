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

/*global modules, IDE_Morph, StageMorph, Color, Cloud*/

// Global stuff ////////////////////////////////////////////////////////

modules.meo = "2020-Mars-25";

// Declarations

var Meo_Morph = function (isAutoFill) {
    this.init(isAutoFill);
};

// Meo_Morph inherits from IDE_Morph:

Meo_Morph.prototype = new IDE_Morph();
Meo_Morph.prototype.constructor = Meo_Morph;
Meo_Morph.uber = IDE_Morph.prototype;

// Meo-Cloud
// @TODO : Make use of Meo-Cloud everywhere
Cloud.prototype.knownDomains = {
    'Snap!Cloud' : 'https://cloud.snap.berkeley.edu',
    'Snap!Cloud (cs10)' : 'https://snap-cloud.cs10.org',
    'Snap!Cloud (staging)': 'https://snap-staging.cs10.org',
    'MeoCloud' : 'http://meocloud.codimeo.com:8080',
    'localhost': 'http://localhost:8080',
    'localhost (secure)': 'https://localhost:4431'
};

Cloud.prototype.defaultDomain = Cloud.prototype.knownDomains['MeoCloud'];

// IDE_Morph instance creation:

Meo_Morph.prototype.init = function () {
    // initialize inherited properties:
    Meo_Morph.uber.init.call(this);

    // override inherited properites:
    this.logoURL = this.resourceURL("meo-logo-complet-24x95.png"); 
    StageMorph.prototype.paletteColor = new Color(55, 0, 0);
    StageMorph.prototype.paletteTextColor = new Color(0, 255, 0);
};
