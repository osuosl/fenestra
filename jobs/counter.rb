require 'sinatra'

counter = 1

SCHEDULER.every '1s' do
  counter += 1
  send_event('counter', { count: counter })
end
