'use strict';

dashing = dashing || angular.module('dashing', []);

dashing.controller('TimesyncCtrl', ['$scope',
  $scope => {
    $scope.$on('timesync', (e, data) => {
      if (data.error) {
        $scope.error = data.error;
      } else {
        angular.extend($scope, data);
      }
    });
  },
]).
directive('timesyncData', ['$interval', $interval => {
  const link = function link(scope, element) {
    scope.currentIndex = 0;

    const views = [document.getElementById('timesync_users'),
      document.getElementById('project_graph'),
      document.getElementById('time_graph')];

    const timeoutId = (() => {
      return $interval(() => {
        /* eslint-disable prefer-const */
        for (let view of views) {
        /* eslint-enable prefer-const */
          view.style.display = 'none';
        }
        views[scope.currentIndex].style.display = 'block';
        scope.currentIndex = (scope.currentIndex + 1) % views.length;
      }, 30000);
    })();

    element.on('$destroy', () => {
      $interval.cancel(timeoutId);
    });
  };

  return {
    restrict: 'E',
    templateUrl: '/assets/timesync/timesync.html',
    link,
  };
}]);
