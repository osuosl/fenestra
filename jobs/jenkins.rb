require 'net/http'
require 'jenkins_api_client'
require 'json'
require 'time'


JENKINS_URI = URI.parse(settings.jenkins['url'])

JENKINS_AUTH = {
    'name' => settings.jenkins['user'],
    'password' => settings.jenkins['password']
} 

# the key of this mapping must be a unique identifier for your job, the according value must be the name that is specified in jenkins
def get_json()
  request_url = JENKINS_URI + "/api/json"
  #http = Net::HTTP.start(JENKINS_URI.host, JENKINS_URI.port, :use_ssl => (request_url.scheme == 'https')) do |http|
  http = Net::HTTP.new(JENKINS_URI.host, JENKINS_URI.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  http.start do |http|
      request = Net::HTTP::Get.new(request_url.request_uri)
      if JENKINS_AUTH['name']
        request.basic_auth(JENKINS_AUTH['name'], JENKINS_AUTH['password'])
      end
      response = http.request(request)
      JSON.parse(response.body)
  end
end


SCHEDULER.every '1h' do
    url_info = get_json()
    jobs = url_info['jobs']
    blue = red = 0.0
    for job in jobs
        if job['color'] === 'blue'
            blue = blue+1
        else 
            red = red+1
        end
    end
    percent = (blue/(red+blue)) * 100
    color = nil
    if percent >= 80
        color = 'green'
    elsif percent <80 and percent > 60
        color = 'yellow'
    else 
        color='red' 
    end
    send_event('jenkins', { j:
      {value: percent,
      color: color}
    })
end

