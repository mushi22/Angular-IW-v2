'use strict';

/* Controllers */

/**
 * Login controller for the app
 */
function LoginCtrl($scope, $location, ParseService) {
  // Perform user login using back-end service
	$scope.login = function() {
		ParseService.login($scope.login_username, $scope.login_password, function(user) {
      // When service call is finished, navigate to items page
      $location.path('/datasets');
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

/**
 * Main controller for the app
 */

/*function DataSetCrtl($scope, $location, ParseService, $rootScope) {
  $scope.getMyDataSet = function() {
    ParseService.getMyDataSet(function(results) {
      $scope.$apply(function() {
         // console.log(results);
        $scope.myDataSets = results;
      })
    });
  }                

$rootScope.getMyDataSets = [];
$scope.getMyDataSet();
}
DataSetCrtl.$inject = ['$scope', '$location', 'ParseService', '$rootScope']
                

function DataPointCrtl($scope, $location, ParseService, $rootscope) {
    
}
DataPointCrtl.$inject = ['$scope', '$location', 'ParseService', '$rootScope']*/




function MainCtrl($scope, $location, ParseService, $rootScope) {
    
 var commonObject;
    
  $scope.init = function() {
    $scope.user = ParseService.getUser();
  }

  // Fetch the list of public books from the backend service
  $scope.getBooks = function() {

    ParseService.getBooks(function(results) {
      $scope.$apply(function() {
        $scope.bookList = results;
      });
    });
  }

   // Fetch the list datasets from the backend service
  $scope.getMyDataSet = function() {
    ParseService.getMyDataSet(function(results) {
      $scope.$apply(function() {
         // console.log(results);
        $scope.myDataSets = results;
      })
    });
  }
  
  $scope.TestingMyDataPoint = function() {
    ParseService.TestingMyDataPoint(function(results) {
        $scope.$apply(function() {
         // console.log(results);
        $scope.myDataSetPage = results;
      })
    });                      
  }
  
  $scope.getDataPoint = function(dataset) {
    console.log("In Data Point");
      //console.log(dataset);
      ParseService.getmyDataPoint(dataset, function(results) {
          //console.log("datapoint recieved");
          $scope.$apply(function(){
              console.log(results);
                $scope.myDataPoints = results;
              console.log(myDataPoints[1]);
          })
          $location.path('/datapoint');

      });
  }

  
    $scope.TestShit = function () {
        console.log("blah");
       console.log($scope.TestingDataPoints);
        console.log("balhesfd");

  }
  $scope.dataset = function(dataset) {
   
      console.log(dataset);
      console.log("fdsfdfs");
      ParseService.storeDataSet(dataset, function(results) {
           $scope.TestingDataPoints = results;             
        

                    });   
        
                console.log($scope.TestingDataPoints);
                console.log("calling thinfsadsad");
                $scope.TestShit();
               // $location.path('/datapoint');

  }
  
  
  
 /*$scope.testing = function () {
    console.log("testing");
    ParseService.getMyDataSet(function(results) {
      $scope.$apply(function() {
       //   console.log(results);
        $scope.myDataSets2 = results;
      })
    });
  }*/

  /*
  // Fetch the list books from the backend service
  $scope.getMyBooks = function() {
    ParseService.getMyBooks(function(results) {
      $scope.$apply(function() {
        $scope.myBooks = results;
      })
    });
  }

  // Fetch the list of book requests from the backend service
  $scope.getRequests = function() {
    ParseService.getRequests(function(results) {
      $scope.$apply(function() {
        $scope.requests = results;
      })
    });
  }

  // Navigate to add book form
  $scope.add = function() {
    $location.path('/add');
  }

  // Create a new book request and refresh the book list
  $scope.borrow = function(book) {
    ParseService.borrow(book, function(result) {
      alert("Borrow request sent to owner!");
      $scope.$apply(function() {
        book = result;
      })
    });
  }

  // Accept a book request
  $scope.accept = function(request) {
    ParseService.accept(request, function(result) {
      $scope.$apply(function() {
        request = result;
      })
    });
  }

  // Reject a book request
  $scope.reject = function(request) {
    ParseService.reject(request, function(result) {
      $scope.$apply(function() {
        request = result;
      })
    });
  }

  // Add a new book record to Parse backend service
  $scope.addBook = function() {
    ParseService.addBook($scope.name, $scope.status, $scope.visibility, $scope.location, function() {
      $location.path('/items');
    });
  }

  // logs the user out and re-direct to login page
 // $scope.logout = function() {
   // ParseService.logout();
//    $location.path('/login');
//  }

 
  /**
   * On startup...
   */
  $scope.bookList = [];
  $scope.myBooks = [];
  $scope.myDataSets = [];
  $scope.myDataPoints = [];    
  $scope.requests = [];
  $scope.myDataSetPage = [];
  $scope.init();
  $scope.getBooks();
  $scope.getMyDataSet();
 // $scope.testing();
  //$scope.getMyBooks();
  //$scope.getRequests();

  $scope.TestingDataPoints = [];
  $scope.TestingMyDataPoint(); 
  //$scope.TestShit();
}
MainCtrl.$inject = ['$scope', '$location',  'ParseService', '$rootScope']


