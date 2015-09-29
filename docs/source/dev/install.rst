.. _install:

Installation
============

Setup
-----

Fenestra uses bower to handle JS dependencies, install bower 
and use it by running:

.. code::

    npm install -g bower
    bower install

Fenestra requires Ruby Version 1.9.X and above; if you are not using 
this by default refer to the [Using RVM](#using-rvm) section.
To install the ruby dependencies run 

.. code::

    bundle install

If you get an error message involving rmagick, try 
`sudo apt-get install libmagickwand-dev` for Debian and 
`yum install ImageMagick-devel` for RHEL.

Lastly, copy the file `config.yml.sample` to `config.yml`

.. code::

    cp config.yml.sample config.yml

Using RVM
---------

First make sure you have RVM installed [http://rvm.io/rvm/install].

Next, make sure you have RVM in your PATH and sourced RVM scripts by 
adding the following lines to your bashrc:

.. code::

    export PATH="$HOME/.rvm/bin:$PATH" # Add RVM to PATH for scripting
    source $HOME/.rvm/scripts/rvm

RVM conflicts with other ruby managers. Be sure that only one is being used.

Create a gemset specifically for your Fenestra gems:

.. code::

    rvm gemset create fenestra
    rvm gemset use fenestra
    bundle install

Starting The App
----------------

To start Fenestra, run 

.. code::

    dashing start
