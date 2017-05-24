'use strict';

(function(){

class MappingComponent {
  constructor($http, $scope, socket){
    this.$http = $http;
    this.socket = socket;
    this.shivMapping = [];
    this.shivMovie = [];
    this.theatreData = [];

    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('mapping');
    });
  }


$onInit() {
  this.$http.get('/api/movie')
   .then(response =>{
    this.shivMovie = response.data;
    this.socket.syncUpdates('Movie', this.shivMovie);
   });

   this.$http.get('/api/theatre')
    .then(response=> {
      this.theatreData = response.data;
      this.socket.syncUpdate('theatre', this.theatreData);
    });

    this.$http.get('/api/mapping')
    .then(response=> {
      this.shivMapping = response.data;
      this.socket.syncUpdate('mapping', this.shivMapping);
    });
}

addData() {
  // if (this.theatreCity&&this.theatreLocation&&this.theatreName&&this.movieName&&this.movieDate&&this.movieTime) {
    

    if(this.theatreCity == null){
    alert("It will not PROCEED");
   }

   else{
    

    this.$http.post('/api/mapping',{
      theatreCity: this.theatreCity,
      theatreLocation: this.theatreLocation,
      theatreName: this.theatreName,
      movieName: this.movieName,
      movieDate: $rootScope,
      movieTime: this.movieTime
    });
  }
}

  deleteData(mapping) {
    this.$http.delete('/api/mapping/' + mapping._id);
  }

 }

angular.module('yomastertemplateApp')
  .component('mapping', {
    templateUrl: 'app/mapping/mapping.html',
    controller: MappingComponent,
    authenticate: 'admin'
  });

})();
