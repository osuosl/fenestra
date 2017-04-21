require 'twitter'
require 'sinatra'

#### Get your twitter keys & secrets:
#### https://dev.twitter.com/docs/auth/tokens-devtwittercom
twitter = Twitter::REST::Client.new do |config|
  config.consumer_key = settings.twitter['consumer_key']
  config.consumer_secret = settings.twitter['consumer_secret']
  # config.oauth_token = settings.twitter['oauth_token']
  # config.oauth_token_secret = settings.twitter['oauth_token_secret']
end

search_term = URI.encode('osuosl')

SCHEDULER.every '10m', first_in: 0 do
  begin
    tweets = twitter.search(search_term.to_s)

    if tweets
      tweets = tweets.map do |tweet|
        { name: tweet.user.name, body: tweet.text, avatar: tweet.user.profile_image_url_https }
      end
      send_event('twitter_mentions', comments: tweets)
    end
  rescue Twitter::Error
    puts 'For the twitter widget to work, you need to put in your twitter API keys in the jobs/twitter.rb file.'
  end
end
