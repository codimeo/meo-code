/*

    meo.js

    Module privé pour Meo-Studio

    Créé par Nizr AYED
    nizar.ayed@upgrade-code.org

    Tous droits réservés (C) 2017 by Nizar AYED

    Ce fichier est une partie du Meo-Studio, plateforme de développement
    visuel basée sur celle de Snap! créé par Jens Mönig.

    Meo-Studio est soumis à une licence privée soumise à des conditions générales
    d'utilisation (https://codimeo.com/CGU.html).

    Snap! est un logiciel libre: vous pouvez le redistribuer et / ou le modifier
    sous les termes de la Licence Publique Générale GNU Affero comme publié par
    la Free Software Foundation, soit la version 3 de la licence ou, selon votre
    choix, toute version ultérieure.

    Ce programme, Snap!, est distribué dans l'espoir qu'il sera utile, mais SANS
    AUCUNE GARANTIE; sans même la garantie induite de QUALITÉ MARCHANDE ou
    ADÉQUATION À UN USAGE PARTICULIER. Voir le Licence publique générale GNU
    Affero pour plus de détails.

    Vous devriez avoir reçu une copie de la licence publique générale GNU Affero 
    avec ce programme. Sinon, voir <http://www.gnu.org/licenses/>.

    Pré-requis pour le bon fonctionnement de ce fichier:
    --------------
    Requière    gui.js
                meo.js
*/

// Paramètres globaux /////////////////////////////////////////////////////

/*global modules, Cloud, Color, IDE_Morph, Process, SpriteMorph, StageMorph,
localize, morphicVersion, DialogBoxMorph, SnapTranslator*/

// Généralités ////////////////////////////////////////////////////////

modules.meo = "2020-April-29";

// Meo-Cloud
// @TODO : Utiliser Meo-Cloud partout
Cloud.prototype.knownDomains = {
    'Snap!Cloud' : 'https://cloud.snap.berkeley.edu',
    'Snap!Cloud (cs10)' : 'https://snap-cloud.cs10.org',
    'Snap!Cloud (staging)': 'https://snap-staging.cs10.org',
    'MeoCloud' : 'https://meocloud.codimeo.com',
    'localhost': 'http://localhost:8080',
    'localhost (secure)': 'https://localhost:4431'
};

Cloud.prototype.defaultDomain = Cloud.prototype.knownDomains['MeoCloud'];

// Déclaration de la classe Meo_Morph :

var Meo_Morph = function (isAutoFill) {
    this.init(isAutoFill);
};

// Meo_Morph hérite de IDE_Morph :

Meo_Morph.prototype = new IDE_Morph();
Meo_Morph.prototype.constructor = Meo_Morph;
Meo_Morph.uber = IDE_Morph.prototype;

// Création instance Meo_Morph :

Meo_Morph.prototype.init = function () {
    // Initialiser les propriétés héritées :
    Meo_Morph.uber.init.call(this);

    // Remplacer certaines propriétés de base :
    this.logoURL = this.resourceURL("meo-logo-complet-24x95.png"); 
    StageMorph.prototype.paletteColor = new Color(55, 0, 0);
    StageMorph.prototype.paletteTextColor = new Color(0, 255, 0);

    // Prendre en compte les catégories PRO
    SpriteMorph.prototype.categories.push("mqtt");
    SpriteMorph.prototype.categories.push("tinywebdb");

    // Assigner les couleurs aux catégories PRO
    // @TODO : Choisir des couleurs appropriées
    SpriteMorph.prototype.blockColor.mqtt = new Color(4, 148, 220);
    SpriteMorph.prototype.blockColor.tinywebdb = new Color(4, 148, 220);
};

// Méthode d'import des bibliothèques PRO comme catégories

