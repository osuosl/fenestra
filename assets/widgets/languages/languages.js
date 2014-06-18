var dashing = dashing || angular.module('dashing', []);

dashing.controller('LanguagesCtrl', ['$scope', 
		function ($scope) {
			'use strict';

			$scope.$on('languages', function (e, data) {
				angular.extend($scope, data);
			});
		}
])

.directive('languagesGraph', function() {
	return {
		restrict: 'E',
templateUrl: '/assets/languages/languages.html'
	}
});
