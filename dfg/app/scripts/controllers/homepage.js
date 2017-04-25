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
	.controller('homeCtrl', function($scope, $http, $state) {
		//获取文章列表
		$scope.x = true;
		$scope.a = false;
		$scope.e = "1";
		$scope.arr = []
		$scope.arr1 = []
		$scope.tishi = false;
		$scope.tishi1 = false;
		$scope.tishi2 = false;
		$scope.t = function() {
			if($scope.e == "1") {
				$http({
					url: "http://" + ip + "/homepage/cha",
					method: "get"
				}).then(function(data) {
						console.log(data.data)
					$scope.arr1=data.data	

				})
				$scope.x = false;
				$scope.a = true;
				$scope.e = "2";
			} else if($scope.e == "2") {
				$scope.x = true;
				$scope.a = false;
				$scope.e = "1";
			}
  angular.module('myApp')
.controller('homeCtrl', function($scope,$http,$state){
	//获取文章列表
	$scope.x = true;
	$scope.a = false;
	$scope.e ="1";
	$scope.arr =[]
	$scope.tishi = false;
	$scope.tishi1 = false;
	$scope.tishi2 = false;
	$scope.zhuce1 = false;
	$scope.zhuce2 = false;
	$scope.t =function(){
		if($scope.e =="1"){
			$scope.x = false;
	       $scope.a = true;
	       $scope.e ="2";
		}else if($scope.e =="2"){
			$scope.x = true;
	       $scope.a = false;
	       $scope.e ="1";
		}
		$http({
				url: "http://" + ip + "/homepage/list",
				method: "get"
			}).then(function(data) {
				//			console.log(data.data)
				$scope.arr = data.data

			})
			//		登陆
		$scope.denglu = function() {
			console.log("1")
			console.log($scope.username, $scope.password)
			$http({
				url: "http://" + ip + "/homepage/login",
				method: "post",
				data: "username=" + $scope.username + "&password=" + $scope.password,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(data) {
				if(data.data.flag == 1) {
					//		  	$scope.tishi = true;
					angular.element('.denglu').css({
						"display": "block"
					});
				} else if(data.data.flag == 2) {
					$scope.tishi1 = true;
				} else if(data.data.flag == 3) {
					$scope.tishi2 = true;
				}

			})
		}

	})
			url:"http://"+ip+"/homepage/login",
			method:"post",
			data:"username="+$scope.username+"&password="+$scope.password,
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(data){
		  if(data.data.flag == 1){
		  	$scope.tishi = true;
		  	
		  }else if(data.data.flag == 2){
		  	$scope.tishi1 = true;
		  }else if(data.data.flag == 3){
		  	$scope.tishi2 = true;
		  }
			
			
		})
		}
		//注册
		$scope.zc = function(){
			$http({
			url:"http://"+ip+"/homepage/zhuce",
			method:"post",
			data:"username="+$scope.uname+"&password="+$scope.pas+"&name="+$scope.name+"&age="+$scope.age+"&tel="+$scope.tel+"&qq="+$scope.qq+"&status="+0,

			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(data){
		  if(data.data.flag == 1){
	  	$scope.zhuce1 = true;
		  }else if(data.data.flag == 2){
		  	$scope.zhuce2 = true;
		  }else if(data.data.flag == 3){
		      console.log("失败")
		  }
			
			
		})
		}
})
