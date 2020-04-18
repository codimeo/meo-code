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

/*global modules, Cloud, Color, IDE_Morph, Process, SpriteMorph, StageMorph*/

// Global stuff ////////////////////////////////////////////////////////

modules.meo = "2020-April-17";

// Meo-Cloud
// @TODO : Make use of Meo-Cloud everywhere
Cloud.prototype.knownDomains = {
    'Snap!Cloud' : 'https://cloud.snap.berkeley.edu',
    'Snap!Cloud (cs10)' : 'https://snap-cloud.cs10.org',
    'Snap!Cloud (staging)': 'https://snap-staging.cs10.org',
    'MeoCloud' : 'https://meocloud.codimeo.com',
    'localhost': 'http://localhost:8080',
    'localhost (secure)': 'https://localhost:4431'
};

Cloud.prototype.defaultDomain = Cloud.prototype.knownDomains['MeoCloud'];

// Declarations

var Meo_Morph = function (isAutoFill) {
    this.init(isAutoFill);
};

// Meo_Morph inherits from IDE_Morph:

Meo_Morph.prototype = new IDE_Morph();
Meo_Morph.prototype.constructor = Meo_Morph;
Meo_Morph.uber = IDE_Morph.prototype;

// IDE_Morph instance creation:

Meo_Morph.prototype.init = function () {
    // initialize inherited properties:
    Meo_Morph.uber.init.call(this);

    // override inherited properites:
    this.logoURL = this.resourceURL("meo-logo-complet-24x95.png"); 
    StageMorph.prototype.paletteColor = new Color(55, 0, 0);
    StageMorph.prototype.paletteTextColor = new Color(0, 255, 0);

    // Push new cateogries
    SpriteMorph.prototype.categories.push("mqtt");
    SpriteMorph.prototype.categories.push("tinywebdb");

    // Push categories' colors
    // @TODO : choose more appropriate colors
    SpriteMorph.prototype.blockColor.mqtt = new Color(4, 148, 220);
    SpriteMorph.prototype.blockColor.tinywebdb = new Color(4, 148, 220);
};

Meo_Morph.prototype.importLib = function (libraryText) {
    var blocks,
        myself = this;

    // Add a library as a block category

    // Import corresponding librairies
    // WARNING : Each block of the library should mention the correct category
    //           where it should appear

    if (Process.prototype.isCatchingErrors) {
        try {
            blocks = this.serializer.loadBlocks(libraryText, myself.stage);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
            //console.log('Load failed: ' + err);
        }
    } else {
        blocks = this.serializer.loadBlocks(libraryText, myself.stage);
    }

    blocks.forEach(function (def) {
        def.receiver = myself.stage;
        myself.stage.globalBlocks.push(def);
        myself.stage.replaceDoubleDefinitionsFor(def);
    });
};

Meo_Morph.prototype.openIn = function (world) {
    var libFileName, intervalHandle,
        myself = this;

    Meo_Morph.uber.openIn.call(this, world);

    // Import MQTT Library
    intervalHandle = setInterval(function () {
        libFileName = 'mqtt-blocks-meo-v1.0.xml';
        myself.getURL(myself.resourceURL('libraries', libFileName), myself.importLib);
        libFileName = 'tinywebdb-meo.xml';
        myself.getURL(myself.resourceURL('libraries', libFileName), myself.importLib);
        clearInterval(intervalHandle);
    }, 2000);
};
