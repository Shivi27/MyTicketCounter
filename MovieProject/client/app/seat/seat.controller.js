'use strict';

(function(){

class SeatComponent {
  constructor($http,$scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.seatBooking = [];
    this.shivMapping = [];

    $scope.rows = ['A','B','C','D','E','F','G','H','I','J'];
    $scope.cols = [1,2,3,4,5,6,7,8,9,10];

    $scope.$on('$destroy',function(){
      socket.unsysncUpdates('seat');
    });
  }

  $onInit() {
    
    this.$http.get('/api/mapping')
    .then(response=> {
      this.shivMapping = response.data;
      this.socket.syncUpdate('mapping', this.shivMapping);
    });
    
    this.$http.get('/api/seat')
    .then(response => {
      this.seatBooking = response.data;
      this.socket.syncUpdates('seat', this.seatBooking);
    });
  }

//      seatClicked() {
//      var index = selected.indexOf(seatNo);
//      if(index !==-1) {
//        selected.splice(index, 1);
//      } else {
//        selected.push(seatNo);

//      }
//  }

//   getStatus(seatNo) {
//      if('reserved.index(seatNo) > -1') {
//        return 'reserved';
//      } else if(selected.indexOf(seatNo) > -1) {
//        return 'selected';
//      }
//  }

//    clearSelected() {
//      selected = [];
//  }

//    showSelected() {
//      return selection.length;
// }

 

//    seatNumbers() {
//      if(selected.length > 0) {
//        return selected;
//      }
//      else {
//        return "NONE !"
//      }
//    }

  addInfo() {
    this.$http.post('/api/seat',{
      shivCity: this.shivCity,
      shivLocation: this.shivLocation,
      shivName: this.shivName,
      movieTitle: this.movieTitle,
      shivDate: this.shivDate,
      shivTime: this.shivTime
    });
  }

  deleteThing(seat) {
    this.$http.delete('/api/seat/' + seat._id);
  }

}

angular.module('yomastertemplateApp')
  .component('seat', {
    templateUrl: 'app/seat/seat.html',
    controller: SeatComponent
  });

})();
