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
	$scope.x = true;
	$scope.a = false;
	$scope.e ="1";
	$scope.arr =[]
	$scope.tishi = false;
	$scope.tishi1 = false;
	$scope.tishi2 = false;
	$scope.zhuce1 = false;
	$scope.zhuce2 = false;
	$scope.personal = function(){
		$state.go('personal')
	}
	$scope.queding = function(){
		$scope.zhuce2 = false;
	}
	$scope.fabu = function(){
	$state.go("information")
	}
	$scope.att = []
	
	$scope.xiaoxi = function(){
		if( localStorage.status ==1){
			$state.go("messages")
		}else if( localStorage.status ==0){
			alert("你没有权限")
		}
			
	}
	$scope.to = function(){
			$state.go("details")
	}
	$scope.t =function(){
		if($scope.e =="1"){
			$scope.x = false;
	       $scope.a = true;
	       $scope.e ="2";
	          $http({
					url: "http://" + ip + "/homepage/cha",
					method: "get"
				}).then(function(data) {
						console.log(data.data)
					$scope.arr1=data.data
					
					
					

				})
		}else if($scope.e =="2"){
			$scope.x = true;
	       $scope.a = false;
	       $scope.e ="1";
		}
		
	}

//		登陆
		$scope.denglu = function(){
			console.log($scope.username,$scope.password)
			$http({
			url:"http://"+ip+"/homepage/login",
			method:"post",
			data:"username="+$scope.username+"&password="+$scope.password,
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(data){
		  if(data.data.flag == 1){
		  	$scope.tishi = true;
		  	console.log(data)
		  	localStorage.username = $scope.username
		  	$http({
			url:"http://"+ip+"/personal/xun",
			method:"get",
			params:{username:localStorage.username},
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
			
		}).then(function(data){
		 
		    localStorage.id = data.data[0].id
			localStorage.name = data.data[0].name
			 localStorage.status = data.data[0].status
		})
		   
		  }else if(data.data.flag == 2){
		  	$scope.tishi1 = true;
		  }else if(data.data.flag == 3){
		  	$scope.tishi2 = true;
		  }		
		})
		}
		//注册
		$scope.zc = function(){
			$scope.img="images/1493889883093.jpg"
			console.log($scope.img)
			$http({
			url:"http://"+ip+"/homepage/zhuce",
			method:"post",
			data:"username="+$scope.uname+"&password="+$scope.pas+"&name="+$scope.name+"&age="+$scope.age+"&tel="+$scope.tel+"&qq="+$scope.qq+"&status="+0+"&img="+$scope.img,
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(data){
		  if(data.data.flag == 1){
	  	$scope.zhuce1 = true;
		  }else if(data.data.flag == 2){
		  	$scope.zhuce2 = true;
		  	$scope.uname = "";
		  	$scope.pas ='';
		  	$scope.name = "";
		  	$scope.age = "";
		  	$scope.tel='';
		  	$scope.qq = ''
		  }else if(data.data.flag == 3){
		      console.log("失败")
		  }
			
			
		})
		}
		$scope.queding3 = function(){
			$scope.zhuce1=false;
		}
		//搜索
		$scope.b = false
		$scope.att = []
		$scope.hd = function(){
			console.log($scope.search)
		$http({
			url:"http://"+ip+"/homepage/search",
			method:"get",
			params:{conppp:$scope.search},
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
			
		}).then(function(data){
		    $scope.b = true
		     $scope.a = false
		      $scope.x = false
		      $scope.search=''
			console.log(data.data)
			$scope.att = data.data
			
		})
	}
	
		
})