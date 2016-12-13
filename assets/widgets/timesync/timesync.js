var dashing = dashing || angular.module('dashing', []);

dashing.controller('TimesyncCtrl', ['$scope',
    function ($scope) {
        'use strict';

        $scope.$on('timesync', function (e, data) {
            if (data['error']) {
                $scope.error = data.error;
            } else {
                angular.extend($scope, data);
            }
        });
    }
])

.directive('timesyncData', ['$interval', '$timeout', function($interval, $timeout) {
    function link(scope, element, attrs) {
        scope.currentIndex = 0;

        const views = [document.getElementById('timesync_users'),
                       document.getElementById('project_graph'),
                       document.getElementById('time_graph')];

        function nextView() {
            for (view of views) {
                view.style.display='none';
            }
            views[scope.currentIndex].style.display='block';
            scope.currentIndex = (scope.currentIndex + 1) % views.length;
        }

        function startCarousel () {
            return $interval(nextView, 30000);
        }

        var timeoutId = startCarousel();

        element.on('$destroy', function () {
            $interval.cancel(timeoutId);
        });
    }

    return {
        restrict: 'E',
        templateUrl: '/assets/timesync/timesync.html',
        link: link,
    }
}]);
