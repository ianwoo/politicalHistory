//frontend_app.js
console.log('loaded frontend app');

var frontend_app = angular.module('mean_app', []);
frontend_app.controller('crud_controller', do_crud);

function do_crud($scope, $http) {
  console.log('inside do_crud');

  $scope.sortType     = 'number'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchPresident   = '';     // set the default search/filter term

  $scope.read = function () {
    console.log('reading all data');

    $http.get('/api/read')
    .then(function (results) {

      $scope.presidents = results.data;
      console.log($scope.presidents);
    });
  }

  $scope.read();

  $scope.create = function () {
    console.log('creating user');
    console.log($scope.input_president);

    var data = {
      number: $scope.input_number,
      president: $scope.input_president,
      birth_year: $scope.input_birth_year,
      death_year: $scope.input_death_year,
      took_office: $scope.input_took_office,
      left_office: $scope.input_left_office,
      party: $scope.input_party
    }

    $http.post('/api/create', data)
    .then(function (result) {
      console.log(result);
      $scope.read();
    });
    
  }

  $scope.update = function (president) {
    console.log('updating president');
    console.log(president);

    $http.put('/api/update', president)
    .then(function (result) {
      console.log(result);
      $scope.read();      
    });

  }

  $scope.delete = function (president) {
    console.log('deleting president');
    console.log(president);
    $http.delete('/api/delete/' + president._id)
    .then(function (result) {
      console.log(result);
      $scope.read();            
    });
  }
}