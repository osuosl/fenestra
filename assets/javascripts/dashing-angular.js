var dashing = dashing || angular.module('dashing', []);

dashing.controller('EventCtrl', ['$scope',
  function ($scope) {
    'use strict';
    var source = new EventSource('/events');

    source.addEventListener('message', function (message) {
      var data = JSON.parse(message.data);
      if (angular.isObject(data)) {
        $scope.$apply(function () {
          $scope.$broadcast(data.id, data);
        });
      }
    }, false);
  }
]);
