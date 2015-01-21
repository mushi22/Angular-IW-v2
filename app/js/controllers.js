'use strict';

/* Controllers */

/**
 * Login controller for the app
 */
function LoginCtrl($scope, $location, ParseService) {
	$.backstretch("img/login-bg.jpg", {speed: 1000});
	console.log("start login process");
  // Perform user login using back-end service
	$scope.login = function() {
		console.log("run login function");
		ParseService.login($scope.login_username, $scope.login_password, function(user) {
      	// When service call is finished, navigate to items page
      	console.log("Taking you to data path now.");
      	
      	$location.path('/data');
      	
      	$scope.$apply()
    });
	}

  // Perform user signup using back-end service
	$scope.signUp = function() {
		ParseService.signUp($scope.signup_username, $scope.signup_password, function(user) {
      // When service call is finished, navigate to items page
      $location.path('/items');
    });
	}

  // Perform user login using Facebook API
  $scope.FB_login = function() {
    ParseService.FB_login(function(user) {
      // When service call is finished, navigate to items page
      $location.path('/items');
    });
  }
}
LoginCtrl.$inject = ['$scope', '$location', 'ParseService', '$rootScope']



function MainCtrl($scope, $location, ParseService, $rootScope) {
	$.backstretch("img/bg.jpg", {speed: 10});
	$scope.items = ['dashboard', 'dataset', 'device'];
	  $scope.subview = $scope.items[0];

    //var commonObject;
    $scope.init = function() {
    	$scope.user = ParseService.getUser();
  	}


   	// Fetch the list datasets from the backend service
   	$scope.getUserDatasetList = function() {
   		ParseService.getMyDataSet(function(results) {
    		//console.log("Getting User Dataset List");
      		$scope.$apply(function() {
        		$scope.myDataSets = results;
      		})
    	});
  	}
  
$scope.dashboard = function() {
	console.log("Accessing Dashboard: ");
	$scope.subview = $scope.items[0];
} 

$scope.devices = function() {
	console.log("Accessing Dashboard: ");
	$scope.subview = $scope.items[2];
}  
  
$scope.dataset = function(dataset) {
	console.log("Accessing Dataset: " + dataset.attributes.datasetName);
    ParseService.storeDataSet(dataset, function(results) {
    	$scope.currentDataset = results;             
    });
    
    ParseService.loadPointsForDataset(dataset, function(results) {
    	console.log("EE");
    	var out = new Array();
    	$scope.currentDatapoints = results;
       	for (var i = 0; i < results.length; i++) {
    		var temperature = $scope.currentDatapoints[i].get("devices")[0].get('temperature');
    		var devices = results[i].get("devices")[0].get('humidity');
    		console.log(temperature + " | " + devices );
    		
    	}
    	console.log(out);
    	$scope.output;
    	//console.log(device);
    	//$scope.subview = $scope.items[1];
    	$scope.$apply()
    });
      $scope.subview = $scope.items[1];
}


$scope.getDevices = function() {
    
   // console.log("Getting devices")
    ParseService.getUserDevices( function(results) {
        
        $scope.$apply(function() {
                //console.log("results");
               // console.log(results);
        		$scope.myDevices = results;
         })
    
    });
}


$scope.getCurrentDevice = function(device) {
    
    ParseService.storeDevice(device, function(results) {
    	$scope.currentDevice = results;             
    });
    	$scope.subview = $scope.items[2];

    
}
    
$scope.refresh = function() {
	console.log("REFRESH");
	$scope.subview = $scope.items[1];
	$scope.$apply();
}

//$scope.listDevices = function() {
//	console.log("Accessing Devices");
//	ParseService.getUserDevices(function(results) {
//		$scope.userDevices = results;
//	});
//
//}

  
  // logs the user out and re-direct to login page
 $scope.logout = function() {
      ParseService.logout();
      console.log("current user: " + $scope.user);
      $location.path('/login');
    }
  
 
 

  
  /**
   * On startup...
   */

  $scope.myDataSets = [];
  $scope.myDataPoints = [];    
  $scope.requests = [];
  $scope.myDataSetPage = [];
  $scope.init();
  $scope.myDevices = [];

  $scope.getUserDatasetList();
  $scope.getDevices();
//  $scope.devices();

//  $scope.TestingDataPoints = [];
  
}
MainCtrl.$inject = ['$scope', '$location',  'ParseService', '$rootScope']

function DatasetCtrl($scope, $location, ParseService, $rootScope) {
		console.log("Dataset Control Loaded");	
		console.log($scope.currentDataset);
}
DatasetCtrl.$inject = ['$scope', '$location',  'ParseService', '$rootScope']
