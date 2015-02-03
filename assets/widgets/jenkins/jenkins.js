var dashing = dashing || angular.module('dashing', ['drawing']);


dashing.controller('JenkinsCtrl', ['$scope',
  function ($scope) {
    'use strict';

    $scope.$on('jenkins', function(e, data) {
      angular.extend($scope, data);
    });
  }
])

/*.directive('canvas', function(){
  return{
    restrict: 'AEC',
    template: "<canvas width='280' height='150' id='jenkins-canvas'></canvas>",
    scope: {
      drawing: '=',
      drawingId: '@' },
    link: function(scope){
      scope.canvas = getElementById('jenkins-canvas');
      scope.scope.context = canvas.getContext('2d');
      var x = canvas.width / 2;
      var y = canvas.height / 2;
      var radius = 50; 
      var startAngle = 0.8 * Math.PI;
      var endAngle = 2.2 * Math.PI;
      var counterClockwise = false;

      scope.context.beginPath();
      scope.context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
      scope.context.lineWidth = 30; 
      scope.context.strokeStyle = '#444';
      scope.context.stroke();
      scope.context.endPath();

      scope.context.beginPath();
      scope.context.arc(x, y, radius, startAngle, endAngle-0.3, counterClockwise);
      scope.context.lineWidth = 30; 
      scope.context.strokeStyle = '#fff';
      scope.context.stroke();
      scope.context.endPath();
    }
  };
});*/

.directive('jenkinsWidget', function() {

  return {
    restrict: 'AEC',
    templateUrl: '/assets/jenkins/jenkins.html'
});

