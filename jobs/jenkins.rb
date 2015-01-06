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
job_mapping = {
  'site-devopsbootcamp-rtd' => { :job => 'site-devopsbootcamp-rtd' }
}

def get_number_of_failing_tests(job_name)
  info = get_json_for_job(job_name, 'lastCompletedBuild')
  info['actions'][4]['failCount']
end

def get_completion_percentage(job_name)
  build_info = get_json_for_job(job_name)
  prev_build_info = get_json_for_job(job_name, 'lastCompletedBuild')

  return 0 if not build_info["building"]
  last_duration = (prev_build_info["duration"] / 1000).round(2)
  current_duration = (Time.now.to_f - build_info["timestamp"] / 1000).round(2)
  return 99 if current_duration >= last_duration
  ((current_duration * 100) / last_duration).round(0)
end

def get_json_for_job(job_name, build = 'lastBuild')
  job_name = URI.encode(job_name)
  request_url = JENKINS_URI + "/job/#{job_name}/#{build}/api/json"
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

job_mapping.each do |title, jenkins_project|
  current_status = nil
  SCHEDULER.every '10s', :first_in => 0 do |job|
    last_status = current_status
    build_info = get_json_for_job(jenkins_project[:job])
    current_status = build_info["result"]
    if build_info["building"]
      current_status = "BUILDING"
      percent = get_completion_percentage(jenkins_project[:job])
    elsif jenkins_project[:pre_job]
      pre_build_info = get_json_for_job(jenkins_project[:pre_job])
      current_status = "PREBUILD" if pre_build_info["building"]
      percent = get_completion_percentage(jenkins_project[:pre_job])
    end

    send_event('jenkins', {
      name: 'DevOps BootCamp RTD',
      currentResult: current_status,
      lastResult: last_status,
      timestamp: build_info["timestamp"],
      value: percent
    })
  end
end


