require 'net/http'
require 'json'
require 'gruff'
require 'octokit'

projects = settings.projects || []

SCHEDULER.every '1h' do
    client = Octokit::Client.new(:access_token => settings.github['token'])
    user = client.user 
    user.login
    languages_url = URI("https://api.github.com/repos/" + projects.first['repo'] + "/languages")
    ruby = python = javascript = css = shell = 0
    #Get data for each language
    Net::HTTP.start(languages_url.host, languages_url.port, :use_ssl => (languages_url.scheme == 'https')) do |http|        
        response = http.request(Net::HTTP::Get.new(languages_url.request_uri))
        data = JSON.parse(response.body)    
        ruby = ruby + (data['Ruby']).to_i
        python = python + (data['Python']).to_i
        javascript = javascript + (data['JavaScript']).to_i
        css = css + (data['CSS']).to_i
        shell = shell + (data['Shell']).to_i
        end

    #Begin constructing actual g
    #First let's try making a dataset
    @dataset = [
        [:Ruby, [ruby]],
        [:Python, [python]],
        [:JavaScript, [javascript]],
        [:CSS, [css]],
        [:Shell, [shell]]
    ]
    g = Gruff::Pie.new
    g.title = nil
    g.theme = {
    :colors =>['#A11C03', '#9DB61E', '#2C3E50', '#F39C12'],
    :marker_color => '#000',
    :background_colors => ['#00B0C6', '#00B0C6']
    }
    #g.hide_legend = true
    @dataset.each do |data|
        g.data(data[0], data[1])
    end
    g.write("assets/images/piechart.png")
    send_event('languages', {})
    projects.rotate!
end

