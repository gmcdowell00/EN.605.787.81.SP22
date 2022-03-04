// IIFE
(function () {
  'use strict'

// Module
angular.module('LunchCheck', [])
 .controller("LunchCheckController", LunchCheckController);
 
// Protect against minify
LunchCheckController.$inject = ['$scope']  

// Lunch Check Controller
function LunchCheckController ($scope) {     

    // Button clicked
    $scope.myFunc = function() {     
    
        // If menu item is undefind or empty...
        if ($scope.menu === undefined || $scope.menu.trim() === ""){

            // Change message and set border and font color to red
            $scope.message = "Please enter data first";
            $scope.border = {"border": "solid 1px red"};
            $scope.font = {"color" : "red",}
        } 
        else {
          // Else...
          // Intialize menu items and sum
          var menuitems = $scope.menu.split(',');
          var sum = 0;

          // For each element in menu array 
          for (var i = 0; i < menuitems.length; i++){

            // If menu item is not empty
            if (menuitems[i].trim() !== "")
              // Increment by 1
              sum += 1;
            }
          
          // If sum is greater than 3...
          if (sum > 3) {
            // Change message and set border and font color to green
            $scope.message = "Too much!";
            $scope.border = {"border": "solid 1px green"};
            $scope.font = {"color" : "green",}
          } else {
            // Else...
            // Change message and set border and font color to green
            $scope.message = "Enjoy!";
            $scope.border = {"border": "solid 1px green"};
            $scope.font = {"color" : "green",}
          }  
        }      
      };  
    }
})();
