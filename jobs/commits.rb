require 'net/http'
require 'json'
require 'octokit'

projects = settings.projects || []

SCHEDULER.every '1h' do
  client = Octokit::Client.new(access_token: settings.github['token'])

  project = projects.first['repo']

  # SHA hash
  data = client.ref(project, 'heads/' + projects.first['branch'])
  latest_sha = data['object']['sha']

  # Commit
  data = client.git_commit(project, latest_sha)
  latest_committer = data['committer']['name']
  commit_message = data['message']
  commit_message = commit_message.split[0...15].join(' ')
  commit_date = data['committer']['date'].strftime('%a %b %e %Y')

  send_event('commits',
             project: {
               name: project,
               committer: latest_committer,
               commit_message: commit_message,
               date: commit_date
             })
  projects.rotate!
end
