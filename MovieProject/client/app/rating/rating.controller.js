'use strict';

(function(){

class RatingComponent {
  constructor($http, $scope, socket){
    this.$http = $http;
    this.socket = socket;
    this.movieRating = [];
    this.shivMovie = [];

    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('rating');
    });
  }


$onInit() {
  this.$http.get('/api/rating')
    .then(response=> {
      this.movieRating = response.data;
      this.socket.syncUpdate('rating', this.movieRating);
    });

    this.$http.get('/api/movie')
   .then(response =>{
    this.shivMovie = response.data;
    this.socket.syncUpdates('Movie', this.shivMovie);
   });

}

addRating() {
      this.$http.post('/api/rating',{
      	myMovie: this.myMovie,
      	name: this.name,
        email: this.email,
      	myRating: this.myRating
    });
}

  deleteRating(rating) {
    this.$http.delete('/api/rating/' + rating._id);
  }
}


angular.module('yomastertemplateApp')
  .component('rating', {
    templateUrl: 'app/rating/rating.html',
    controller: RatingComponent
  });

})();
