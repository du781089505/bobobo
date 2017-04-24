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
  	  .state("details",{
  	  	url:"/details",
  	  	templateUrl:"views/details.html"
  	  })
  	  .state("examine",{
  	  	url:"/examine",
  	  	templateUrl:"views/examine.html"
  	  })
  	   .state("information",{
  	  	url:"/information",
  	  	templateUrl:"views/information.html"
  	  })
  	  .state("messages",{
  	  	url:"/messages",
  	  	templateUrl:"views/messages.html"
  	  })
  	  .state("personal",{
  	  	url:"/personal",
  	  	templateUrl:"views/personal.html"
  	  })
  	  .state("search",{
  	  	url:"/search",
  	  	templateUrl:"views/search.html"
  	  })
  	  $urlRouterProvider.otherwise("/details")
  }])
