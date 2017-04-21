'use strict';

dashing = dashing || angular.module('dashing', []);

dashing.controller('PagerdutyCtrl', ['$scope',
  $scope => {
    $scope.$on('pagerduty', (e, data) => {
      angular.extend($scope, data);
    });
  },
]).
directive('onCall', () => {
  return {
    restrict: 'E',
    templateUrl: '/assets/pagerduty/pagerduty.html',
  };
});
