(function () {
  'use strict';
  angular.module('myApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'founditems.html',
      restrict: 'EA',
      scope: {
        items: '<',
        onRemove: '&'
      }, 
      controller: FoundItemsDirectiveController, 
      controllerAs: 'ndCtrl',
      bindToController: true

    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var ndCtrl = this;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController (MenuSearchService){
    var ndCtrl = this;
    ndCtrl.searchTerm = "";
    ndCtrl.found = MenuSearchService.getFoundMenuItems();
    ndCtrl.findMatches = function() {      


      if (ndCtrl.searchTerm == "")
        return;
      if (ndCtrl.found.length > 0){
        ndCtrl.found = [];
        MenuSearchService.getClearFoundMenuItems();
      }

      var promise = MenuSearchService.getMatchedMenuItems(ndCtrl.searchTerm);
      promise.
      then(function (response) {
        ndCtrl.found = response;

      })
      .catch(function (errorResponse) {
        console.log(errorResponse.message);
      });

      console.log(ndCtrl.found);
    };



    ndCtrl.onRemove = function (index) {
      ndCtrl.found.splice(index, 1);
    };
  }



  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var foundItems = [];
    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
       method: "GET",
       url: (ApiBasePath + "/menu_items.json")
     }).then(function (result) {
     
      for (var i = 0; i < result.data.menu_items.length; i++){
        if (result.data.menu_items[i].description.toLowerCase().includes(searchTerm)){
          foundItems.push(result.data.menu_items[i]);
        }
      }
      return foundItems;
    });

   }

   service.getFoundMenuItems = function(){
    return foundItems;
   }

    service.getClearFoundMenuItems = function(){
    foundItems = [];
   }
 }
})();
