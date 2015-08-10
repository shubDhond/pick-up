/**
 * Created by sdhond on 2015-08-09.
 */
var app = angular.module('app',['ui.router']);
app.controller('ctrl',['$scope','$http', function($scope,$http){
    $scope.login = function(){
        $http.get('/auth/google').success(function(response){
           $http.get('/auth/google/callback')
               .success(function(data,status){
                   $state.go('appStart');
               })
               .error(function(data){
                   $state.go('default');
               })
        });
    };
}]);

app.config(function($stateProvider,$urlRouteProvider){
    $stateProvider
        .state('appStart',{
           url:'/App',
           templateUrl: '../../views/pickUpApp.html'
        })
        .state('default',{
            url:'/',
            templateUrl: '../../views/index.html'
        });

    $urlRouteProvider.otherwise('/');
});