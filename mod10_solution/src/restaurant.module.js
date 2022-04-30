(function() {
  "use strict";

  /**
   * Restaurant module that includes the public module as a dependency
   */
  angular.module('restaurant', ['public'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {

    // If user goes to a path that doesn't exist, redirect to public root
    $urlRouterProvider.otherwise('/');    
  }
})();
