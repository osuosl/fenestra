'use strict';

dashing = dashing || angular.module('dashing', []);

dashing.controller('NeroCtrl', ['$scope',
  $scope => {
    $scope.$on('nero', (e, data) => {
      angular.extend($scope, data);
    });
  },
]).
directive('neroImg', () => {
  return {
    restrict: 'E',
    templateUrl: '/assets/nero/nero.html',
  };
});
