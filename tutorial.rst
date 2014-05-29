========
TUTORIAL
========
Getting Started
---------------

Let's look at `jobs/example.rb`
    
    require 'sinatra'

    SCHEDULER.every '1s' do
      send_event('example_counter', { example: count })
    end

Let's look at `assets/widgets/example/example.js`

    var dashing = dashing || angular.module('dashing', []);

    dashing.controller('ExampleCtrl', ['$scope',
      function ($scope) {
        'use strict';

        $scope.$on('example_counter', function (e, data) {
          $scope.example = data.count;
        });
      }
    ])

    .directive('exampleNum', function() {
      return {
        restrict: 'E',
        templateUrl: '/assets/example/example.html'
      }
    });
                                    
Let's look at `/assets/example/example.html`
    <div id="example_counter" ng-controller="ExampleCtrl">
        <h1 class="title">Awesome Example Counter: </h1>
        <div>{{example_counter}}</div>
    </div>
