SCHEDULER.every '1s' do 
    send_event('timeline', {})
end
