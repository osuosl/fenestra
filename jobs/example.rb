require 'sinatra'
require 'gruff'
require_relative 'rimesync/lib/rimesync'

value = 1

SCHEDULER.every '1m' do
    ts = TimeSync.new(baseurl="http://timesync-staging.osuosl.org/v0/")
    ts.authenticate(username:"test", password:"test", auth_type:"password")

    users = ts.get_users()
    projects = ts.get_projects()

    endTime = Time.now
    # There are a lot of seconds in a week
    startTime = (endTime - 604800)

    query = {
        'start_time' => startTime.strftime("%Y/%m/%d"),
        'end_time' => endTime.strftime("%Y/%m/%d")
    }

    week = []
    for i in 1...7
        week[i - 1] = (startTime - (86400 * i)).strftime("%Y/%m/%d")
    end

    times = ts.get_times(query_parameters:query)

    user_times = []
    users.each do |user|
        user_times[user] = 0
        times[user].each do |time|
            user_times[user] = user_times[user] + time['duration']
        end
    end

    top_users = user_times.sort_by{|_key, value| value}.to_h[0,10]


    project_times = []
    projects.each do |project|
        project_times[project] = 0
        times[project].each do |time|
            project_times[project] = project_times[project] + time['duration']
        end
    end

    project_graph = Gruff::Pie.new
    project_graph.title = 'Projects'
    project_times.each do |project|
        project_graph.data(project[0], project[1])
    end
    project_graph.write("assets/images/project_graph.png")

    total_times = []
    times.each do |time|
        week.each do |day|
            if time['date_worked'] == day
                total_times[day] = total_times[day] + time['duration']
            end
        end
    end

    time_graph = Gruff::Line.new
    time_graph.title = 'Times'
    total_times.each do |time|
        time_graph.data(time[0], time[1])
    end
    time.graph.write("assets/images/time_graph.png")

    #how to sort an array of hashes. will be needed later probably
    #.sort_by{|hsh| hsh[:time]}
    send_event('counter', {})
end
