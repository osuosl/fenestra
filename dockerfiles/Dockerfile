FROM centos:latest
RUN yum -y install git
RUN git clone https://github.com/osuosl/fenestra.git /opt/code
WORKDIR /opt/code
RUN git checkout issues/31/timesync_widget

 # JS stuff
RUN curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
RUN yum -y install nodejs
RUN npm install -g bower
RUN bower install --allow-root

# Ruby Stuff
RUN yum -y install make ImageMagick gcc-c++ ImageMagick-devel which

# RVM
RUN gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
RUN \curl -sSL https://get.rvm.io | bash -s stable
#RUN source /etc/profile.d/rvm.sh
RUN /bin/bash -l -c "rvm install ruby-2.2.2"
RUN /bin/bash -l -c "rvm default use 2.2.2"
RUN /bin/bash -l -c "gem install bundler"
RUN /bin/bash -l -c "bundle install"
RUN cp config.yml.sample config.yml
#Copy config.yml.sample to config.yml
#Remove the comment at the top
WORKDIR jobs
RUN git clone https://github.com/osuosl/rimesync.git
WORKDIR rimesync
RUN git checkout develop
WORKDIR ../../
CMD /bin/bash -l -c "dashing start"
