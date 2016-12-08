require 'net/http'
require 'json'
require 'gruff'
require 'octokit'

projects = settings.projects || []

SCHEDULER.every '1h' do
  client = Octokit::Client.new(:access_token => settings.github['token'])
  user = client.user
  user.login
  languages = Hash.new(0)
  sum = 0

  projects.each do |project|
    languages_url = URI("https://api.github.com/repos/" + project['repo'] + "/languages")
    Net::HTTP.start(languages_url.host, languages_url.port, :use_ssl => (languages_url.scheme == 'https')) do |http|
      response = http.request(Net::HTTP::Get.new(languages_url.request_uri))
      data = JSON.parse(response.body)
      data.each do |lang, val|
        languages[lang] = languages[lang] + val
        sum += val
      end
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
  #g.hide_legend = true
  languages.each do |lang, val|
    if val/sum > 0.01 then
      g.data(lang, val)
    end
  end
  g.write("assets/images/piechart.png")
  send_event('languages', {})
end
