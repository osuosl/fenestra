'use strict';

dashing = dashing || angular.module('dashing', []);

dashing.controller('CommitsCtrl', ['$scope',
  $scope => {
    $scope.$on('commits', (e, data) => {
      angular.extend($scope, data);
    });
  },
]).
directive('commits', () => {
  return {
    restrict: 'E',
    templateUrl: '/assets/commits/commits.html',
  };
});
