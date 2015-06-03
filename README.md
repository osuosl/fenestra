A dashboard for the OSU Open Source Lab, based on the Dashing 
dashboard by Shopify, check out http://shopify.github.com/dashing for 
more information.

This dashboard includes module for displaying OSL datacenter, ftp and social data. It will eventually include a touch interface to the API allowing for control of the displayed dashboard via a web or Android app.

Setup
=====

Fenestra uses bower to handle JS dependencies, install bower like so:

````
npm install -g bower
````

Once bower is installed, run 
```
bower install
``` 
to install our JS 
dependencies.

Fenestra requires Ruby Version 1.9.X and above; if you are not using 
this by default refer to the [Using RVM](#rvm) section.

To install the ruby dependencies run `bundle install`,

If you get an error message involving rmagick, try 
`sudo apt-get install libmagickwand-dev` for debian and 
`yum install ImageMagick-devel` for rhel

Copy the file `config.yml.sample` to `config.yml`.

<a name="rvm"></a>Using RVM
=========

First make sure you have RVM installed [http://rvm.io/rvm/install]

Next make sure you have RVM in your PATH and sourced RVM scripts by 
adding the following lines to your bashrc:
````
export PATH="$HOME/.rvm/bin:$PATH" # Add RVM to PATH for scripting
source $HOME/.rvm/scripts/rvm
````

RVM conflicts with other ruby managers. Be sure that only one is being
 used

Create a gemset specifically for your Fenestra gems:

````
rvm gemset create fenestra
rvm gemset use fenestra
bundle install
````

Starting The App
================

To start Fenestra run `dashing start`


If you have trouble installing gruff, look here: 
http://stackoverflow.com/questions/8768103/how-to-install-gruff-rmagic-gem-on-ubuntu-system
