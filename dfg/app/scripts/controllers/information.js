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
  .controller('information', function($scope,$http,$state){
  	$scope.fabiao = function(){
  		 var now1=new Date();
            //让时间在页面显示
            $scope.time=now1.getHours()+':'+now1.getMinutes()+':'+now1.getSeconds();
            
		 $http({
					url: "http://" + ip + "/information/tianjia",
					method: "get"
					data:{
						title:$scope.title,
						content:$scope.content,
						fenlei:$scope.fenlei,
						time:$scope.time
					}
				}).then(function(data) {
						console.log(data.data)
//					$scope.arr1=data.data	

				})
  	}
  })