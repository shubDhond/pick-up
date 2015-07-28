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
}]);