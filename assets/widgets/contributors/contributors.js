var dashing = dashing || angular.module('dashing', []);

dashing.controller('ContributorsCtrl', ['$scope',
  function ($scope) {
    'use strict';

    $scope.$on('contributors', function (e, data) {
      angular.extend($scope, data);
    });
  }
])

.directive('outsideContributors', function() {
  return {
    restrict: 'E',
    templateUrl: '/assets/contributors/contributors.html'
  }
});
