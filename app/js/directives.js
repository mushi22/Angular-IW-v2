'use strict';

/* Directives */

app.directive('leftNav', function(){
    return {
        restrict: 'E',
        scope: {
           current: '=current'
        },
        templateUrl: 'leftNav.html',
        controller: function($scope) {
        }
    };
});

app.directive('mySubArea1', function(){
    return {
        restrict: 'E',
        templateUrl: 'mySubArea1.html',
        controller: function($scope) {
            //controller for your sub area.
        }
    };
});