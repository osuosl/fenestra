var dashing = dashing || angular.module('dashing', []);

dashing.controller('PagerdutyCtrl', ['$scope',
  function ($scope) {
    'use strict';

    $scope.$on('pagerduty', function (e, data) {
      angular.extend($scope, data);
    });
  }
])

.directive('onCall', function() {
  return {
    restrict: 'E',
    templateUrl: '/assets/pagerduty/pagerduty.html'
  };
});
