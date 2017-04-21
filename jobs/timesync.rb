require 'sinatra'
require 'gruff'
require 'rimesync'
require 'net/http'
require 'webmock'

SCHEDULER.every '1h', first_in: '3s' do
  # Auth with timesync through rimesync
  ts = TimeSync.new(settings.timesync['url'])
  resp = ts.authenticate(username: settings.timesync['user'],
                         password: settings.timesync['password'],
                         auth_type: settings.timesync['use_ldap'] ? 'ldap' : 'password')

  if resp.key? 'rimesync error'
    send_event('timesync', error: resp)
    return
  end

  # Number of days to track things over
  day_number = settings.timesync['time_length']

  # Get the current time
  # Need to get the dates for the last week
  end_time = Time.now
  # Start time is dayNumber days ago
  # There are a lot of seconds in a week
  start_time = (end_time - (day_number * 86_400))

  # Get the dates for the past dayNumber days
  # Necessary for the Total Times graph
  days = []
  (0..day_number).each do |i|
    days[i] = (start_time + (86_400 * i)).strftime('%Y-%m-%d')
  end

  # Construct the search query
  query = {
    # ISO 8601 is "####-##-##T##:##:##Z", but we just want the dates
    # The date is always the first 10 characters, so just grab those
    'start' => [start_time.iso8601[0..9]],
    'end' => [end_time.iso8601[0..9]]
  }

  # Get all the times from the past week
  times = ts.get_times(query)

  if times.is_a?(Hash) ||
     (times.is_a?(Array) && times.length == 1 && times[0].key?('rimesync error'))
    send_event('timesync', error: resp)
    return
  end

  # Get the total time for each user that worked in the past week
  user_times = {}
  times.each do |time|
    # We want the duration in hours, not seconds
    duration = time['duration'].fdiv(3600)
    # If the key doesn't exist, make it, else update it
    user_times[time['user']] = if user_times.key?(time['user'])
                                 user_times[time['user']] + duration
                               else
                                 duration
                               end
  end

  # Sort the users by total time worked and get the top 10
  top_users = user_times.sort_by { |_, time| time }.reverse[0..10]
  # Get their display name instead of their username
  top_users.each do |user|
    user[0] = ts.get_users(user[0])[0]['display_name']
    user[1] = user[1].round
  end

  # Get the total times for each project
  # Since we're not looking at that in the chart it doesn't matter if it's in
  # seconds
  project_times = {}
  times.each do |time|
    if project_times.key?(time['project'][0])
      project_times[time['project'][0]] = project_times[time['project'][0]] + time['duration']
    else
      project_times[time['project'][0]] = time['duration']
    end
  end

  # Get the project names instead of their slugs
  # Uses two different hashes because you can't update the hash you're
  # iterating on
  name_times = {}
  project_times.each do |project|
    name = ts.get_projects('slug' => project[0])[0]['name']
    name_times[name] = project[1]
  end
  project_times = name_times

  # Make the projects pie chart
  project_graph = Gruff::Pie.new
  project_graph.title = 'Projects'
  project_graph.theme = {
    colors: %w[#A11C03 #9DB61E #2C3E50 #F39C12 #BF42F4 #00C437 #210FA8 #763e82 #D1C600 #05B270],
    marker_color: '#000',
    background_colors: %w[#12b0c5 #12b0c5]
  }
  # Put in the data: name and total time
  project_times.each do |project|
    project_graph.data(project[0], project[1])
  end
  project_graph.write('assets/images/project_graph.png')

  # Get the total times for the week
  total_times = {}
  times.each do |time|
    # Hours, not seconds
    duration = time['duration'].fdiv(3600)
    # Add the times up based on day
    days.each do |day|
      next unless time['date_worked'] == day

      # If the key doesn't exist, create it, otherwise update it
      total_times[day] = if total_times.key?(day)
                           total_times[day] + duration
                         else
                           duration
                         end
    end
  end

  # Need to fill in days where nothing happened
  full_times = {}
  days.each do |day|
    total_times.each do |time|
      full_times[day] = time[1] if time[0] == day
    end
    full_times[day] = 0 unless full_times.key?(day)
  end
  total_times = full_times

  # Make the line graph for the total times
  time_graph = Gruff::Line.new
  time_graph.title = 'Times'
  time_graph.theme = {
    colors: ['#A11C03'],
    marker_color: '#fff',
    font_color: '#000',
    background_colors: %w[#12b0c5 #12b0c5]
  }
  time_graph.y_axis_increment = 1
  # Make the labels for the graph
  i = 0
  days.each do |day|
    time_graph.labels[i] = day[-5, 5]
    i += 1
  end

  # Put in the data for the graph in an array
  data = []
  total_times.each do |time|
    data << time[1]
  end

  # Add the data to the graph
  time_graph.data('times', data)
  time_graph.write('assets/images/time_graph.png')

  # Send the users array to the html template
  send_event('timesync', users: top_users)
end
