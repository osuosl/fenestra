require 'faraday'
require 'json'

url = settings.pagerduty['url'] || ''
auth_token = settings.pagerduty['key'] || ''
schedules = settings.pagerduty['schedules'] || ''

SCHEDULER.every '1m' do
  conn = Faraday.new(url: url) do |far|
    far.request :url_encoded
    far.adapter :net_http
    far.headers['Authorization'] = "Token token=#{auth_token}"
    far.headers['Accept'] = 'application/vnd.pagerduty+json;version=2'
    far.headers['Content-Type'] = 'application/json'
    far.params['since'] = Time.now.utc.iso8601
    far.params['until'] = (Time.now.utc + 60).iso8601
  end

  oncalls = {}
  schedules.each do |id|
    response = conn.get "schedules/#{id}"
    if response.status == 200
      schedule = JSON.parse(response.body)
      schedule_name = schedule['schedule']['name']

      schedule = schedule['schedule']['final_schedule']
      schedule = schedule['rendered_schedule_entries'][0]
      user_name = schedule['user']['summary']
    else
      user_name = 'Error'
    end

    oncalls[schedule_name] = user_name
  end

  send_event('pagerduty', schedules: oncalls)
end
