var dashing = dashing || angular.module('dashing', []);

dashing.controller('BuzzwordsCtrl', ['$scope',
  function ($scope) {
    'use strict';

    $scope.$on('buzzwords', function (e, data) {
      angular.extend($scope, data);
    });
  }
])

.directive('buzzwordList', function() {
  return {
    restrict: 'E',
    templateUrl: '/assets/buzzwords/buzzwords.html'
  }
});
