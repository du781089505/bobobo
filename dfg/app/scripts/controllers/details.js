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
  	 $scope.messages = function(){
  	 	$state.go("messages")
  	 }
  	 $scope.detailscomment = function(){
  	 	$scope.zai = false;
  	 	$scope.buzai = true;
  	 }
  	 
  	 $scope.us_panel_post3 = function(){
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
  $scope.d = false;
   $scope.shoucang = function(){
   	   $scope.d = true;
   	   
   	$http({
					url: "http://" + ip + "/details/shoucang/",
					method: "post",
					data:"id="+localStorage.id+"&uid="+$scope.id
					,
					headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
				}).then(function(data) {
						if(data.data.flag ==1){
							alert('收藏成功')
						}else if(data.data.flag ==2){
							alert("已收藏")
						}else if(data.data.flag ==3){
							alert("失败")
						}
                        console.log(data)
				})
   }
  	$scope.arr = []
  	 $scope.id = location.href.split("=")[1]
  	 $http({
					url: "http://" + ip + "/details/juti?id="+$scope.id,
					method: "get"
				}).then(function(data) {
//						console.log(data.data)
						$scope.arr = data.data

				})
			
		$scope.us_panel_post2 = function(){
			if($scope.pinglun==undefined){
				alert("请输入要评论内容")
			}else{
					$http({
					url: "http://" + ip + "/details/pinglun",
					method: "post",
					data:"id="+localStorage.id+"&uid="+$scope.id+"&pcon="+$scope.pinglun+"&name="+localStorage.name,
					
					headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
				}).then(function(data) {
						console.log(data.data)
						location.reload();
                      $scope.zai = true;
	 	            $scope.buzai = false;
				})
			}

	 	
  	 }
		$scope.too = []
			$http({
					url: "http://" + ip + "/details/pinglun?uid="+$scope.id,
					method: "get",
					
					headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
				}).then(function(data) {
						console.log(data.data)
						$scope.too=data.data
                        
				})		
  })
