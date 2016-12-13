require 'faraday'
require 'json'

url = settings.pagerduty['url'] || ''
auth_token = settings.pagerduty['key'] || ''
schedules = settings.pagerduty['schedules'] || ''

SCHEDULER.every '1m' do
    conn = Faraday.new(:url => url) do |conn|
        conn.request :url_encoded
        conn.adapter :net_http
        conn.headers['Authorization'] = "Token token=#{auth_token}"
        conn.headers['Accept'] = 'application/vnd.pagerduty+json;version=2'
        conn.headers['Content-Type'] = 'application/json'
        conn.params['since'] = (Time.now.utc - 60).iso8601
        conn.params['until'] = (Time.now.utc + 60).iso8601
    end

    oncalls = Hash.new()
    schedules.each do |id|
        response = conn.get "schedules/#{id}"
        if response.status == 200
            schedule = JSON.parse(response.body)
            schedule_name = schedule['schedule']['name']
            user_name = schedule['schedule']['users'][0]['summary']
        else
            user_name = 'Error'
        end


        oncalls[schedule_name] = user_name
    end

    send_event('pagerduty', {:schedules => oncalls})
end
