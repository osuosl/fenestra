Fenestra
========

A dashboard for the OSU Open Source Lab, based on the Dashing 
dashboard by Shopify. Check out http://shopify.github.com/dashing for 
more information.

This dashboard includes module for displaying OSL datacenter, FTP and 
social data. It will eventually include a touch interface to the API, 
allowing for control of the displayed dashboard via a web or Android 
app.

Setup
-----

Fenestra uses bower to handle JS dependencies, install bower 
and use it by running:

.. code::

    npm install -g bower
    bower install

Fenestra requires Ruby Version 1.9.X and above; if you are not using 
this by default refer to the `Using RVM`_ section.
To install the ruby dependencies run 

.. code::

    bundle install

If you get an error message involving rmagick, try 
:code:`sudo apt-get install libmagickwand-dev` for Debian and 
:code:`yum install ImageMagick-devel` for RHEL.

Lastly, copy the file `config.yml.sample` to `config.yml`

.. code::

    cp config.yml.sample config.yml

Using RVM
---------

First make sure you have RVM installed http://rvm.io/rvm/install.

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

.. Using RVM: #using-rvm
