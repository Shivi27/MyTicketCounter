'use strict';

(function(){

class TheatreComponent {
  constructor($http, $scope, socket){
    this.$http = $http;
    this.socket = socket;
    this.theatreData = [];

    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('theatre');
    });
  }

$onInit() {
  this.$http.get('/api/theatre')
    .then(response=> {
      this.theatreData = response.data;
      this.socket.syncUpdate('theatre', this.theatreData);
    });
}

addTheatre() {
  // if (this.Name&&this.Place&&this.City) {

    
    if(this.Name == null)
    {  
      alert("It will not PROCEED");             
    }
else
{
    
    this.$http.post('/api/theatre',{
      Name: this.Name,
      City: this.City,
      Location: this.Location
    });
  }
}

  deleteTheatre(theatre) {
    this.$http.delete('/api/theatre/' + theatre._id);
  }
}

angular.module('yomastertemplateApp')
  .component('theatre', {
    templateUrl: 'app/theatre/theatre.html',
    controller: TheatreComponent,
    authenticate: 'admin'
  });

})();
