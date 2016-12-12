var dashing = dashing || angular.module('dashing', []);

dashing.controller('ExampleCtrl', ['$scope',
    function ($scope) {
        'use strict';

        $scope.$on('counter', function (e, data) {
            $scope.exampleCounter = data.count;
        });
    }
])

.directive('exampleNum', function() {
    return {
        restrict: 'E', templateUrl: '/assets/example/example.html'

    }
});
