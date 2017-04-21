'use strict';

/**
 * @ngdoc overview
 * @name dfgApp
 * @description
 * # dfgApp
 *
 * Main module of the application.
 */
angular.module('myApp', ['ui.router']).config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
  	  $stateProvider.state("home",{
  	  	url:"/home",
  	  	templateUrl:"views/homepage.html"
  	  })
  	  .start("details",{
  	  	url:"/details",
  	  	templateUrl:"views/details.html"
  	  })
  	  .start("examine",{
  	  	url:"/examine",
  	  	templateUrl:"views/examine.html"
  	  })
  	   .start("information",{
  	  	url:"/information",
  	  	templateUrl:"views/information.html"
  	  })
  	  .start("messages",{
  	  	url:"/messages",
  	  	templateUrl:"views/messages.html"
  	  })
  	  .start("personal",{
  	  	url:"/personal",
  	  	templateUrl:"views/personal.html"
  	  })
  	  .start("search",{
  	  	url:"/search",
  	  	templateUrl:"views/search.html"
  	  })
  	  $urlRouterProvider.otherwise("/home")
  }])
