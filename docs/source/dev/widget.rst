.. _widget:

Writing a Widget
================

There are a few separate components involved when creating a widget.

Layouts
-------

The Job
-------

Jobs are written in ruby, and are used to collect and format data, then
send it to Angular to be arranged in the widget's template.  There are
a few components consistent across jobs:

1. **SCHEDULER**: The scheduler defines how frequently the job is run.
   At each time interval the script is re-run from top to bottom, and
   the widget is updated (even if nothing has changed!)
2. **send_event**: This sends data to the specified widget 
   (in a JSON object??)
   including a map of variables in the job to variables in your 
   templates. It's essentially the return statement of the job.
3. **settings.$thin**: This is how you access variables defined in
   config.yml

The Widget
----------

Though not the most intuitive you'll find the html, css, and js for
your widget in :code:`assets/widgets`.  The structure is something 
like this:

.. code:: 

    assets/widgets/
    ├── commits
    │   ├── commits.html
    │   ├── commits.js
    │   └── commits.scss
    ├── jenkins
    │   ├── jenkins.html
    │   ├── jenkins.js
    │   └── jenkins.scss
    ├── languages
    │   ├── languages.html
    │   ├── languages.js
    │   └── languages.scss
    ├── nero
    │   ├── nero.html
    │   ├── nero.js
    │   └── nero.scss
    └── twitter
        ├── twitter.html
        ├── twitter.js
        └── twitter.scss

1. **HTML**: If you went through the `AngularJS tutorial`_ most of 
   this will look familiar.  :code:`ng-controller` specifies the 
   controller for that particular widget, and :code:`{{ widget.variable}}`
   will be populated by the controller with data from your job. 
   All of your widgets should adhere to the following template:

    .. code-block:: html

        <div id="$WIDGET-NAME" class="widget-list" ng-controller="$CONTROLLER">
            <div class="wrapper">
                CONTENT
            </div>
        </div>

2. **SCSS**: Dashing allows you to use `sass`_!  **If you haven't written
   sass, all valid css is also valid sass, so just write css**. 
   However, I would *highly* recommend taking the time to learn sass,
   as it will save you time, heartache, and headaches in the future.

3. **JS**: This is the Angular part of the system. 

.. code-block:: js

	var dashing = dashing || angular.module('dashing', []);


This says to either use the local dashing or the angular dashing
module.

.. code-block:: js

	dashing.controller('LanguagesCtrl', ['$scope', 
		function ($scope) {
			  'use strict'

This create a dashing controller for our widget, with the name
specified.  The use strict is basically saying:

	Strict mode helps out in a couple ways:

		* It catches some common coding bloopers, throwing exceptions.
		* It prevents, or throws errors, when relatively "unsafe" actions are taken (such as gaining access to the global object)
		* It disables features that are confusing or poorly thought out.

Source: http://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it


.. code-block:: js
	
	  $scope.$on('languages', function (e, data) {
          angular.extend($scope, data);		  


.. code-block:: js

	.directive('languagesGraph', function() {
	  return {
	      restrict: 'E',
		  templateUrl: '/assets/languages/languages.html'

This is where the magic happens - the data is bound to the 
"languagesGraph", the template is rendered, and angular fills in the 
appropriate data.  

.. _AngularJS tutorial: http://docs.angularjs.org/tutorial
.. _sass: http://sass-lang.com/documentation/file.SASS_REFERENCE.html
