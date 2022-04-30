describe('menucategories', function() {

  var menucategories;
  var $httpBackend;
  var ApiPath;

  beforeEach(function() {
    module('common');

    inject(function($injector) {
      menucategories = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');

    });
  });

  it('Return list of categories', function() {
    console.log(ApiPath + '/categories.json');
    $httpBackend.whenGET(ApiPath + '/categories.json').respond(meal);
    menucategories.getCategories().then(function(response) {      
      expect(response.name).toEqual(meal.name);
    });
    $httpBackend.flush();
  });

});

var meal = {
  "id": 2,
  "short_name": "A",
  "name": "Soup",
  "special_instructions": "",
  "url": "https://gmcdowell00-mod10.herokuapp.com/categories/A.json"

}
