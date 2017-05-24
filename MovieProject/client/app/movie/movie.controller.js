'use strict';

(function() {

class MovieComponent {
  constructor($http, $scope, socket){
    this.$http = $http;
    this.socket = socket;
    this.shivMovie = [];
    this.movieData = [];

    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('Movie');
    });
 }

$onInit() {
  this.$http.get('/api/movie')
   .then(response =>{
    this.shivMovie = response.data;
    this.socket.syncUpdates('Movie', this.shivMovie);
   });
}

searchMovie() {
  if(this.Title||this.Year){
    this.$http.get('http://api.myapifilms.com/imdb/idIMDB?title=matrix&token=dd8bc66a-2974-4b49-9faf-1cf74ddd775b&r=json')
    .then(response => {
      this.movieData = response.data;
      this.socket.syncUpdates('Movie', this.movieData);
    });
  }
}


addMovie() {

    this.$http.post('/api/movie',{
      Poster: this.movieData.Poster,
      Title: this.movieData.Title,
      Year: this.movieData.Year,
      Genre: this.movieData.Genre
    });
}


  deleteMovie(movie) {
    var X = window.confirm('Do you really want to delete this movie ?');
    if(X){
      this.$http.delete('/api/movie/' + movie._id);
    }
  }
}


angular.module('yomastertemplateApp')
  .component('movie', {
    templateUrl: 'app/movie/movie.html',
    controller: MovieComponent,
    authenticate: 'admin'
  });

})();
