require 'dashing'
require "sinatra/config_file"

configure do
	#set :auth_token, 'YOUR_AUTH_TOKEN'

	set :logging, true
	set :twitter_set, false
	# Adds the config to settings
	config_file 'config.yml'
	begin
		if settings.twitter['consumer_key']
			enable :twitter_set
		end
	rescue
		disable :twitter_set 
	end
	settings.sprockets.append_path("assets/bower_components")
	settings.sprockets.append_path("assets/widgets")

	helpers do
		def protected!
			# Put any authentication code you want in here.
			# This method is run before accessing any resource.
		end
	end
end
