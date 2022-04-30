(function() {
  "use strict";

  angular.module('public')
    .controller('AboutMeController', AboutMeController);

  AboutMeController.$inject = ['user'];
  function AboutMeController(user) {
    console.log(user);
    var me = this;
    me.user = user;
    me.show = false;
    if (user.firstname != undefined) {
      me.show = true;
    }
    else {
       me.show = false;
    }
  }

})();
