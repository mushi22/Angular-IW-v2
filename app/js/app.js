'use strict';

/* App Module */

angular.module('bookapp', ['bookappFilters', 'bookappServices', 'ui.bootstrap']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  	  when('/login', {templateUrl: 'partials/login.html',   controller: LoginCtrl}).
  	  when('/items', {templateUrl: 'partials/public-items.html',   controller: MainCtrl}).
  	  when('/add', {templateUrl: 'partials/add-book.html',   controller: MainCtrl}).
  	  when('/datapoint', {templateUrl: 'partials/datapoint.html',   controller: MainCtrl}).
      when('/datasets', {templateUrl: 'partials/datasets.html',   controller: MainCtrl}).
      otherwise({redirectTo: '/login'});
}]);