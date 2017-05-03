'use strict';

/**
 * @ngdoc overview
 * @name dfgApp
 * @description
 * # dfgApp
 *
 * Main module of the application.
 */
  angular.module('myApp')
  .controller('personal', function($scope,$http,$state){
  	$http({
			url:"http://"+ip+"/personal/xun",
			method:"get",
			params:{username:localStorage.username},
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
			
		}).then(function(data){
		    console.log(data)
		    console.log(1111)
		    
		})
  	
  })
 
