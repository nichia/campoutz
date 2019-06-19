# README

# Campoutz

Looking for campgrounds for your next camping trip? Explore Campoutz to find public campgrounds across the US.

## Installation

Follow the below terminal commands to start using the application.
(Requirements: Ruby, Rails and Node.js installed)

    $ git clone git@github.com:nichia/campoutz.git
    $ cd campoutz
    Configuration:
      $ mv .env.bak .env  (edit the .env file to fill in secret keys)
    Setup server:
      $ rvm --default use 2.6.1  (set default Ruby version 2.6.1)
      $ bundle install
      $ rake db:create
      $ rake db:migrate
    Setup client:
      $ cd client
      $ npm install
    Start application:
    $ rake start

## Usage

Open up a web browser and copy/paste the IP server address into the web browser URL (usually http://localhost:3000) to use the application.

## Technical Information

    Front-end: Built using React, Redux, React Router and styled using Semantic UI compoenents and intgrated google maps API components to display maps of the campgrounds.
    Back-end: RESTful JSON API built with Ruby on Rails, using PostgreSQL database
    External API: [Recreation Informatin Database (RIDB) API](https://ridb.recreation.gov/docs)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/nichia/campoutz.

## License

The application is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
