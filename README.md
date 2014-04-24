A dashboard for the OSU Open Source Lab, based on the Dashing dashboard by Shopify, check out http://shopify.github.com/dashing for more information.

This dashboard includes module for displaying OSL datacenter, ftp and social data. It will eventually include a touch interface to the API allowing for control of the displayed dashboard via a web or Android app.

Setup
=====

Fenestra uses bower to handle JS dependencies, install bower like so:

````
npm install -g bower
````

Once bower is installed, run `bower install` to install our JS dependencies.

To install the ruby dependencies run `bundle install`,
or refer to the [Using RVM](#rvm) section.


<a name="rvm"></a>Using RVM
=========

Create a gemset specifically for your Fenestra gems:

````
rvm gemset create fenestra
rvm gemset use fenestra
bundle install
````

Starting The App
================

To start Fenestra run `dashing start`

