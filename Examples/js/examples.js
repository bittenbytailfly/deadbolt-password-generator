function deadboltConfiguration(name, pin, useSpecial, caseSensitive, passwordLength) {
    var self = this;

    self.name = name;
    self.pin = pin;
    self.useSpecial = useSpecial;
    self.caseSensitive = caseSensitive;
    self.passwordLength = passwordLength;

    self.options = ko.computed(function() {
        return {
            pin: pin,
            useSpecial: self.useSpecial,
            caseSensitive: self.caseSensitive,
            passwordLength: self.passwordLength
        };
    });
}

function deadboltExample(phrase, callback) {
    var self = this;

    self.phrase = ko.observable(phrase);
    self.simple = ko.observable('');
    self.withPin = ko.observable('');
    self.withSpecial = ko.observable('');
    self.caseSensitive = ko.observable('');
    self.short = ko.observable('');
}

function deadboltExamplePage() {
    var self = this;

    self.selectedEngine = ko.observable(1);
    self.availableEngines = ko.observableArray(deadboltPasswordGenerator.getAvailableEngines());
    self.examples = new Array();
    self.configurations = new Array();

    self.encodePassword = function (phrase, options) {
        options.engineId = self.selectedEngine();
        return deadboltPasswordGenerator.encodePassword(phrase, options);
    };

    self.examples.push(new deadboltExample('Grocery Shopping', self.encodePassword));
    self.examples.push(new deadboltExample('Black Horse Banking', self.encodePassword));
    self.examples.push(new deadboltExample('Bird Song Status Update', self.encodePassword));
    self.examples.push(new deadboltExample('Dark Blue Social', self.encodePassword));
    self.examples.push(new deadboltExample('Rainforest Book Shop', self.encodePassword));

    self.configurations.push(new deadboltConfiguration('Low PIN', '0000', true, true, 15));
    self.configurations.push(new deadboltConfiguration('High PIN', '9999', true, true, 15));
    self.configurations.push(new deadboltConfiguration('Short (Low PIN)', '0000', true, true, 8));
    self.configurations.push(new deadboltConfiguration('Short (High PIN)', '9999', true, true, 8));
    self.configurations.push(new deadboltConfiguration('No Symbols (High PIN)', '9999', false, true, 15));
};

var examples = new Array();

var viewModel = new deadboltExamplePage(examples);
ko.applyBindings(viewModel);