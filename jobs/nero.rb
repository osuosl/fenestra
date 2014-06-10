# :first_in sets how long it takes before the job is first run. In this case, it is run immediately

interval = settings.nero['update_interval'] || "10s"
images = settings.nero['images'] || [{:name => 'No Images in Config', :url => ''}]

SCHEDULER.every interval, :first_in => 0 do |job|
    send_event('nero', { imag: images.sample } )
end
