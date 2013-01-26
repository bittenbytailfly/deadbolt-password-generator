function deadboltExample() {
    var self = this;
    self.phrase = ko.observable('');
    self.simple = ko.observable('');
    self.withPin = ko.observable('');
    self.withSpecial = ko.observable('');
    self.caseSensitive = ko.observable('');
    self.short = ko.observable('');
    
    self.generatePassword = function() {
        self.simple(encodePassword(self.passPhrase, '0000', false, false, 15));
    }
};

var viewModel = new deadboltExample();
ko.applyBindings(viewModel);