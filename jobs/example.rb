require 'sinatra'
require_relative 'rimesync/lib/rimesync'

value = 1

SCHEDULER.every '1h' do
    ts = TimeSync.new(baseurl="http://timesync-staging.osuosl.org/v0/")
    ts.authenticate(username:"test", password:"test", auth_type:"password")

    users = ts.get_users()

    endTime = Time.now
    # There are a lot of seconds in a week
    startTime = endTime - 604800

    query = {
        'start_time' => startTime,
        'end_time' => endTime
    }

    times = ts.get_times(query_parameters:query)

    user_times = []
    users.each do |user|
        user_times[user] = 0
        times[user].each do |time|
            user_times[user] = user_times[user] + time['duration']
        end
    end

    #how to sort an array of hashes. will be needed later probably
    #.sort_by{|hsh| hsh[:time]}
    value += 1
    send_event('counter', { foo: value })
end
