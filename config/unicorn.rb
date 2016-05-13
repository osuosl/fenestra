# set path to application
app_dir = "/home/fenestra"
working_directory "#{app_dir}/fenestra"

# Set unicorn options
worker_processes 1
timeout 30

# Logging
stderr_path "#{app_dir}/log/unicorn.stderr.log"
stdout_path "#{app_dir}/log/unicorn.stdout.log"

# Set master PID location
pid "#{app_dir}/pids/unicorn.pid"
