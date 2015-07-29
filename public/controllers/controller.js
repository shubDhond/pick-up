var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function() {
        $http.get('/pickUps').success(function(response) {
            console.log(response);
            $scope.pickUpList = response;
            $scope.pickUp = '';
        });
    };
    refresh();

    $scope.addPickUp = function(){
        console.log($scope.user);
        var pickUp = {};
        pickUp.host = $scope.hostAdd.google.name;
        pickUp.sport = $scope.sportAdd;
        pickUp.location = $scope.locationAdd;
        pickUp.date = $scope.dateAdd;
        pickUp.time = $scope.timeAdd;

        $http.post('/pickUps',pickUp).success(function(response){
           refresh();
        });
    };
}]);