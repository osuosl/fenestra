'use strict';

dashing = dashing || angular.module('dashing', []);

dashing.controller('TweetCtrl', ['$scope',
  $scope => {
    $scope.$on('twitter_mentions', (e, data) => {
      $scope.comments = data.comments;
      if ($scope.commments && $scope.comments.length > 0) {
        $scope.currentComment = $scope.comments[0];
      }
    });
  },
]).

directive('commentCarousel', ['$interval', $interval => {
  const link = function link(scope, element) {
    scope.currentIndex = 0;

    const updateComment = function updateComment() {
      const comments = scope.comments;
      scope.currentIndex = (scope.currentIndex + 1) % comments.length;
      scope.currentComment = comments[scope.currentIndex];
    };

    const nextComment = function nextComment() {
      const comments = scope.comments;
      if (comments && comments.length > 0) {
        updateComment();
      }
    };

    const startCarousel = function startCarousel() {
      return $interval(nextComment, 5000);
    };

    nextComment();
    const timeoutId = startCarousel();

    element.on('$destroy', () => {
      $interval.cancel(timeoutId);
    });
  };

  return {
    restrict: 'E',
    templateUrl: '/assets/twitter/twitter.html',
    scope: {
      comments: '=comments',
    },
    link,
  };
}]);
