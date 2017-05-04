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
            
            	   $scope.time=now1.getFullYear()+'-'+now1.getMonth()+'-'+now1.getDate();
            console.log($scope.time)
		 $http({
					url: "http://" + ip + "/information/tianjia",
					method: "post",
					data:"title="+$scope.title+"&content="+$scope.content+"&time="+$scope.time+"&fenlei="+$scope.fenlei+"&id="+localStorage.id+"&name="+localStorage.name,
					headers:{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
				}).then(function(data) {
					console.log(data.data)
					if(data.data.flag == 1){
						
					}else{
						console.log("失败")
					}
						
//					$scope.arr1=data.data	

				})
            }
         
  	
  })