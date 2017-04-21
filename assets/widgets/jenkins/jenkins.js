'use strict';

dashing = dashing || angular.module('dashing', []);

dashing.controller('JenkinsCtrl', ['$scope',
  $scope => {
    $scope.$on('jenkins', (e, data) => {
      angular.extend($scope, data);
    });
  },
]).
directive('jenkinsWidget', () => {
  return {
    restrict: 'E',
    templateUrl: '/assets/jenkins/jenkins.html',
  };
});

