function deadboltExample(phrase, callback) {
    var self = this;

    self.phrase = ko.observable(phrase);
    self.simple = ko.observable('');
    self.withPin = ko.observable('');
    self.withSpecial = ko.observable('');
    self.caseSensitive = ko.observable('');
    self.short = ko.observable('');

    self.generatedPassword = ko.computed(function () {
        if (self.phrase().length > 0) {
            self.simple(callback(self.phrase(), { pin: '0000', useSpecial: false, caseSensitive: false, passwordLength: 15 }));
            self.withPin(callback(self.phrase(), { pin: '1234', useSpecial: false, caseSensitive: false, passwordLength: 15 }));
            self.withSpecial(callback(self.phrase(), { pin: '1234', useSpecial: true, caseSensitive: false, passwordLength: 15 }));
            self.caseSensitive(callback(self.phrase(), { pin: '1234', useSpecial: true, caseSensitive: true, passwordLength: 15 }));
            self.short(callback(self.phrase(), { pin: '1234', useSpecial: true, caseSensitive: true, passwordLength: 8 }));
        }
        else {
            return '';
        }
    });
}

function deadboltExamplePage() {
    var self = this;

    self.selectedEngine = ko.observable(1);
    self.availableEngines = ko.observableArray(deadboltPasswordGenerator.getAvailableEngines());
    self.examples = ko.observableArray(examples);

    self.encodePassword = function (phrase, options) {
        options.engineId = self.selectedEngine();
        return deadboltPasswordGenerator.encodePassword(phrase, options);
    };

    self.examples.push(new deadboltExample('Grocery Shopping', self.encodePassword));
    self.examples.push(new deadboltExample('Black Horse Banking', self.encodePassword));
    self.examples.push(new deadboltExample('Bird Song Status Update', self.encodePassword));
    self.examples.push(new deadboltExample('Dark Blue Social', self.encodePassword));
    self.examples.push(new deadboltExample('Rainforest Book Shop', self.encodePassword));
};

var examples = new Array();


var viewModel = new deadboltExamplePage(examples);
ko.applyBindings(viewModel);