var dashing = dashing || angular.module('dashing', []);

dashing.controller('CounterCtrl', ['$scope',
  function ($scope) {
    'use strict';

    $scope.$on('counter', function (e, data) {
        $scope.counter = data.count;
    });
  }
])

.directive('counterNum', function() {
  return {
    restrict: 'E',
    templateUrl: '/assets/counter/counter.html'
  }
});

