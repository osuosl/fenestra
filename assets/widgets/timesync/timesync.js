var dashing = dashing || angular.module('dashing', []);

dashing.controller('TimesyncCtrl', ['$scope',
    function ($scope) {
        'use strict';

        $scope.$on('timesync', function (e, data) {
            angular.extend($scope, data);
        });
    }
])

.directive('timesyncData', function() {
    return {
        restrict: 'E', templateUrl: '/assets/timesync/timesync.html'
    }
});
