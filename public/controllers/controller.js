var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log("Hello World from controller");
    $scope.createPickUpError = false;
    $scope.createPickUpErrorText = '';
    $scope.loading = false;

    $http.get("api/user_data").success(function (response) {
        console.log('User: ' + JSON.stringify(response));
        $scope.user = response;
    });

    var refresh = function () {
        $http.get('/pickUps').success(function (response) {
            $scope.pickUps = response;
            $scope.pickUp = '';
            console.log($scope.pickUps);
            for(var key in $scope.pickUps){
                geocoder.geocode( { 'address': $scope.pickUps[key].location}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
        });
    };
    refresh();

    $scope.createPickUp = function () {
        $scope.loading = true;
        if (!$scope.user) {
            $scope.createPickUpErrorText = 'Session timed out please log in again';
            $scope.createPickUpError = true;
            $scope.loading = false;
        } else if (!$scope.sportAdd) {
            $scope.createPickUpErrorText = 'Please enter a sport so others know what you plan to play';
            $scope.createPickUpError = true;
            $scope.loading = false;
        } else if (!$scope.locationAdd) {
            $scope.createPickUpErrorText = 'Please enter a location so others can find this pick up';
            $scope.createPickUpError = true;
            $scope.loading = false;
        } else if (!$scope.dateAdd) {
            $scope.createPickUpErrorText = 'Please enter a date so others know which day this pick up will take place';
            $scope.createPickUpError = true;
            $scope.loading = false;
        } else if (!$scope.timeAdd) {
            $scope.createPickUpErrorText = 'Please enter a date so others know when to show up';
            $scope.createPickUpError = true;
            $scope.loading = false;
        } else {
            var pickUp = {};
            pickUp.host = $scope.user._id;
            pickUp.sport = $scope.sportAdd;
            pickUp.location = $('#location').val().toString();
            pickUp.date = $scope.dateAdd.toDateString();
            pickUp.time = $scope.timeAdd.toTimeString();
            $http.post('/pickUps', pickUp)
                .success(function (response) {
                    refresh();
                    console.log(response);
                    $('.add-pickUp').css({'display': 'none'});
                    $('.overlay').css({'display': 'none'});
                    $scope.loading = false;
                })
                .error(function(data,status){
                    $scope.createPickUpErrorText = ''+status;
                    $scope.createPickUpError = true;
                    $scope.loading = false;
                });
        }
    };
}]);