function deadboltExample(phrase) {
    var self = this;

    self.phrase = ko.observable(phrase);
    self.simple = ko.observable('');
    self.withPin = ko.observable('');
    self.withSpecial = ko.observable('');
    self.caseSensitive = ko.observable('');
    self.short = ko.observable('');

    self.generatedPassword = ko.computed(function () {
        if (self.phrase().length > 0) {
            self.simple(deadboltPasswordGenerator.encodePassword(self.phrase(), '0000', false, false, 15));
            self.withPin(deadboltPasswordGenerator.encodePassword(self.phrase(), '1234', false, false, 15));
            self.withSpecial(deadboltPasswordGenerator.encodePassword(self.phrase(), '1234', true, false, 15));
            self.caseSensitive(deadboltPasswordGenerator.encodePassword(self.phrase(), '1234', true, true, 15));
            self.short(deadboltPasswordGenerator.encodePassword(self.phrase(), '1234', true, true, 8));
        }
        else {
            return '';
        }
    });
}

function deadboltExamplePage(examples) {
    var self = this;

    self.examples = ko.observableArray(examples);
};

var examples = new Array();
examples.push(new deadboltExample('Grocery Shopping'));
examples.push(new deadboltExample('Black Horse Banking'));
examples.push(new deadboltExample('Bird Song Status Update'));
examples.push(new deadboltExample('Dark Blue Social'));
examples.push(new deadboltExample('Rainforest Book Shop'));

var viewModel = new deadboltExample(examples);
ko.applyBindings(viewModel);