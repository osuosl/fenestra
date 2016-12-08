require 'net/http'
require 'json'
require 'gruff'
require 'octokit'

projects = settings.projects || []

SCHEDULER.every '1h' do
  client = Octokit::Client.new(:access_token => settings.github['token'])
  languages = Hash.new(0)
  sum = 0

  projects.each do |project|
    data = client.languages project['repo']
    data.each do |lang, val|
      languages[lang] = languages[lang] + val
      sum += val
    end
  end

  #Begin constructing actual graph
  g = Gruff::Pie.new
  g.title = nil
  g.theme = {
  :colors => ['#A11C03', '#9DB61E', '#2C3E50', '#F39C12', '#BF42F4',
              '#00C437', '#210FA8', '#763e82', '#D1C600', '#05B270'],
  :marker_color => '#000',
  :background_colors => ['#00B0C6', '#00B0C6']
  }

  languages.each do |lang, val|
    if val.fdiv(sum) > 0.01 then
      g.data(lang, val)
    end
  end
  g.write("assets/images/piechart.png")
  send_event('languages', {})
end
