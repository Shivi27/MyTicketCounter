'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'movie',
    'link': '/movie'
  },
  {
    'title': 'theatre',
    'link': '/theatre'
  },
  
  {
    'title': 'mapping',
    'link': '/mapping'
  }


  ];

  isCollapsed = true;
  //end-non-standard

  constructor($location, Auth) {
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('yomastertemplateApp')
  .controller('NavbarController', NavbarController);
