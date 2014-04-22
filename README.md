A dashboard for the OSU Open Source Lab, based on the Dashing dashboard by Shopify, check out http://shopify.github.com/dashing for more information.

This dashboard includes module for displaying OSL datacenter, ftp and social data. It will eventually include a touch interface to the API allowing for control of the displayed dashboard via a web or Android app.

Setup
=====

Fenestra uses bower to handle JS dependencies, install bower like so:

````
npm install -g bower
````

To install the ruby dependencies run, or refer to the [Using RVM](#rvm) section.

````
bundle install
````

<a name="rvm"></a>Using RVM
=========

Create a gemset specifically for your Fenestra gems:

````
rvm gemset create fenestra
rvm gemset use fenestra
bundle install
````
