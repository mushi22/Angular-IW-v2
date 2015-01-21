'use strict';

/* Services */

angular.module('iwServices', ['ngResource'])
.factory('ParseService', function($resource){
    // Initialize Parse API and objects.
    Parse.initialize("vBbvihMsKuxIfMc999TtrwCHAKxRW2PMarjtRVBn", "Y53eTAGBxDeiWNDFOwomUhDFjlEnh2qEiAiY9GOi");

    // Cache current logged in user
    var loggedInUser;

    var user = Parse.User.current();
    //console.log("current user: " + user.attributes.username);

    // Cache list of user's data
    var myDataSet = [];
    var oneDataSet = [];

    // Define parse model and collection for Data
    var Dataset = Parse.Object.extend("Dataset");
    var Datapoint = Parse.Object.extend("Datapoint");
    var Device = Parse.Object.extend("Device");
        
    var ParseService = {
      name: "Parse",

      // Login a user
      login : function login(username, password, callback) {
      	  console.log("trying to log in a user");
    	  Parse.User.logIn(username, password, {
    	    success: function(user) {
            loggedInUser = user;
    	      callback(user);
    	      //console.log(user.attributes.username);
    	    },
    	    error: function(user, error) {
    	      alert("Error: " + error.message);
    	    }
        });
      },

      // Register a user
      signUp : function signUp(username, password, callback) {
      	Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
            success: function(user) {
                loggedInUser = user;
                callback(user);
            },

            error: function(user, error) {
              alert("Error: " + error.message);
            }
        });
      },

      // Logout current user
      logout : function logout(callback) {
        Parse.User.logOut();
      },

    
      // Get all datasets belonging to logged in user
      getMyDataSet : function getMyDataSet(callback) {
        // Create a new Parse Query to search Book records by ownerid
        var query = new Parse.Query(Dataset);
          //console.log(user);
        query.equalTo("datasetOwner", user);
        // use the find method to retrieve all books
        query.find({
          success : function(results) {
            callback(results);
           //   console.log("Datasets Returned:" + results.length)
          },
          error: function(error) {
            alert("Error: " + error.message);
          }
        });
      },

      TestingMyDataPoint : function TestingMyDataPoint(callback) {
        var query = new Parse.Query(Datapoint);
          //console.log(user);
        query.equalTo("datapointName", "Test");
        // use the find method to retrieve all books
        query.find({
          success : function(results) {
         //   for (var i=0; i<results.length; i++)
           // { 
             // myDataSet[i]  = results[i].get('datasetName');
            //}
            //  console.log(results);
            callback(results);
          },
          error: function(error) {
            alert("Error: " + error.message);
          }
        });
        
    
      },
        
      loadPointsForDataset: function  loadPointsForDataset(dataset, callback) {
      	console.log("starting to load datapoints for dataset service");
      	console.log("loading for dataset: " + dataset.attributes.datasetName);
      	var query = new Parse.Query(Datapoint);
      	query.equalTo('inDataset', dataset);
      	query.include("devices");
      	  query.find({
      	      success: function(results) {
      	      		console.log("no. of datapoints: " + results.length);
           	        //  alert("found some here " + results);
           	        callback(results);
      	      },
      	      error: function(error) {
      	          alert("Error: no datapoint found " + error.message);
      	      }
      	  });
      },
    
      storeDataSet: function storeDataSet(dataset, callback) {
          //console.log(dataset);
          
         // oneDataSet = dataset;
          
          callback(dataset);
      },
        
        
      storeDevice: function storeDevice(device, callback) {
   
        callback(device);
      },
        
      getmyDataPoint: function getMyDataPoint(datapoint, callback) {
          
          console.log("starting datapoint service");
 
         var query = new Parse.Query(Datapoint);
          
         // query.include('inDataset');
          
        query.equalTo('inDataset', datapoint);
          query.find({
              success: function(results) {
                  console.log("success");
                  console.log(results);
                  callback(results);
                //  alert("found some here " + results);
              },
              error: function(error) {
                  alert("Error: no datapoint found " + error.message);
              }
          });
          
 
    },
    getUserDevices: function getUserDevices(callback) {
    //	console.log("starting device service");
    	var query = new Parse.Query(Device);
    	query.find({
    	    success: function(results) {
    	       // console.log("success");
    	        //console.log(results);
    	        callback(results);
    	      //  alert("found some here " + results);
    	    },
    	    error: function(error) {
    	        alert("Error: no datapoint found " + error.message);
    	    }
    	});
    	
    },
                     
      // Get current logged in user
      getUser : function getUser() {
        if(loggedInUser) {
          return loggedInUser;
        }
      }
    
    };

    // The factory function returns ParseService, which is injected into controllers.
    return ParseService;
});
