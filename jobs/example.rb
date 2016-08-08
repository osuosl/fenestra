require 'sinatra'
require 'gruff'
require_relative 'rimesync/lib/rimesync.rb'
require 'net/http'

value = 1

SCHEDULER.every '15s' do
    WebMock.disable!
    ts = TimeSync.new(baseurl="http://timesync-staging.osuosl.org/v0/", test:false)
    resp = ts.authenticate(username:"test", password:"test", auth_type:"password")

    users = ts.get_users()
    projects = ts.get_projects()

    endTime = Time.now
    # There are a lot of seconds in a week
    startTime = (endTime - 604800)

    query = {
        'start' => [startTime.iso8601],
        'end' => [endTime.iso8601]
    }

    week = []
    for i in 1...7
        week[i - 1] = (startTime + (86400 * i)).strftime("%Y-%m-%d")
    end

    times = ts.get_times(query)

    user_times = Hash.new
    times.each do |time|
        if user_times.key?(time['user'])
            user_times[time['user']] = user_times[time['user']] + time['duration']
        else
            user_times[time['user']] = time['duration']
        end
    end

    #puts "#{user_times}"
    top_users = user_times.sort_by{|_key, value| value}
    #puts "#{top_users}"

    #.sort_by{|hsh| hsh[:time]}

    project_times = Hash.new
    times.each do |time|
       if project_times.key?(time['project'][0])
           project_times[time['project'][0]] = project_times[time['project'][0]] + time['duration']
       else
           project_times[time['project'][0]] = time['duration']
       end
    end

    project_graph = Gruff::Pie.new
    project_graph.title = 'Projects'
    project_times.each do |project|
        project_graph.data(project[0], project[1])
    end
    project_graph.write("assets/images/project_graph.png")

    total_times = Hash.new
    times.each do |time|
        week.each do |day|
            if time['date_worked'] == day
                if total_times.key?(day)
                    total_times[day] = total_times[day] + time['duration']
                else
                    total_times[day] = time['duration']
                end
                total_times[day] = total_times[day] + time['duration']
            end
        end
    end

    time_graph = Gruff::Line.new
    time_graph.title = 'Times'
    #puts "#{week}"
    week.each do |day|
        time_graph.labels[0] = day
    end
    #time_graph.labels = week
    data = []
    total_times.each do |time|
        data << time[1]
    end
    time_graph.data('times', data)
    time_graph.write("assets/images/time_graph.png")

    #how to sort an array of hashes. will be needed later probably
    #.sort_by{|hsh| hsh[:time]}
    send_event('counter', { users: top_users })
    WebMock.enable!
end
