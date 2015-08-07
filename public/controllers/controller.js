var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log("Hello World from controller");

    $http.get("api/user_data").success(function (response) {
        console.log('User: ' + JSON.stringify(response));
        $scope.user = response;
    });

    var refresh = function () {
        $http.get('/pickUps').success(function (response) {
            $scope.pickUps = response;
            $scope.pickUp = '';
            console.log($scope.pickUps);
        });
    };
    refresh();

    $scope.addPickUp = function () {
        var pickUp = {};
        pickUp.host = $scope.user._id;
        pickUp.sport = $scope.sportAdd;
        pickUp.location = $scope.locationAdd;
        pickUp.date = $scope.dateAdd.toDateString();
        pickUp.time = $scope.timeAdd.toTimeString();

        $http.post('/pickUps', pickUp).success(function (response) {
            refresh();
            console.log(response);
        });
    };
}]);