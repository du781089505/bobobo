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
.controller('homeCtrl', function($scope,$http,$state){
	//获取文章列表
	$scope.arr =[]
	$http({
			url:"http://192.168.43.245:1235/homepage/list",
			method:"get"
		}).then(function(data){
			console.log(data.data)
			$scope.arr = data.data
			
		})
		//登陆
		$scope.denglu = function(){
			console.log("1")
			$http({
			url:"http://192.168.43.245:1235/homepage/login",
			method:"post",
			data:{
				username:$scope.username,
				password:$scope.password
			}
		}).then(function(data){
			console.log(1)
			
			
		})
		}
})
