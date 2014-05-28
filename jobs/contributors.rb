require 'json'

SCHEDULER.every '1h', :first_in => 0 do |job|

    contributors_uri = nil
    name = nil
    repo_uri = URI("https://api.github.com/repos/osuosl/ganeti_webmgr")
    Net::HTTP::start(repo_uri.host, repo_uri.port,
        :use_ssl => repo_uri.scheme == 'https') do |http|
        # Make the request and setup basic auth
        request = Net::HTTP::Get.new repo_uri

        # Get the response
        response = http.request request
        name = JSON.parse(response.body)['name']

        contributors_uri = URI(JSON.parse(response.body)['contributors_url'])
    end

    members = []
    members_uri = URI("https://api.github.com/orgs/osuosl/members")
    Net::HTTP::start(members_uri.host, members_uri.port,
        :use_ssl => members_uri.scheme == 'https') do |http|

        request = Net::HTTP::Get.new members_uri

        response = http.request request

        JSON.parse(response.body).each do |member|
            members << member['login']
        end
    end

    tributes = []
    Net::HTTP::start(contributors_uri.host, contributors_uri.port,
        :use_ssl => contributors_uri.scheme == 'https') do |http|

        request = Net::HTTP::Get.new contributors_uri

        response = http.request request
        JSON.parse(response.body).each do |tribute|
            tributes << {login: tribute['login'], contributions: tribute['contributions']} unless members.include?(tribute['login'])
        end
    end

    send_event('contributors', {name: name, people: tributes})

end
