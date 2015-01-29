var dashing = dashing || angular.module('dashing', []);

dashing.controller('TimelineCtrl', ['$scope',
  function ($scope) {
    'use strict';

    $scope.$on('timeline', function (e, data) {
      angular.extend($scope, data);
    });
  }
])

.directive

.directive('timeline', function() {
  return {
    restrict: 'E',
    templateUrl: '/assets/timeline/timeline.html'
  }
});
