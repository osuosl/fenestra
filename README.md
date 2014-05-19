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

Copy the file `config.yml.sample` to `config.yml`.

You will also need ExecJS.

Fenestra requires Ruby Version 1.9.X and above; if you are not using this by default refer to the [Using RVM](#rvm) section.

<a name="rvm"></a>Using RVM
=========

First make sure you have RVM installed [http://rvm.io/rvm/install]

Next make sure you have RVM in your PATH and sourced RVM scripts by adding the following lines to your bashrc:
````
export PATH="$HOME/.rvm/bin:$PATH" # Add RVM to PATH for scripting
source $HOME/.rvm/scripts/rvm
````

RVM conflicts with things like Chef. Don't forget to comment out lines in your bashrc like this:
````
#export PATH=/opt/chefdk/embedded/bin:~/.chefdk/gem/ruby/2.1.0/bin:$PATH
````

Create a gemset specifically for your Fenestra gems:

````
rvm gemset create fenestra
rvm gemset use fenestra
bundle install
````

Starting The App
================

To start Fenestra run `dashing start`

