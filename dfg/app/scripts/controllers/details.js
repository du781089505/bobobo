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
  })