Meo_Morph.prototype.importLib = function (libraryText) {
    var blocks,
        myself = this;

    // Ajouter la bibliothèque comme catégorie PRO

    // Import des bibliothèques associées
    // ATTENTION : Les customs blocks des bibliothèques doivent, chacune
    //     mentionner la bonne catégorie dans laqeulle le bloc est censé
    //     apparaître

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

// Méthode d'ouverture du Meo_Morph dans le bon monde (world)

Meo_Morph.prototype.openIn = function (world) {
    var libFileName, intervalHandle,
        myself = this;

    Meo_Morph.uber.openIn.call(this, world);

    // Importer effectif des bibliothèques
    intervalHandle = setInterval(function () {
        // Bibliothèque MQTT
        libFileName = 'mqtt-blocks-meo-v1.0.xml';
        myself.getURL(myself.resourceURL('libraries', libFileName), myself.importLib);
        // Bibliothèque TinyWebdb
        libFileName = 'tinywebdb-meo.xml';
        myself.getURL(myself.resourceURL('libraries', libFileName), myself.importLib);
        clearInterval(intervalHandle);
    }, 2000);
};

// Méthode spéciale pour la localisation spécifique à Meo-Studio

Meo_Morph.prototype.setLanguage = function (lang, callback, noSave) {
    function meoTranslate() {
        var meoTranslation = document.getElementById('meoLanguage'),
            src = this.resourceURL('locale', 'meo-lang.js');
            //myself = this;
    
        if (meoTranslation) {
            document.head.removeChild(meoTranslation);
        }
    
        meoTranslation = document.createElement('script');
        meoTranslation.id = 'meoLanguage';
        meoTranslation.onload = function () {
    
            //myself.reflectLanguage(lang, callback, noSave);
        };
        document.head.appendChild(meoTranslation);
        meoTranslation.src = src;
    }

    Meo_Morph.uber.setLanguage.call(this, lang, meoTranslate, noSave);
}

// Traduction des actions de menu Meo

Meo_Morph.prototype.aboutSnap = function () {
    var dlg, aboutTxt, noticeTxt, creditsTxt, versions = '', translations,
        module, btn1, btn2, btn3, btn4, licenseBtn, translatorsBtn,
        world = this.world();

    aboutTxt = 'Meo-Code! 0.9.0\nLe studio de d\u00E9veloppement visuel\n'
        + 'Tous droits réservés \u24B8 2020 Nizar AYED \n'
        + 'sur le code modifi\u00E9\n\n'
        + 'Inpsir\u00E9 par Snap!\n'
        + 'Copyright \u24B8 2008-2020 Jens M\u00F6nig and '
        + 'Brian Harvey\n'
        + 'jens@moenig.org, bh@cs.berkeley.edu\n\n'

        + 'Snap! is developed by the University of California, Berkeley\n'
        + '          with support from the National Science Foundation (NSF), '
        + 'MioSoft,          \n'
        + 'the Communications Design Group (CDG) at SAP Labs, and the\n'
        + 'Human Advancement Research Community (HARC) at YC Research.\n'

        + 'The design of Snap! is influenced and inspired by Scratch,\n'
        + 'from the Lifelong Kindergarten group at the MIT Media Lab\n\n'

        + 'for more information see http://snap.berkeley.edu\n'
        + 'and http://scratch.mit.edu';

    noticeTxt = localize('License')
        + '\n\n'
        + 'Snap! is free software: you can redistribute it and/or modify\n'
        + 'it under the terms of the GNU Affero General Public License as\n'
        + 'published by the Free Software Foundation, either version 3 of\n'
        + 'the License, or (at your option) any later version.\n\n'

        + 'This program is distributed in the hope that it will be useful,\n'
        + 'but WITHOUT ANY WARRANTY; without even the implied warranty of\n'
        + 'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the\n'
        + 'GNU Affero General Public License for more details.\n\n'

        + 'You should have received a copy of the\n'
        + 'GNU Affero General Public License along with this program.\n'
        + 'If not, see http://www.gnu.org/licenses/\n\n'

        + 'Want to use Snap! but scared by the open-source license?\n'
        + 'Get in touch with us, we\'ll make it work.';

    creditsTxt = localize('Contributors')
        + '\n\n<N/A>';

    for (module in modules) {
        if (Object.prototype.hasOwnProperty.call(modules, module)) {
            versions += ('\n' + module + ' (' +
                            modules[module] + ')');
        }
    }
    if (versions !== '') {
        versions = localize('current module versions:') + ' \n\n' +
            'morphic (' + morphicVersion + ')' +
            versions;
    }
    translations = localize('Translations') + '\n' + SnapTranslator.credits();

    dlg = new DialogBoxMorph();
    dlg.inform('About Snap', aboutTxt, world);
    btn1 = dlg.buttons.children[0];
    translatorsBtn = dlg.addButton(
        function () {
            dlg.body.text = translations;
            dlg.body.drawNew();
            btn1.show();
            btn2.show();
            btn3.hide();
            btn4.hide();
            licenseBtn.hide();
            translatorsBtn.hide();
            dlg.fixLayout();
            dlg.drawNew();
            dlg.setCenter(world.center());
        },
        localize('Translators...')
    );
    btn2 = dlg.addButton(
        function () {
            dlg.body.text = aboutTxt;
            dlg.body.drawNew();
            btn1.show();
            btn2.hide();
            btn3.show();
            btn4.show();
            licenseBtn.show();
            translatorsBtn.hide();
            dlg.fixLayout();
            dlg.drawNew();
            dlg.setCenter(world.center());
        },
        localize('Back...')
    );
    btn2.hide();
    licenseBtn = dlg.addButton(
        function () {
            dlg.body.text = noticeTxt;
            dlg.body.drawNew();
            btn1.show();
            btn2.show();
            btn3.hide();
            btn4.hide();
            licenseBtn.hide();
            translatorsBtn.hide();
            dlg.fixLayout();
            dlg.drawNew();
            dlg.setCenter(world.center());
        },
        localize('License...')
    );
    btn3 = dlg.addButton(
        function () {
            dlg.body.text = versions;
            dlg.body.drawNew();
            btn1.show();
            btn2.show();
            btn3.hide();
            btn4.hide();
            licenseBtn.hide();
            translatorsBtn.hide();
            dlg.fixLayout();
            dlg.drawNew();
            dlg.setCenter(world.center());
        },
        localize('Modules...')
    );
    btn4 = dlg.addButton(
        function () {
            dlg.body.text = creditsTxt;
            dlg.body.drawNew();
            btn1.show();
            btn2.show();
            translatorsBtn.show();
            btn3.hide();
            btn4.hide();
            licenseBtn.hide();
            dlg.fixLayout();
            dlg.drawNew();
            dlg.setCenter(world.center());
        },
        localize('Credits...')
    );
    translatorsBtn.hide();
    dlg.fixLayout();
    dlg.drawNew();
};
