(function() {
  "use strict";

  angular.module('common')
    .service('RegistrationService', RegistrationService);

  function RegistrationService() {
    var service = this;
    var localUser = {};
    var exists = false;

    service.setUser = function(user) {
      console.log(user);
      localUser = user;
      exists = true;
    }

    service.getUser = function() {
      return localUser;
    }
  }
})();
