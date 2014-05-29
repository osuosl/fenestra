projects = settings.projects || []

SCHEDULER.every '5s' do
    url_base = "https://api.github.com/repos/" + projects.first['repo']
    # Put together the branches url
    branches_url = URI(url_base + "/git/refs/heads/" + projects.first['branch'])
    latest_sha = nil
    latest_committer = nil
    commit_message = nil
    # Use the branches URL to get the latest commit sha for the branch
    Net::HTTP::start(branches_url.host, branches_url.port,
        :use_ssl => branches_url.scheme == 'https') do |http|
        request = Net::HTTP::Get.new branches_url

        response = http.request request
        data = JSON.parse(response.body)
        puts data
        latest_sha = data['object']['sha']
    end

    # Commit URL
    commit_url = URI(url_base + "/commits/" + latest_sha)
    Net::HTTP::start(commit_url.host, commit_url.port,
        :use_ssl => commit_url.scheme == 'https') do |http|
        request = Net::HTTP::Get.new commit_url

        response = http.request request
        data = JSON.parse(response.body)
        latest_committer = data['commit']['committer']['name']
        commit_message = data['commit']['message']
    end

    send_event('commits', { project:
                            {title: projects.first['repo'],
                             committer: latest_committer,
                             commit_message: commit_message
                            }
                          })
    puts 'rotating'
    projects.rotate!
end
