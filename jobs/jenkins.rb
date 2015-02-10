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
def get_json(url)
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
    request_url = JENKINS_URI + "/api/json"
    time = 0
    project = nil
    url_info = get_json(request_url)
    jobs = url_info['jobs']
    blue = red = 0.0
    for job in jobs
        if job['color'] === 'blue'
            blue = blue+1
        else 
            red = red+1
        end
        job_url = URI.parse(job['url'])
        job_info = get_json(job_url)
        if job_info['buildable'] === true
            build_url = URI.parse(job_info['lastBuild']['url'])
            build_info = get_json(build_url)
            temp = build_info['timestamp']
            if temp > time
                project = job_info['name']
                time = temp
            end
        end
    end
    # Jenkins works in milliseconds, while epoch time is in seconds
    time = time/1000
    time = Time.at.strftime("%k:%M, %h %e, %Y")
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
      color: color,
      red: red,
      blue: blue,
      project: project,
      time: time}
    })
end

