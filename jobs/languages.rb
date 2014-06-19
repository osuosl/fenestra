projects = settings.projects || []

SCHEDULER.every '1h' do
	##Constructing github api url
	url_base = "https://api.github.com/repos/" + projects.first['repo']
	#latest_sha = nil
	#latest_sha = data['object']['sha']
	##Set other variables to nil
	ruby = 20	
	python = 2
	javascript = 30
	css = 10
	shell = 5
	language_url = URI(url_base + "/languages/") #latest_sha)
	#Get data for each language
	Net::HTTP::start(languages_url.host, languages_url.port,
					 :use_ssl => languages_url.scheme == 'https') do |http|
		request = Net::HTTP::Get.new languages_url

		response = http.request request
		data = JSON.parse(response.body)
		puts data
		ruby = ruby + data['Ruby']
		python = python + data['Python']
		javascript = javascript + data['JavaScript']
		css = css + data['CSS']
		shell = shell + data['Shell']
					 end

	#Begin constructing actual g
	#First let's try making a dataset
	#def setup
	@dataset = [
		[:Ruby, [ruby]],
		[:Python, [python]],
		[:JavaScript, [javascript]],
		[:CSS, [css]],
		[:Shell, [shell]]
	]
	g = Gruff::Pie.new
	g.title = "Languages used by the OSL"
	@dataset.each do |data|
		g.data(data[0], data[1])
		#g.data 'Ruby', ruby
		#g.data 'Python', python
		#g.data 'JavaScript', javascript
		#g.data 'CSS', css
		#g.data 'Shell', shell
		g.write('piechart.png')
	end
	send_event('languages', { project:
			   {title: projects.first['repo']}
	})
	puts 'rotating'
	projects.rotate!
end
