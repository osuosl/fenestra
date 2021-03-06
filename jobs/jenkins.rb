require 'net/http'
require 'jenkins_api_client'
require 'json'
require 'time'

JENKINS_URI = settings.jenkins['url']
JENKINS_USER = settings.jenkins['user']
JENKINS_PASS = settings.jenkins['token'] || settings.jenkins['password']

SCHEDULER.every '1h' do
    client = JenkinsApi::Client.new(:server_url => JENKINS_URI,
    :username => JENKINS_USER, :password => JENKINS_PASS, :log_level => Logger::WARN)

    time = 0
    project = nil

    jobs = client.job.list_all

    blue = red = 0.0
    for job in jobs
        job_info = client.job.list_details(job)

        if job_info['color'] === 'blue'
            blue = blue+1
        elsif job_info['color'] === 'red'
            red = red+1
        end

        if job_info['lastBuild']
            build_info = client.job.get_build_details(job, job_info['lastBuild']['number'])

            temp = build_info['timestamp']
            if temp > time
                project = job
                time = temp
            end
        end
    end

    new_time = Time.at(time/1000).strftime("%k:%M, %h %e, %Y")
    percent = ((blue/(red+blue)) * 100).round(2)
    color = nil

    if percent >= 80
        color = 'green'
    elsif percent < 80 and percent > 60
        color = 'yellow'
    else
        color='red'
    end

    send_event('jenkins',
    {
        j: {
            value: percent,
            color: color,
            red: red,
            blue: blue,
            project: project,
            time: new_time
        }
    }
    )
end
