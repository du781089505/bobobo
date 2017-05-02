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
  .controller('detailsCtrl', function($scope,$http,$state){
  	 $scope.zai = true;
  	 $scope.buzai = false;
  	 $scope.detailscomment = function(){
  	 	$scope.zai = false;
  	 	$scope.buzai = true;
  	 }
  	 $scope.us_panel_post2 = function(){
  	 	$scope.zai = true;
  	 	$scope.buzai = false;
  	 }
  	 
  	 $scope.xiaoxi = function(){
			$state.go("messages")
	}
  	 $scope.personal = function(){
		$state.go('personal')
	}
  	 $scope.home = function(){
	$state.go('home')
}  	 	
  	$scope.arr = []
  	 $scope.id = location.href.split("=")[1]
  	 $http({
					url: "http://" + ip + "/details/juti?id="+$scope.id,
					method: "get"
				}).then(function(data) {
						console.log(data.data)
						$scope.arr = data.data

				})
  })
