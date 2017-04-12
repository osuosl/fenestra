'use strict';

dashing = dashing || angular.module('dashing', []);

dashing.controller('LanguagesCtrl', ['$scope',
  $scope => {
    $scope.$on('languages', (e, data) => {
      angular.extend($scope, data);
    });
  },
]).
directive('languagesGraph', () => {
  return {
    restrict: 'E',
    templateUrl: '/assets/languages/languages.html',
  };
});
