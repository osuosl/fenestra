========
TUTORIAL
========
Getting Started
---------------

Fenestra is a dashboard framework based on Dashing; the only are the removal of coffeescript and batman.js. All Fenestra widgets use Sinatra Ruby.

Here is a quick tutorial for how to build a basic dashboard widget of your own.

---

The jobs directory contains every process which runs on the server. Here we store all of our widgets.

Create a file `jobs/example.rb`. It should look like this:
    
    require 'sinatra'   

    value = 1

    SCHEDULER.every '1s' do     
      value += 1
      send_event('counter', { foo: value })
    end

`sinatra` is required for all Fenestra Widgets.
`1s` specifies the refresh time
  s/m/h stand for second/minute/hour respectively
`send_event` takes a widget's unique ID and JSON information
  this data is sent to `assets/widgets/example.js`...

---

Now create a directory `assets/widgets/example` and a file `example.js`

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
        restrict: 'E',
        templateUrl: '/assets/example/example.html'
      }
    });

`dashing.controller` and `.directive` are sent to example.html, which is embedded in the main dashboard `sample.erb` file.
`$scope.example = data.count;` sets `$scope.example` to a variable which can be used by the rest of the file. In this instance, `data.count` is a number, but it can be any .json string.
`restrict: 'E'` says this is an <element> and the `templateURL` tells it where to find the html to fill that element when it is used.


---

Let's look at `/assets/widgets/example/example.html`
    <div id="example_counter" ng-controller="ExampleCtrl">
        <h1 class="title">Awesome Example Counting Widget: </h1>
        <div>{{exampleCounter}}</div>
    </div>

`ng-controller="ExampleCtrl"` originates from the first argument passed to `dashing.controller`
`<div>{{example_couter}}</div>` is how you would display pieces of data you generated in your original ruby file (in this case, `example.rb`

---

Copy over `assets/widgets/buzzwords/buzzwords.scss` to `assets/widgets/example/example.scss`
This file can be modified similarly to a reuglar css file, but for now we just want a working widget.

---

Now add the following lines to `dashboards/sample.erb` between the `<ul></ul>` tags
    <li>
      <div ng-controller="ExampleCtrl">
        <example-num></example-num>
      </div>
    </li>

Sample.erb treats each item like an item in an unordered list.
Each item is contained within a div. The `ng-controller` directive specifies which widget should be used (this is specified in line 3 of `example.js`
The ID in `.directive( , )` in `example.js` (line 13) is converted to dash-spacing and is your widget's html from example.html.
