Contributing 
============

First Steps:
------------

0. Before you submit and issue, try asking for help first either on irc in #osuosl or by emailing us at info@osuosl.org.  Make sure the issue is reproducible, and that you've genuinely tried to fix it before submitting and issue.
1. If we agree that something needs to be improved, submit an issue on `github <https://github.com/osuosl/fenestra>`_ describing what the issue you're having is and how you're thinking of fixing it.
2. Fork the repository
3. Clone it: :code:`git clone git://github.com/<YOUR USERNAME>/fenestra.git`
4. Create a new git branch: :code:`git checkout -b <YOUR USERNAME>/<issue number>`
5. Follow the `INSTALL <#>`_ docs to set up your development environment.

Making your changes:
--------------------

1. Make any changes you had in mind and test them!  We do not currently have a test suite, but hope to soon -- for now, just run :code:`dashing start` and ensure that the application is doing what you expect and want it to.
2. Once you're satisfied with your changes run 
    - :code:`git status` and note the files that you've changed.  
    - :code:`git add <FILES>` where files are any relevant files that you made changes to.
    - :code:`git commit`, and enter a single line commit message, an empty line, and then as many lines as you need with more details about the things you changed.
    - :code:`git push origin <YOUR BRANCH NAME>`
3. Go to the `origin fenestra <https://github.com/osuosl/fenestra>`_ -- there should be a large green "Submit a pull request" button.  Click it.
4. Submit a pull request, adding comments as necessary.  We will review it within the week and merge it when we think it's ready.

Please contact us with any questions you have, either on irc in #osuosl
or by emailing us at info@osuosl.org.  Thank you so much for your interest in fenestra, and we hope to work with you soon!


