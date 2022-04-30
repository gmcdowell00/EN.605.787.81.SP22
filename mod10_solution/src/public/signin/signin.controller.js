(function() {
  "use strict";
  angular.module('public')
    .controller('SignInController', SignInController);

  // Inject the items
  SignInController.$inject = ['items', 'RegistrationService'];
  function SignInController (items, RegistrationService) {

    // Ng-model variables
    var reg = this;
    var service = RegistrationService;
    reg.user = {};
    reg.items = items.menu_items;

    // Submit
    reg.createUser = function() {
      var user = reg.user;
      service.setUser(reg.user);
      reg.completed = true;
    };

    // Validate input
    reg.isValidInput = function() {
      if (reg.user.shortname !== undefined) {
        if (reg.user.shortname.length > 1) {
          for (var i = 0; i < reg.items.length; i++) {
            if (reg.items[i].short_name.toLowerCase().includes(reg.user.shortname.toLowerCase())) {
              reg.user.meal = reg.items[i].short_name + " " + reg.items[i].name + "-" + reg.items[i].description;
              return false; // don't display error
            }
          }
            return true; // display message
        }
      }
    }
    console.log(reg.isValid);
  }
})();
