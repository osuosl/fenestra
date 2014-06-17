var dashing = dashing || angular.module('dashing', []);

dashing.controller('NeroCtrl', ['$scope',
  function ($scope) {
    'use strict';

    $scope.$on('nero', function (e, data) {
      angular.extend($scope, data);
    });
  }
])

.directive('neroImg', function() {
  return {
    restrict: 'E',
    templateUrl: '/assets/nero/nero.html'
  }
});
