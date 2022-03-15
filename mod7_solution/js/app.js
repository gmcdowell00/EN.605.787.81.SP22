// IIFE
(function () {
  'use strict'

  angular.module('ShoppingListCheckOff', []) // Module
    .controller("ToBuyController", ToBuyController) // Controllers
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('Price', PriceFilter);
        
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var tobuy = this;
    tobuy.items = ShoppingListCheckOffService.getItemsToBuy();    
    tobuy.removeItem = function (index) {
      ShoppingListCheckOffService.removeItemFromToBuy(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.items = ShoppingListCheckOffService.getItemsBought();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var tobuy = grocerylist();
    var bought = [];
  
    service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      bought.push(item);
    };
  
    service.removeItemFromToBuy = function (itemIndex) {    
      
      var item = tobuy[itemIndex];
      tobuy.splice(itemIndex, 1);      
      bought.push(item);
    };
    
    service.getItemsToBuy = function () {
      return tobuy;
    };

    service.getItemsBought = function () {
      return bought;
    };
  }

  function PriceFilter() {
    return function (price, quantity) {
      return price * quantity;
    }
  }

  function grocerylist(){
    return [
      { name: 'Eggs', quantity: 10, pricePerItem : 4},
      { name: 'Bread', quantity: 10, pricePerItem: 2 },
      { name: 'Bacon', quantity: 10, pricePerItem: 6,},
      { name: 'Juice', quantity: 10, pricePerItem: 5},
      { name: 'Cheese', quantity: 10, pricePerItem: 3}
    ]
  }

})();
