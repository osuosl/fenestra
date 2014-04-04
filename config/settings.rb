require 'dashing'
require "sinatra/config_file"

configure do
  #set :auth_token, 'YOUR_AUTH_TOKEN'

  set :logging, :true

  settings.sprockets.append_path("assets/bower_components")

  # Adds the config to settings
  config_file 'config.yml'

  helpers do
    def protected!
      settings.twitter['consumer_key'] = 'qweqwe'
     # Put any authentication code you want in here.
     # This method is run before accessing any resource.
    end
  end
end
