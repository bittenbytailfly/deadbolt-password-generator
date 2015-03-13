//    Copyright 2009-2015 Ed Carter
//
//    This file is part of Deadbolt Password Generator.
//
//    Deadbolt Password Generator is free software: you can redistribute 
//    it and/or modify it under the terms of the GNU General Public 
//    License as published by the Free Software Foundation, either 
//    version 3 of the License, or (at your option) any later version.
//
//    Deadbolt Password Generator is distributed in the hope that it 
//    will be useful, but WITHOUT ANY WARRANTY; without even the implied 
//    warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
//    See the GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with Deadbolt Password Generator.  If not, see 
//    <http://www.gnu.org/licenses/>.

var deadboltPasswordGenerator = (function () {

    var self = this;

    self.specialChars = '!\"$%^&*()';
    self.numericChars = '0123456789';
    self.ucaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    self.lcaseChars = 'abcdefghijklmnopqrstuvwxyz';

    self.getNumericPasswordString = function (passPhrase, options) {
        var multiplier = options.pin + '669.669';
        var passNumber = 0;

        while (passPhrase.length < options.passwordLength) {
            passPhrase += passPhrase;
        }

        for (var i = 0; i < passPhrase.length; i += 1) {
            var passChar = passPhrase.charCodeAt(i);
            var passCharRnd = (passChar / multiplier).toFixed(5);
            var passPart = (passCharRnd + '').split('.')[1];
            var passNumber = (passNumber * 1) + (passPart * 1);
            if ((passNumber + '').length < options.passwordLength) {
                passNumber = passNumber + '' + i;
            }
        }

        return passNumber;
    }


    self.engines = new Array({
        id: 1,
        name: 'English Breakfast',
        process: function (passPhrase, options) {
            var password = '';
            var passNumber = self.getNumericPasswordString(passPhrase, options);

            for (var i = 0; i < options.passwordLength; i += 1) {
                var index = (passNumber + '').substr(i, 5),
                    charsToUse;

                if (options.useSpecial && (i % 7 === 6)) {
                    charsToUse = self.specialChars;
                } else if (i % 4 === 0) {
                    charsToUse = self.numericChars;
                } else if (i % 3 !== 0) {
                    charsToUse = self.lcaseChars;
                } else {
                    charsToUse = self.ucaseChars;
                }

                var arrayMarker = index % charsToUse.length;
                password += charsToUse.charAt(arrayMarker);
            }

            return password;
        }
    },
    {
        id: 2,
        name: 'Earl Grey',
        process: function (passPhrase, options) {
            var password = '';
            var passNumber = self.getNumericPasswordString(passPhrase, options);

            var charMarker = (passNumber + '').substring(5, 6);

            var splicedPassNumber = new Array();
            var passNumberArray = (passNumber + '').split('');
            var passNumberLength = (passNumber + '').length;
            for (var i = 0; i < passNumberLength; i++) {
                splicedPassNumber.push(passNumberArray[i]);
                if ((charMarker + i) % 2 == 0) {
                    splicedPassNumber.push(passNumberArray[passNumberLength - i]);
                }
            }
            passNumber = splicedPassNumber.join('');

            var symbolInsert1 = passNumber % 15;
            var symbolInsert2 = passNumber % 7;

            if (symbolInsert1 == symbolInsert2) {
                symbolInsert1 += 2;
                if (symbolInsert1 > options.passwordLength) {
                    symbolInsert1 = 0;
                }
            }

            

            for (var i = 0; i < options.passwordLength; i += 1) {
                var index = (passNumber + '').substr(i, 5),
                    charsToUse;
                              
                if (options.useSpecial && (i === symbolInsert1 || i === symbolInsert2)) {
                    charsToUse = self.specialChars;
                } else if ((charMarker + i) % 4 === 0) {
                    charsToUse = self.numericChars;
                } else if ((charMarker + i) % 3 !== 0) {
                    charsToUse = self.lcaseChars;
                } else {
                    charsToUse = self.ucaseChars;
                }

                var arrayMarker = index % charsToUse.length;
                password += charsToUse.charAt(arrayMarker);
            }

            return password;
        }
    });

    self.getEngineById = function (id) {
        for (var i = 0; i < self.engines.length; i++) {
            if (self.engines[i].id === id) {
                return self.engines[i];
            }
        }
        return null;
    };

    return {
        getAvailableEngines: function () {
            return self.engines;
        },
        encodePassword: function (passPhrase, options) {
            if (passPhrase.length < 6) {
                return '';
            }

            if (!options.caseSensitive) {
                passPhrase = passPhrase.toLowerCase();
            }

            var engineId = options.engineId || 1;
            var passwordOptions = {
                pin: options.pin || '0000',
                useSpecial: options.useSpecial === undefined ? true : options.useSpecial,
                passwordLength: options.passwordLength || 15
            };
            
            var engine = self.getEngineById(engineId);
            return engine.process(passPhrase, passwordOptions);
        }
    };
})();