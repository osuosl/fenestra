.. _tools:

Tools Used
==========

AngularJS:
----------

`Angular`_ is a web application framework that we use to bind data
to the dashboard.  Dashing typically uses batmanjs to accomplish this,
but in an effort to avoid writing coffeescript and learn a more 
widely used tool, we opted to use Angular instead.  If you've never
used Angular, I would highly recommend going through their 
`great tutorial`_, just so that "ng-app" and "ng-controller" aren't
gibberish.  The actual use of Angular is very repetitive across 
widgets, so you can just follow the templates if you aren't interested
in learning more about Angular, but it's an excellent and easy 
framework worth being familiar with.

.. code::

    $ bower install angular

Dashing:
--------

`Dashing`_ is a Sinatra-based dashboard framework that makes adding
and styling a widget easy.  Jobs (or widgets) are written in ruby and
updated according to a scheduler, when data is passed to the actual
widget (think html, css, and js) and the widget itself is updated. 
Dashing makes everything looks nice, run smoothly, and has fancy 
features like drag-and-drop widgets and automagic sizing.
There are also several `third-party widgets`_ that are easy to 
customize and stick on your dashboard. 

.. code::
    
    $ gem install dashing

Sass:
-----

`Sass`_ is a CSS extension which make writing CSS much more bearable.
It has a lot of `nice features`_, but don't worry if you don't know 
it! All valid CSS is also valid Sass.  What you can do is read the 
docs and look at the widgets which are already there to try to 
learn how to make your life easier with sass, but in the meantime
write CSS in a .scss file, and it will magically be compiled to 
CSS for you!  Then you can incrementally make changes to the .scss, 
making it more sassy (official term), while still getting things done.
Yay!  If you're interested in exploring Sass on your own, you can

.. code::
	
	$ gem install sass
	$ sass --watch input.scss:output.css # To compile into css


Github API:
-----------

Many of our widgets use data from `github`_, so we make frequent use
of the `github api`_.  The api is very well documented and easy to
use, the only thing you need to keep in mind is that they `rate-limit`_
requests, so don't go too crazy with it!

.. _Angular: https://angularjs.org/
.. _Dashing: https://shopify.github.io/dashing/
.. _Sass: http://sass-lang.com
.. _nice features: http://slides.lucywyman.me/sass.html
.. _third-party widgets: https://github.com/Shopify/dashing/wiki/Additional-Widgets
.. _great tutorial: https://docs.angularjs.org/tutorial
.. _github: https://github.com
.. _github api: https://developer.github.com/v3/
.. _rate-limit: https://developer.github.com/v3/rate_limit/
