var dashing = dashing || angular.module('dashing', []);

dashing.controller('CommitsCtrl', ['$scope',
  function ($scope) {
    'use strict';

    $scope.$on('commits', function (e, data) {
      angular.extend($scope, data);
    });
  }
])

.directive('commits', function() {
  return {
    restrict: 'E',
    templateUrl: '/assets/commits/commits.html'
  }
});
