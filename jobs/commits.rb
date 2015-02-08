require 'net/http'
require 'json'
require 'octokit'

projects = settings.projects || []

SCHEDULER.every '1m' do
    client = Octokit::Client.new(:access_token => settings.github['token'])
    user = client.user
    user.login
    name = projects.first['repo']
    url_base = "https://api.github.com/repos/" + projects.first['repo']
    # Put together the branches url
    branches_url = URI(url_base + "/git/refs/heads/" + projects.first['branch'])
    latest_sha = latest_committer = commit_message = commit_date = nil
	# Use the branches URL to get the latest commit sha for the branch
    Net::HTTP.start(branches_url.host, branches_url.port, :use_ssl => (branches_url.scheme == 'https')) do |http|
		response = http.request(Net::HTTP::Get.new(branches_url.request_uri))
		data = JSON.parse(response.body)
		latest_sha = data['object']['sha']
	end

	# Commit URL
	commit_url = URI(url_base + "/commits/" + latest_sha)
	Net::HTTP::start(commit_url.host, commit_url.port, :use_ssl => commit_url.scheme == 'https') do |http|
        response = http.request(Net::HTTP::Get.new(commit_url.request_uri))
        data = JSON.parse(response.body)
        latest_committer = data['commit']['committer']['name']
        commit_message = data['commit']['message']
        commit_message = commit_message.split[0...15].join(' ')
    	commit_date = Time.parse(data['commit']['committer']['date']).strftime("%a %b %e %Y")
	end

    send_event('commits', { project:
                            {name: name,
                             committer: latest_committer,
                             commit_message: commit_message,
                             date: commit_date
							}
                          })
    projects.rotate!
end
