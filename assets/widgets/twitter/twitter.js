var dashing = dashing || angular.module('dashing', []);

dashing.controller('TweetCtrl', ['$scope',
  function ($scope) {
    'use strict';

    $scope.$on('twitter_mentions', function (e, data) {
      $scope.comments = data.comments;
      if ($scope.commments && $scope.comments.length > 0) {
        $scope.currentComment = $scope.comments[0];
      }
    });
  }
])

.directive('commentCarousel', ['$interval', '$timeout', function($interval, $timeout) {

  function link(scope, element, attrs) {
    scope.currentIndex = 0;
    // if (!scope.comments || scope.comments.length == 0) {
    //   scope.showComments = false;
    //   console.log('test');
    // }
    var ele = $(element).find('.comment-container');

    function updateComment() {
      var comments = scope.comments;
      scope.currentIndex = (scope.currentIndex + 1) % comments.length;
      scope.currentComment = comments[scope.currentIndex];
    }

    function nextComment () {
      var comments = scope.comments;
      if (comments && comments.length > 0) {
        updateComment();
        // ele.fadeOut(800, function() {
        //   updateComment();
        //   $timeout(function(){
        //     ele.fadeIn();
        //   },1000);
        // });
      }
    }

    function startCarousel () {
      return $interval(nextComment, 5000);
    }

    nextComment();
    var timeoutId = startCarousel();

    element.on('$destroy', function () {
      $interval.cancel(timeoutId);
    });
  }

  return {
    restrict: 'E',
    templateUrl: '/assets/twitter/twitter.html',
    scope: {
      comments: '=comments',
    },
    link: link
  };
}]);
