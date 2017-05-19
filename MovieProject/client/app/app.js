'use strict';

angular.module('yomastertemplateApp', ['yomastertemplateApp.auth', 'yomastertemplateApp.admin',
    'yomastertemplateApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute',
    'btford.socket-io', 'validation.match', 'ui.filters'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider

    .when('/movie', {
    	templateUrl: 'app/movie/movie.html',
    	controller: 'movie.controller',
    	access: {restricted: false}
    })
    .when('/seat', {
    	templateUrl: 'app/seat/seat.html',
    	controller: 'seat.controller',
    	access: {restricted: false}
    })
    .when('/theatre', {
    	templateUrl: 'app/theatre/theatre.html',
    	controller: 'theatre.controller',
    	access: {restricted: false}
    })
    .when('/mapping', {
        templateUrl: 'app/mapping/mapping.html',
        controller: 'mapping.controller',
        access: {restricted: false}
    })
    .when('rating', {
        templateUrl: 'app/rating/rating.html',
        controller: 'rating.controller',
        access: {restricted: false}
    })


    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
