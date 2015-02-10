var dashing = dashing || angular.module('dashing', []);


dashing.controller('JenkinsCtrl', ['$scope',
  function ($scope) {
    'use strict';

    $scope.$on('jenkins', function(e, data) {
      angular.extend($scope, data);
    });
  }
])


.directive('jenkinsWidget', function() {
  return {
    restrict: 'E',
    templateUrl: '/assets/jenkins/jenkins.html'
  }
});

