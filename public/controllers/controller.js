var mongoose = require('mongoose');
var User = require('.../app/models/user');
var PickUp = require('.../app/models/pickUp');
var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function() {
        $http.get('/pickUps').success(function (response) {
            console.log('Got Data');
            $scope.pickUpList = response;
            $scope.pickUp = '';
        });
    };
    refresh();

    var addPickUp = function (){
        var pickUp = new PickUp();
        pickUp.host = $scope.user;
        pickUp.sport = $scope.sportAdd;
        pickUp.location = $scope.locationAdd;
        pickUp.date = $scope.dateAdd;
        pickUp.time = $scope.timeAdd;

        $http.put('/pickUps',pickUp).success(function(response){
           refresh();
        });
    };
}]);