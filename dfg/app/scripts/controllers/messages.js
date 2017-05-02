'use strict';

/**
 * @ngdoc overview
 * @name dfgApp
 * @description
 * # dfgApp
 *
 * Main module of the application.
 */
  angular.module('myApp').controller('messages', function($scope,$http,$state){
  	 $scope.xiaoxi = function(){
			$state.go("messages")
	}
  	 $scope.personal = function(){
		$state.go('personal')
	}
  	 $scope.home = function(){
	$state.go('home')
}  	 	
  })