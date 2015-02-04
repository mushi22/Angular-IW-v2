'use strict';

/* App Module */

angular.module('iw-app', ['ngRoute','iwFilters', 'iwServices', 'ui.bootstrap', 'ui.bootstrap.modal']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	  when('/login', {templateUrl: 'partials/login.html',   controller: LoginCtrl}).
      when('/data', {templateUrl: 'partials/data.html',   controller: MainCtrl}).
      when('/datapoint', {templateUrl: 'partials/datapoint.html',   controller: MainCtrl}).
      otherwise({redirectTo: '/login'});
}]);


