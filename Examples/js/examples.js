function deadboltExample() {
    var self = this;
    self.phrase = ko.observable('');
    self.simple = ko.observable('');
    self.withPin = ko.observable('');
    self.withSpecial = ko.observable('');
    self.caseSensitive = ko.observable('');
    self.short = ko.observable('');
    
    self.generatePassword = function() {
        if (self.phrase().length > 0) {
            self.simple(encodePassword(self.phrase(), '0000', false, false, 15));
            self.withPin(encodePassword(self.phrase(), '1234', false, false, 15));
            self.withSpecial(encodePassword(self.phrase(), '1234', true, false, 15));
            self.caseSensitive(encodePassword(self.phrase(), '1234', true, true, 15));
            self.short(encodePassword(self.phrase(), '1234', true, true, 8));
        }
        else {
            alert('You must enter a pass phrase');
        }
    }
};

var viewModel = new deadboltExample();
ko.applyBindings(viewModel);