'use strict';

/* App Module */

angular.module('iw-app', ['iwFilters', 'iwServices', 'ui.bootstrap', 'ui.bootstrap.modal', 'datatable']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	  when('/login', {templateUrl: 'partials/login.html',   controller: LoginCtrl}).
      when('/data', {templateUrl: 'partials/data.html',   controller: MainCtrl}).
      when('/datapoint', {templateUrl: 'partials/datapoint.html',   controller: MainCtrl}).
      otherwise({redirectTo: '/login'});
}]);


